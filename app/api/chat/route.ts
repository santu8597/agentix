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

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: "You are a helpful assistant that can search the web and provide weather information.and open apps using shell commands.",
    messages,
    
    
    tools: {
      weather: getWeather,
      webSearch: webSearch,
      shell: executeShell,
      email: sendEmail,
      image: generateImage,
      flight: fetchFlightDetails,
      readEmail: readEmail,
      youtube: fetchYouTubeVideo,
    },
    
    maxSteps: 5,
     // Allow multiple tool calls in a single conversation turn
  })

  return result.toDataStreamResponse()
}
