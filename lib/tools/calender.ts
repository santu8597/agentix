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
      
//       if (action === 'view') {
//   let timeMin: string;
//   let timeMax: string;

//   const now = new Date();
//   if (viewType === 'today') {
//     timeMin = now.toISOString();
//     const endOfDay = new Date(now);
//     endOfDay.setHours(23, 59, 59);
//     timeMax = endOfDay.toISOString();
//   } else if (viewType === 'tomorrow') {
//     const tomorrow = new Date(now);
//     tomorrow.setDate(now.getDate() + 1);
//     timeMin = tomorrow.toISOString();
//     const endOfDay = new Date(tomorrow);
//     endOfDay.setHours(23, 59, 59);
//     timeMax = endOfDay.toISOString();
//   } else if (viewType === 'week') {
//     const startOfWeek = new Date(now);
//     startOfWeek.setDate(now.getDate() - now.getDay());
//     timeMin = startOfWeek.toISOString();
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(startOfWeek.getDate() + 7);
//     timeMax = endOfWeek.toISOString();
//   } else if (date) {
//     // 👇 Custom date-based view
//     const day = new Date(`${date}T00:00:00Z`);
//     const endOfDay = new Date(`${date}T23:59:59Z`);
//     timeMin = day.toISOString();
//     timeMax = endOfDay.toISOString();
//   } else {
//     return {
//       success: false,
//       message: 'Invalid view type.',
//     };
//   }

//   const response = await calendar.events.list({
//     calendarId: filterCalendarId || 'primary',
//     timeMin,
//     timeMax,
//     singleEvents: true,
//     orderBy: 'startTime',
//   });

//   return {
//     success: true,
//     events: response.data.items || [],
//   };
// }
if (action === 'view') {
  let timeMin: string;
  let timeMax: string;

  if (date) {
    // ✅ Primary check: use provided `date` first
    const targetDate = new Date(`${date}T00:00:00Z`);
    timeMin = targetDate.toISOString();
    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59);
    timeMax = endOfDay.toISOString();
  } else {
    // Fallback: check `viewType`
    const now = new Date();
    if (viewType === 'today') {
      timeMin = now.toISOString();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59);
      timeMax = endOfDay.toISOString();
    } else if (viewType === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      timeMin = new Date(tomorrow.setHours(0, 0, 0)).toISOString();
      const endOfDay = new Date(tomorrow);
      endOfDay.setHours(23, 59, 59);
      timeMax = endOfDay.toISOString();
    } else if (viewType === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      timeMin = new Date(startOfWeek.setHours(0, 0, 0)).toISOString();
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      endOfWeek.setHours(23, 59, 59);
      timeMax = endOfWeek.toISOString();
    } else {
      return {
        success: false,
        message: 'Invalid view type or missing date.',
      };
    }
  }

  const response = await calendar.events.list({
    calendarId: filterCalendarId || 'primary',
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items || [];

  const formatted = events.map((event) => ({
    id: event.id,
    summary: event.summary,
    description: event.description,
    start: event.start,
    end: event.end,
  }));

  return {
    success: true,
    events: formatted,
  };
}



      // Add New Event
      // if (action === 'add') {
      //   const event = {
      //     summary: title,
      //     description: description,
      //     start: {
      //       dateTime: startTime,
      //       timeZone: 'UTC',
      //     },
      //     end: {
      //       dateTime: endTime,
      //       timeZone: 'UTC',
      //     },
      //   };

      //   const response = await calendar.events.insert({
      //     calendarId: filterCalendarId || 'primary',
      //     requestBody: event,
      //   });

      //   return {
      //     success: true,
      //     message: 'Event created successfully.',
      //     event: response.data,
      //   };
      // }
      // Add New Event
if (action === 'add') {
  const isAllDayEvent = !startTime && !endTime;

  let event: any;

  if (isAllDayEvent) {
    // All-day event format
    event = {
      summary: title,
      description: description,
      start: { date: date },
      end: {
        date: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
    };
  } else {
    const formatTimeToISO = (date: string, time: string) => {
      // Remove AM/PM if present (24hr assumption)
      const cleanTime = time.trim().toUpperCase().replace(/(AM|PM)/g, '').trim();
      return new Date(`${date}T${cleanTime}Z`).toISOString();
    };

    const startDateTime = formatTimeToISO(date!, startTime!);
    const endDateTime = formatTimeToISO(date!, endTime!);

    event = {
      summary: title,
      description: description,
      start: {
        dateTime: startDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'UTC',
      },
    };
  }

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
      async function getEventIdByTitleAndDate({
  auth,
  title,
  date,
  calendarId = 'primary',
}: {
  auth: any;
  title: string;
  date: string;
  calendarId?: string;
}): Promise<string | null> {
  const calendar = google.calendar({ version: 'v3', auth });

  const timeMin = new Date(`${date}T00:00:00Z`).toISOString();
  const timeMax = new Date(`${date}T23:59:59Z`).toISOString();

  const response = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const event = (response.data.items || []).find(
    (e) => e.summary === title
  );

  return event?.id || null;
}

      // Delete Event
      // if (action === 'delete' && eventId) {
      //   await calendar.events.delete({
      //     calendarId: filterCalendarId || 'primary',
      //     eventId,
      //   });

      //   return {
      //     success: true,
      //     message: 'Event deleted successfully.',
      //   };
      // }
     if (action === 'delete') {
  let targetEventId = eventId;

  // If eventId not provided, try to look it up by title and date
  if (!eventId && title && date) {
    targetEventId = await getEventIdByTitleAndDate({
      auth: oauth2Client,
      title,
      date,
      calendarId: filterCalendarId || 'primary',
    });

    if (!targetEventId) {
      return {
        success: false,
        message: 'Event not found for deletion.',
      };
    }
  }

  await calendar.events.delete({
    calendarId: filterCalendarId || 'primary',
    eventId: targetEventId!,
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
