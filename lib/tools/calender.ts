import { google } from 'googleapis';
import { tool } from 'ai';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/providers/next-auth';

const calendar = google.calendar('v3');

export const googleCalendarManager = tool({
  description: 'Manage Google Calendar: view, add, update, delete, or search events; send daily summaries.',
  parameters: z.object({
    action: z.enum(['view', 'add', 'update', 'delete', 'search', 'summary']),
    date: z.string().optional().describe('ISO date for viewing or adding events, e.g., 2025-05-10'),
    timeMin: z.string().optional().describe('Start time for filtering, in ISO format'),
    timeMax: z.string().optional().describe('End time for filtering, in ISO format'),
    calendarId: z.string().optional().describe('ID of the calendar (default is "primary")'),
    title: z.string().optional().describe('Title of the event'),
    description: z.string().optional().describe('Description of the event'),
    location: z.string().optional().describe('Location of the event'),
    startTime: z.string().optional().describe('Start time in ISO format'),
    endTime: z.string().optional().describe('End time in ISO format'),
    attendees: z.array(z.string()).optional().describe('List of email addresses to invite'),
    eventId: z.string().optional().describe('ID of the event to update or delete'),
    query: z.string().optional().describe('Keyword/location/participant to search in events'),
  }),
  execute: async (params) => {
    const session = await getServerSession(authOptions);
    const refreshToken = session?.refreshToken;

    if (!refreshToken) {
      return { success: false, message: 'Missing refresh token. Please sign in again with Google.' };
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!
    );
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);

      const calendarId = params.calendarId || 'primary';

      switch (params.action) {
        case 'view': {
          const res = await calendar.events.list({
            calendarId,
            timeMin: params.timeMin || new Date().toISOString(),
            timeMax: params.timeMax || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week
            singleEvents: true,
            orderBy: 'startTime',
          });

          return {
            success: true,
            events: res.data.items?.map(evt => ({
              id: evt.id,
              summary: evt.summary,
              start: evt.start,
              end: evt.end,
              location: evt.location,
            })) || [],
          };
        }

        case 'add': {
          const res = await calendar.events.insert({
            calendarId,
            requestBody: {
              summary: params.title,
              description: params.description,
              location: params.location,
              start: { dateTime: params.startTime },
              end: { dateTime: params.endTime },
              attendees: params.attendees?.map(email => ({ email })) || [],
              reminders: { useDefault: true },
            },
          });
          return { success: true, event: res.data };
        }

        case 'update': {
          if (!params.eventId) return { success: false, message: 'Missing event ID for update.' };
          const res = await calendar.events.patch({
            calendarId,
            eventId: params.eventId,
            requestBody: {
              summary: params.title,
              description: params.description,
              location: params.location,
              start: params.startTime ? { dateTime: params.startTime } : undefined,
              end: params.endTime ? { dateTime: params.endTime } : undefined,
              attendees: params.attendees?.map(email => ({ email })),
            },
          });
          return { success: true, updatedEvent: res.data };
        }

        case 'delete': {
          if (!params.eventId) return { success: false, message: 'Missing event ID for deletion.' };
          await calendar.events.delete({ calendarId, eventId: params.eventId });
          return { success: true, message: 'Event deleted successfully.' };
        }

        case 'search': {
          const res = await calendar.events.list({
            calendarId,
            q: params.query,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
          });

          return {
            success: true,
            results: res.data.items?.map(evt => ({
              id: evt.id,
              summary: evt.summary,
              start: evt.start,
              location: evt.location,
              attendees: evt.attendees,
            })) || [],
          };
        }

        case 'summary': {
          const res = await calendar.events.list({
            calendarId,
            timeMin: new Date().setHours(0, 0, 0, 0).toString(),
            timeMax: new Date().setHours(23, 59, 59, 999).toString(),
            singleEvents: true,
            orderBy: 'startTime',
          });

          const events = res.data.items || [];
          const summaryText = events.length
            ? events.map(e => `- ${e.summary} at ${e.start?.dateTime || e.start?.date}`).join('\n')
            : 'No events scheduled today.';

          // Integrate email/SMS/dashboard logic here if needed

          return {
            success: true,
            summary: summaryText,
          };
        }

        default:
          return { success: false, message: 'Unsupported action type.' };
      }
    } catch (error: any) {
      console.error('Google Calendar error:', error);
      return {
        success: false,
        message: error.message || 'Failed to interact with Google Calendar.',
      };
    }
  },
});
