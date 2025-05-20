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
import { googleCalendarManager } from "@/lib/tools/calender"
import { fetchDoctors } from "@/lib/tools/health"
import { fetchHotelDetails } from "@/lib/tools/hotel"
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: "You are a helpful assistant that can search the web and provide weather information.and open apps using shell commands.",
    messages,
    
    
    tools: {
      getWeather: getWeather,
      webSearch: webSearch,
      executeShell: executeShell,
      sendEmail: sendEmail,
      generateImage: generateImage,
      fetchFlightDetails: fetchFlightDetails,
      readEmail: readEmail,
      fetchYouTubeVideo: fetchYouTubeVideo,
      googleCalendarManager:googleCalendarManager,
      fetchHotelDetails:fetchHotelDetails,
      fetchDoctors:fetchDoctors
    },
    
    maxSteps: 5,
     // Allow multiple tool calls in a single conversation turn
  })

  return result.toDataStreamResponse()
}
