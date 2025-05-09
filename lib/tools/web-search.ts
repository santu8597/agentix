import { tool } from "ai"
import { z } from "zod"

export const webSearch = tool({
  description: "Search the web for current information",
  parameters: z.object({
    query: z.string().describe("The search query"),
  }),
  
  execute: async ({ query }) => {
    try {
      // You'll need to add TAVILY_API_KEY to your environment variables
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
        },
        body: JSON.stringify({
          query,
          search_depth: "basic",
          include_domains: [],
          exclude_domains: [],
          max_results: 5,
        }),
      })

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        results: data.results.map((result: any) => ({
          title: result.title,
          content: result.content,
          url: result.url,
        })),
        searchQuery: query,
      }
    } catch (error) {
      console.error("Web search error:", error)
      return {
        results: [],
        searchQuery: query,
        error: "Failed to perform web search. Please try again later.",
      }
    }
  },
})
