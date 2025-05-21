import { NextRequest, NextResponse } from 'next/server';
import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { toolRegistry } from "@/lib/tool-registry"
interface Tool {
    name: keyof typeof toolRegistry;
    tool: string;
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