import { google } from 'googleapis';
import { tool } from 'ai';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/providers/next-auth';

export const fetchYouTubeVideo = tool({
  description: 'Fetch a YouTube video link using the authenticated user’s account.',
  parameters: z.object({
    query: z.string().describe('Search query for the YouTube video'),
  }),
  execute: async ({ query }) => {
    const session = await getServerSession(authOptions);
    const refreshToken = session?.refreshToken;

    if (!refreshToken) {
      return {
        success: false,
        message: 'Missing refresh token. Please sign in again with Google.',
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

      const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client,
      });

      const response = await youtube.search.list({
        q: query,
        part: ['snippet'],
        maxResults: 1,
        type: ['video'],
      });

      const item = response.data.items?.[0];
      if (!item) {
        return {
          success: false,
          message: 'No video found for the given query.',
        };
      }

      const videoId = item.id?.videoId;
      const title = item.snippet?.title;
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      return {
        success: true,
        video: {
          title,
          url,
        },
      };
    } catch (error: any) {
      console.error('YouTube OAuth fetch error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch YouTube video.',
      };
    }
  },
});
