// tools/generate-creature.ts
import { tool } from 'ai';
import { z } from 'zod';

export const generateImage = tool({
 
  description: 'Generate a image based on a text prompt using Corcel API',
  parameters: z.object({
    prompt: z.string().describe('Description of iamge to generate (e.g., "a dragon in a forest, digital painting")'),
  }),
  execute: async ({ prompt }) => {
    try {
      const response = await fetch('https://api.corcel.io/v1/image/vision/text-to-image', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.CORSEL_API_KEY}`, // ✅ Secure your key
        },
        body: JSON.stringify({
          cfg_scale: Math.floor(Math.random() * 3) + 2,
          height: '1024',
          width: '1024',
          steps: Math.floor(Math.random() * 8) + 4,
          engine: 'flux-schnell',
          text_prompts: [{ text: prompt }],
        }),
      });

      const data = await response.json();
      const url = data.signed_urls?.[0];

      if (!url) {
        throw new Error('Image generation failed or returned no URL.');
      }

      return {
        imageUrl: url,
      };
    } catch (error: any) {
      return {
        error: error.message || 'Image generation failed.',
      };
    }
  },
});
