// lib/tools/fetchHotelDetails.ts
import { tool } from 'ai';
import { z } from 'zod';

export const fetchHotelDetails = tool({
  description: 'Search for hotels and vacation rentals using SerpAPI\'s Google Hotels engine.',
  parameters: z.object({
    location: z.string().describe('Destination city, address, or landmark, e.g., "New York" or "Eiffel Tower"'),
    check_in_date: z.string().describe('Check-in date in YYYY-MM-DD format'),
    check_out_date: z.string().describe('Check-out date in YYYY-MM-DD format'),
    adults: z.number().optional().default(2).describe('Number of adult guests'),
    children: z.number().optional().describe('Number of children guests'),
    rooms: z.number().optional().describe('Number of rooms needed'),
    price_min: z.number().optional().describe('Minimum price per night'),
    price_max: z.number().optional().describe('Maximum price per night'),
    stars: z.number().optional().describe('Minimum star rating (1-5)'),
    amenities: z.array(z.string()).optional().describe('Desired amenities like "Free WiFi", "Pool", etc.'),
    property_types: z.array(z.string()).optional().describe('Types like "Hotel", "Vacation rental", "Hostel"'),
  }),
  execute: async ({ 
    location, 
    check_in_date, 
    check_out_date, 
    adults = 2, 
    children, 
    rooms, 
    price_min, 
    price_max, 
    stars, 
    amenities, 
    property_types 
  }) => {
    const params = new URLSearchParams({
      engine: 'google_hotels',
      q: location,
      check_in_date: check_in_date,
      check_out_date: check_out_date,
      adults: adults.toString(),
      api_key: process.env.SERP_API_KEY!
    });

    // Optional parameters
    if (children) params.append('children', children.toString());
    if (rooms) params.append('rooms', rooms.toString());
    if (price_min) params.append('price_min', price_min.toString());
    if (price_max) params.append('price_max', price_max.toString());
    if (stars) params.append('stars', stars.toString());
    if (amenities) amenities.forEach(a => params.append('amenities', a));
    if (property_types) property_types.forEach(t => params.append('property_types', t));

    const url = `https://serpapi.com/search.json?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.properties) {
        return {
          success: true,
          properties: data.properties,
          search_parameters: {
            location,
            check_in_date,
            check_out_date,
            adults,
            children,
            rooms
          }
        };
      } else {
        throw new Error('No hotel data found in the response');
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch hotel details',
        details: error.response?.data || null
      };
    }
  },
});