import { google } from 'googleapis';
import { tool } from 'ai';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/providers/next-auth';

function createRawEmail({ to, from, subject, text, html }: {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}): string {
  const boundary = "__boundary__";
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    '',
    `--${boundary}--`
  ];

  const rawMessage = messageParts.join('\r\n');
  return Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const sendEmail = tool({
  description: 'Send an email using the user’s Gmail account.',
  parameters: z.object({
    to: z.string().describe('Recipient email address'),
    subject: z.string().describe('Email subject line'),
    text: z.string().describe('Plain text body of the email'),
    html: z.string().describe('HTML body of the email'),
  }),
  execute: async ({ to, subject, text, html }) => {
    const session = await getServerSession(authOptions);
    const refreshToken = session?.refreshToken;
    const userEmail = session?.user?.email;

    if (!refreshToken || !userEmail) {
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

      const raw = createRawEmail({
        to,
        from: userEmail,
        subject,
        text,
        html,
      });

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw,
        },
      });

      return {
        success: true,
        message: `Email sent to ${to} successfully.`,
      };
    } catch (error: any) {
      console.error('Send mail failed:', error);
      return {
        success: false,
        message:
          error.message || 'Failed to send email. Try re-authenticating your account.',
      };
    }
  },
});
