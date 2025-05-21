import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { toolRegistry } from "@/lib/tool-registry"
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  function expandToolRegistry(toolRegistry:Object) {
  const expanded = {};
  for (const key in toolRegistry) {
    if (toolRegistry.hasOwnProperty(key)) {
      expanded[key] = toolRegistry[key];
    }
  }
  return expanded;
}
const tools = expandToolRegistry(toolRegistry);
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: "You are a helpful assistant that can use tools to answer questions. You can use the tools to get information, perform actions, and assist the user. You are not allowed to browse the web or access external information directly. You can only use the tools provided to you.",
    messages,
    
    
    tools: tools,
    
    maxSteps: 5,
     // Allow multiple tool calls in a single conversation turn
  })

  return result.toDataStreamResponse()
}
