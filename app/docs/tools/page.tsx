import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Terminal,
  ImageIcon,
  FolderOpen,
  Music,
  Mail,
  MailOpen,
  Globe,
  Search,
  Plane,
  Video,
} from "lucide-react"

const tools = [
  {
    id: "getWeather",
    name: "Weather Tool",
    description: "Fetch current weather data for any location worldwide",
    icon: Cloud,
    category: "Data",
    apiRequired: "OpenWeather API",
    example: "Get weather for San Francisco",
  },
  {
    id: "executeShell",
    name: "Shell Executor",
    description: "Run shell commands and system operations",
    icon: Terminal,
    category: "System",
    apiRequired: "None",
    example: "ls -la /home/user",
  },
  {
    id: "generateImage",
    name: "Image Generator",
    description: "Generate images with AI using various models",
    icon: ImageIcon,
    category: "Creative",
    apiRequired: "DALL-E or Stable Diffusion",
    example: "Generate a sunset over mountains",
  },
  {
    id: "analyzeSrcStructureTool",
    name: "Project Analyzer",
    description: "Analyze project folder structure and codebase",
    icon: FolderOpen,
    category: "Development",
    apiRequired: "None",
    example: "Analyze React project structure",
  },
  {
    id: "musicMood",
    name: "Music Mood Analyzer",
    description: "Analyze music mood and characteristics",
    icon: Music,
    category: "Creative",
    apiRequired: "Spotify API",
    example: "Analyze mood of uploaded song",
  },
  {
    id: "sendEmail",
    name: "Email Sender",
    description: "Send emails via Gmail API integration",
    icon: Mail,
    category: "Communication",
    apiRequired: "Gmail API",
    example: "Send project update email",
  },
  {
    id: "readEmail",
    name: "Email Reader",
    description: "Read emails from Gmail inbox",
    icon: MailOpen,
    category: "Communication",
    apiRequired: "Gmail API",
    example: "Check latest unread emails",
  },
  {
    id: "webSearch",
    name: "Web Search",
    description: "Perform real-time web search queries",
    icon: Globe,
    category: "Data",
    apiRequired: "Tavily or SERP API",
    example: "Search for latest AI news",
  },
  {
    id: "scrapeDocsTool",
    name: "Web Scraper",
    description: "Scrape data from URLs and documentation",
    icon: Search,
    category: "Data",
    apiRequired: "None",
    example: "Extract content from website",
  },
  {
    id: "fetchFlightDetails",
    name: "Flight Tracker",
    description: "Get live flight data and status",
    icon: Plane,
    category: "Travel",
    apiRequired: "Aviation API",
    example: "Track flight AA123 status",
  },
  {
    id: "fetchYouTubeVideo",
    name: "YouTube Integration",
    description: "Interact with YouTube content and metadata",
    icon: Video,
    category: "Media",
    apiRequired: "YouTube API",
    example: "Get video details and transcript",
  },
]

const categories = ["All", "Data", "System", "Creative", "Development", "Communication", "Travel", "Media"]

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Available Tools</h1>
        <p className="text-xl text-muted-foreground">
          Phoenix comes with a comprehensive set of tools that your AI agents can use to interact with the real world.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-muted">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          return (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-foreground">Tool ID:</span>
                    <code className="ml-2 text-sm bg-muted px-2 py-1 rounded">{tool.id}</code>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">API Required:</span>
                    <span className="ml-2 text-sm text-muted-foreground">{tool.apiRequired}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">Example:</span>
                    <p className="text-sm text-muted-foreground italic mt-1">"{tool.example}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How Tools Work */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How Tools Work in Phoenix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">1. Dynamic Selection</h3>
            <p className="text-muted-foreground">
              Tools are dynamically selected at runtime based on your configuration. You can enable or disable specific
              tools for each agent session.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">2. Automatic Invocation</h3>
            <p className="text-muted-foreground">
              The AI model automatically decides when and how to use tools based on the conversation context and user
              requests.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">3. Real-time Execution</h3>
            <p className="text-muted-foreground">
              Tools execute in real-time and return results that the AI can use to provide more accurate and helpful
              responses.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Tools */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Creating Custom Tools</CardTitle>
          <CardDescription>
            Phoenix is designed to be extensible. You can easily add your own custom tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>
              {`// Example custom tool structure
export const customTool = {
  id: 'myCustomTool',
  name: 'My Custom Tool',
  description: 'Description of what this tool does',
  parameters: {
    type: 'object',
    properties: {
      input: {
        type: 'string',
        description: 'Input parameter description'
      }
    },
    required: ['input']
  },
  execute: async (params) => {
    // Tool implementation
    return { result: 'Tool output' }
  }
}`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
