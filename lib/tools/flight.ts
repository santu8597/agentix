// lib/tools/fetchFlightDetails.ts
import { tool } from 'ai';
import { z } from 'zod';

export const fetchFlightDetails = tool({
  description: 'Search for flights between two airports using SerpAPI’s Google Flights engine.',
  parameters: z.object({
    origin: z.string().describe('Departure airport IATA code, e.g., "JFK"'),
    destination: z.string().describe('Arrival airport IATA code, e.g., "LAX"'),
    date: z.string().describe('Outbound date in YYYY-MM-DD format'),
    return_date: z.string().describe('Return date in YYYY-MM-DD format (optional)'),
    
  }),
  execute: async ({ origin, destination, date, return_date, }) => {
    const params = new URLSearchParams({
      engine: 'google_flights',
      departure_id: origin,
      arrival_id: destination,
      outbound_date: date,
      return_date: return_date,
      
      api_key: process.env.SERP_API_KEY!
    });

    const url = `https://serpapi.com/search.json?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.best_flights) {
        return data.best_flights;
      } else {
        throw new Error(data.error || 'No flight data found.');
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch flight details.',
      };
    }
  },
});
