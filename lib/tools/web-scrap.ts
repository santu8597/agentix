import { tool } from 'ai';
import { z } from 'zod';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeDocsTool = tool({
  
  description: 'Scrape content from a developer documentation page',
  parameters: z.object({
    url: z.string().describe('URL of the documentation page to scrape'),
  }),

  execute: async ({ url }) => {
    
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const title = $('h1').first().text() || $('title').text();

    const sections: Array<{ heading?: string; content: string; code: string[] }> = [];

    $('main, article, .doc, .content, .markdown').each((_, el) => {
      const sectionText = $(el).find('p, li').text().trim();
      const heading = $(el).find('h2, h3').first().text();
      const code = $(el).find('pre code').map((_, c) => $(c).text()).get();

      if (sectionText || code.length > 0) {
        sections.push({
          heading,
          content: sectionText,
          code,
        });
      }
    });

    return {
      title:title,
      sections:sections,
    };
  },
});
