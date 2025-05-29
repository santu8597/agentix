import { NextRequest, NextResponse } from 'next/server';
import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { toolRegistry } from "@/lib/tool-registry"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } =await params;

  // Example: Fetch data from external API using the id
  const res = await fetch(`https://azure-lazy-rat-840.mypinata.cloud/ipfs/${id}`);
  const data = await res.json();
    console.log('Fetched data:', data);
    const { prompt,selectedTools } =await data;
    const { query } = await req.json()
    
    interface ToolAccumulator {
      [key: string]: typeof toolRegistry[keyof typeof toolRegistry];
    }

    const tools = selectedTools.reduce((acc: ToolAccumulator, name: keyof typeof toolRegistry) => {
      if (toolRegistry[name]) {
        acc[name] = toolRegistry[name];
      }
      return acc;
    }, {} as ToolAccumulator);
// console.log('Fetched tools:', tools);
    const result =await generateText({
      model: google("gemini-2.0-flash"),
        system: prompt,
        prompt: query,
        tools: tools,
        maxSteps: 5,
        // Allow multiple tool calls in a single conversation turn
      })
  return NextResponse.json({result: result.text, tools: result.steps }, { status: 200 });
}