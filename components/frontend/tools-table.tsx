import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"

export default function ToolsTable() {
  const tools = [
    { id: "getWeather", description: "Fetch current weather data", icon: "☁️" },
    { id: "executeShell", description: "Run shell commands", icon: "🖥️" },
    { id: "generateImage", description: "Generate images with AI", icon: "🖼️" },
    { id: "analyzeSrcStructureTool", description: "Analyze project folder structure", icon: "📁" },
    { id: "musicMood", description: "Analyze music mood", icon: "🎵" },
    { id: "sendEmail", description: "Send emails via Gmail API", icon: "📤" },
    { id: "readEmail", description: "Read emails from Gmail inbox", icon: "📬" },
    { id: "webSearch", description: "Perform real-time web search", icon: "🌐" },
    { id: "scrapeDocsTool", description: "Scrape data from URLs or docs", icon: "🔍" },
    { id: "fetchFlightDetails", description: "Get live flight data", icon: "✈️" },
    { id: "fetchYouTubeVideo", description: "Interact with YouTube content", icon: "📺" },
  ]

  return (
    <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border shadow-lg">
      <Table>
        <TableCaption>Available tools that can be dynamically selected at runtime.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Icon</TableHead>
            <TableHead>Tool ID</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="text-2xl">{tool.icon}</TableCell>
              <TableCell className="font-mono text-sm">{tool.id}</TableCell>
              <TableCell>{tool.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
