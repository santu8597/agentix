import { google } from 'googleapis';
import { tool } from 'ai';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/providers/next-auth';

export const googleCalendarManager = tool({
  description: 'Manage Google Calendar events including viewing, adding, updating, and deleting events.',
  parameters: z.object({
    action: z.enum(['view', 'add', 'update', 'delete']).describe('Action to perform on Google Calendar'),
    title: z.string().optional().describe('Event title for add or update action'),
    startTime: z.string().optional().describe('Event start time (ISO format)'),
    endTime: z.string().optional().describe('Event end time (ISO format)'),
    date: z.string().optional().describe('Event date (ISO format)'),
    description: z.string().optional().describe('Event description for add or update action'),
    eventId: z.string().optional().describe('Event ID for delete or update action'),
    filterCalendarId: z.string().optional().describe('Specific calendar ID to filter events by'),
    viewType: z.enum(['today', 'tomorrow', 'week']).optional().describe('View schedule type: today, tomorrow, or week'),
  }),
  execute: async ({ action, title, startTime, endTime, date, description, eventId, filterCalendarId, viewType }) => {
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

      const calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client,
      });

      // View Upcoming Events (Today, Tomorrow, or Week Overview)
      if (action === 'view') {
        let timeMin: string;
        let timeMax: string;

        const now = new Date();
        if (viewType === 'today') {
          timeMin = now.toISOString();
          const endOfDay = new Date(now);
          endOfDay.setHours(23, 59, 59);
          timeMax = endOfDay.toISOString();
        } else if (viewType === 'tomorrow') {
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          timeMin = tomorrow.toISOString();
          const endOfDay = new Date(tomorrow);
          endOfDay.setHours(23, 59, 59);
          timeMax = endOfDay.toISOString();
        } else if (viewType === 'week') {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay()); // Start of this week
          timeMin = startOfWeek.toISOString();
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7); // End of next week
          timeMax = endOfWeek.toISOString();
        } else {
          return {
            success: false,
            message: 'Invalid view type.',
          };
        }

        const response = await calendar.events.list({
          calendarId: filterCalendarId || 'primary',
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: 'startTime',
        });

        return {
          success: true,
          events: response.data.items || [],
        };
      }

      // Add New Event
      if (action === 'add') {
        const event = {
          summary: title,
          description: description,
          start: {
            dateTime: startTime,
            timeZone: 'UTC',
          },
          end: {
            dateTime: endTime,
            timeZone: 'UTC',
          },
        };

        const response = await calendar.events.insert({
          calendarId: filterCalendarId || 'primary',
          requestBody: event,
        });

        return {
          success: true,
          message: 'Event created successfully.',
          event: response.data,
        };
      }

      // Update Event
      if (action === 'update' && eventId) {
        const updatedEvent = {
          summary: title,
          description: description,
          start: {
            dateTime: startTime,
            timeZone: 'UTC',
          },
          end: {
            dateTime: endTime,
            timeZone: 'UTC',
          },
        };

        const response = await calendar.events.update({
          calendarId: filterCalendarId || 'primary',
          eventId,
          requestBody: updatedEvent,
        });

        return {
          success: true,
          message: 'Event updated successfully.',
          event: response.data,
        };
      }

      // Delete Event
      if (action === 'delete' && eventId) {
        await calendar.events.delete({
          calendarId: filterCalendarId || 'primary',
          eventId,
        });

        return {
          success: true,
          message: 'Event deleted successfully.',
        };
      }

      return {
        success: false,
        message: 'Invalid action or missing parameters.',
      };
    } catch (error: any) {
      console.error('Google Calendar API error:', error);
      return {
        success: false,
        message: error.message || 'Failed to manage Google Calendar events.',
      };
    }
  },
});
