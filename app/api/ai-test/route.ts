import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { getWeather } from "@/lib/tools/weather"
import { webSearch } from "@/lib/tools/web-search"
import {executeShell} from "@/lib/tools/shell"
import { generateImage } from "@/lib/tools/image"
import {fetchFlightDetails} from "@/lib/tools/flight"
import {sendEmail} from "@/lib/tools/auth-mail"
import {readEmail} from "@/lib/tools/get-mail"
import {fetchYouTubeVideo} from "@/lib/tools/youtube"
import {scrapeDocsTool} from "@/lib/tools/web-scrap"
import {analyzeSrcStructureTool} from "@/lib/tools/folder-structure"
import { musicMood } from "@/lib/tools/music"
interface Tool {
    name: keyof typeof toolRegistry;
    tool: string;
  }

const toolRegistry = {
  getWeather,
  webSearch,
  executeShell,
  generateImage,
  fetchFlightDetails,
  sendEmail,
  readEmail,
  fetchYouTubeVideo,
  scrapeDocsTool,
  analyzeSrcStructureTool,
  musicMood
}
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages,prompt,array_tools } = await req.json()
  console.log("array_tools",array_tools)

  const tools = Object.fromEntries(
      array_tools.map(({ name }: Tool) => [name, toolRegistry[name]])
    );
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: prompt,
    messages,
    
    
    tools: tools,
    
    maxSteps: 5,
     // Allow multiple tool calls in a single conversation turn
  })

  return result.toDataStreamResponse()
}
