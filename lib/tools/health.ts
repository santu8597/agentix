// lib/tools/fetchDoctors.ts
import { tool } from 'ai';
import { z } from 'zod';

// First, create a helper function to get coordinates from city name
async function getCoordinates(city: string) {
  const params = new URLSearchParams({
    engine: 'google_maps',
    q: city,
    type: 'search',
    api_key: process.env.SERP_API_KEY!
  });

  const url = `https://serpapi.com/search.json?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.place_results?.gps_coordinates) {
    return data.place_results.gps_coordinates;
  }
  if (data.local_results?.[0]?.gps_coordinates) {
    return data.local_results[0].gps_coordinates;
  }
  throw new Error(`Could not find coordinates for city: ${city}`);
}

export const fetchDoctors = tool({
  description: 'Search for doctors and medical professionals in a city using SerpAPI\'s Google Maps engine.',
  parameters: z.object({
    query: z.string().describe('Type of doctor or medical service, e.g., "dentist", "cardiologist"'),
    city: z.string().describe('City name for search, e.g., "New York", "London"'),
    zoom: z.number().optional().default(13).describe('Zoom level (1-20, default 13)'),
    language: z.string().optional().default('en').describe('Language code, e.g., "en"'),
    country: z.string().optional().default('us').describe('Country code, e.g., "us"'),
    max_results: z.number().optional().default(10).describe('Maximum number of results to return'),
    sort_by: z.enum(['relevance', 'distance', 'rating']).optional().default('relevance').describe('Sort method'),
    min_rating: z.number().optional().describe('Minimum rating (1-5)'),
    open_now: z.boolean().optional().describe('Only show currently open practices'),
  }),
  execute: async ({ 
    query,
    city,
    zoom = 13,
    language = 'en',
    country = 'us',
    max_results = 10,
    sort_by = 'relevance',
    min_rating,
    open_now
  }) => {
    try {
      // First get coordinates from city name
      const coordinates = await getCoordinates(city);
      if (!coordinates?.latitude || !coordinates?.longitude) {
        throw new Error('Could not determine location coordinates');
      }

      // Then search for doctors
      const params = new URLSearchParams({
        engine: 'google_maps',
        q: query,
        ll: `@${coordinates.latitude},${coordinates.longitude},${zoom}z`,
        hl: language,
        gl: country,
        type: 'search',
        api_key: process.env.SERP_API_KEY!
      });

      // Optional parameters
      if (min_rating) params.append('min_rating', min_rating.toString());
      if (open_now) params.append('open_now', '1');
      if (sort_by !== 'relevance') params.append('sort_by', sort_by);

      const url = `https://serpapi.com/search.json?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.local_results || data.local_results.length === 0) {
        return {
          success: false,
          error: 'No doctors found for your search criteria.',
        };
      }

      // Process results
      const results = data.local_results.slice(0, max_results).map((result: any) => ({
        title: result.title,
        address: result.address,
        phone: result.phone,
        rating: result.rating,
        reviews: result.reviews,
        website: result.website,
        place_id: result.place_id,
        operating_hours: result.operating_hours,
        service_options: result.service_options,
        thumbnail: result.thumbnail,
        position: result.gps_coordinates || coordinates,
        distance: result.distance,
      }));

      return {
        success: true,
        results,
        search_parameters: {
          query,
          city,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          zoom,
          language,
          country,
        },
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch doctor information',
      };
    }
  },
});