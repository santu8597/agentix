import { google } from 'googleapis';
import { tool } from 'ai';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/providers/next-auth';

function decodeBase64(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

function extractBody(payload: any): { text?: string; html?: string } {
  let text: string | undefined;
  let html: string | undefined;

  const parts = payload.parts || [];

  for (const part of parts) {
    const mimeType = part.mimeType;
    const bodyData = part.body?.data;

    if (mimeType === 'text/plain' && bodyData) {
      text = decodeBase64(bodyData);
    } else if (mimeType === 'text/html' && bodyData) {
      html = decodeBase64(bodyData);
    }

    if (!text && part.parts) {
      const nested = extractBody(part);
      text = text || nested.text;
      html = html || nested.html;
    }
  }

  if (!text && payload.body?.data) {
    text = decodeBase64(payload.body.data);
  }

  return { text, html };
}

export const readEmail = tool({
  description: 'Read the latest emails from the user’s Gmail inbox, with full content.',
  parameters: z.object({
    count: z.number().min(1).max(20).default(5).describe('Number of latest emails to fetch'),
    includeFullBody: z.boolean().default(false).describe('Whether to include full email content'),
  }),
  execute: async ({ count, includeFullBody }) => {
    const session = await getServerSession(authOptions);
    const refreshToken = session?.refreshToken;
    const email = session?.user?.email;

    if (!refreshToken || !email) {
      return {
        success: false,
        message: 'Missing refresh token or user email. Please sign in again.',
      };
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!
    );
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      const res = await gmail.users.messages.list({
        userId: 'me',
        maxResults: count,
        q: 'is:unread',
      });

      const messages = res.data.messages;
      if (!messages || messages.length === 0) {
        return { success: true, message: 'No unread emails found.', emails: [] };
      }

      const emails = await Promise.all(
        messages.map(async (msg) => {
          const fullMsg = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id!,
            format: 'full',
          });

          const headers = fullMsg.data.payload?.headers || [];

          const subject = headers.find((h) => h.name === 'Subject')?.value || '(No Subject)';
          const from = headers.find((h) => h.name === 'From')?.value || '(Unknown Sender)';
          const snippet = fullMsg.data.snippet || '';

          const { text, html } = includeFullBody
            ? extractBody(fullMsg.data.payload)
            : { text: undefined, html: undefined };

          return {
            subject,
            from,
            snippet,
            text,
            html,
          };
        })
      );

      return {
        success: true,
        message: `Fetched ${emails.length} unread email(s).`,
        emails,
      };
    } catch (error: any) {
      console.error('Failed to read email:', error);
      return {
        success: false,
        message:
          'An error occurred while reading emails. Try re-authenticating your Google account.',
      };
    }
  },
});
