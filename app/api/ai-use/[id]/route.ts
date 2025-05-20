import { NextRequest, NextResponse } from 'next/server';
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
import { googleCalendarManager } from "@/lib/tools/calender"
import { fetchHotelDetails } from '@/lib/tools/hotel';
import { fetchDoctors } from '@/lib/tools/health';
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
  musicMood,
  googleCalendarManager,
  fetchDoctors,
  fetchHotelDetails
}
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } =await params;

  // Example: Fetch data from external API using the id
  const res = await fetch(`https://azure-lazy-rat-840.mypinata.cloud/ipfs/${id}`);
  const data = await res.json();
    console.log('Fetched data:', data);
    const { prompt,selectedTools } =await data;
    const { messages } = await req.json()
    const tools = selectedTools.reduce((acc, name) => {
  if (toolRegistry[name]) {
    acc[name] = toolRegistry[name];
  }
  return acc;
}, {} as Record<string, any>);
// console.log('Fetched tools:', tools);
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