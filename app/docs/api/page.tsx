import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Code, Webhook } from "lucide-react"

export default function APIReferencePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for Phoenix's REST API endpoints and WebSocket connections.
        </p>
      </div>

      {/* Base URL */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded">
            <code>https://your-phoenix-instance.vercel.app/api</code>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Authentication</h2>
        <Card>
          <CardHeader>
            <CardTitle>OAuth 2.0</CardTitle>
            <CardDescription>Phoenix uses OAuth 2.0 for secure authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Authorization Header</h4>
                <div className="bg-muted p-3 rounded text-sm mt-2">
                  <code>Authorization: Bearer YOUR_ACCESS_TOKEN</code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Getting an Access Token</h4>
                <div className="bg-muted p-3 rounded text-sm mt-2">
                  <code>
                    {`POST /api/auth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "authorization_code",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Agent Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Bot className="mr-2 h-6 w-6" />
          Agent Endpoints
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Create Agent Session
                <Badge variant="outline">POST</Badge>
              </CardTitle>
              <CardDescription>/api/agents/create</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Request Body</h4>
                  <div className="bg-muted p-3 rounded text-sm mt-2">
                    <code>
                      {`{
  "name": "My Agent",
  "systemPrompt": "You are a helpful assistant...",
  "tools": ["webSearch", "generateImage"],
  "model": "gemini-pro",
  "temperature": 0.7,
  "maxSteps": 5
}`}
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Response</h4>
                  <div className="bg-muted p-3 rounded text-sm mt-2">
                    <code>
                      {`{
  "id": "agent_123456",
  "name": "My Agent",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00Z"
}`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Send Message
                <Badge variant="outline">POST</Badge>
              </CardTitle>
              <CardDescription>/api/agents/{"{agentId}"}/messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Request Body</h4>
                  <div className="bg-muted p-3 rounded text-sm mt-2">
                    <code>
                      {`{
  "message": "What's the weather like in San Francisco?",
  "stream": true
}`}
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Response (Streaming)</h4>
                  <div className="bg-muted p-3 rounded text-sm mt-2">
                    <code>
                      {`data: {"type": "text", "content": "I'll check the weather for you..."}
data: {"type": "tool_call", "tool": "getWeather", "params": {"location": "San Francisco"}}
data: {"type": "text", "content": "The current weather in San Francisco is 72°F and sunny."}`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tool Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Code className="mr-2 h-6 w-6" />
          Tool Endpoints
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                List Available Tools
                <Badge variant="outline">GET</Badge>
              </CardTitle>
              <CardDescription>/api/tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm">
                <code>
                  {`{
  "tools": [
    {
      "id": "webSearch",
      "name": "Web Search",
      "description": "Perform real-time web search",
      "category": "Data",
      "enabled": true
    },
    {
      "id": "generateImage", 
      "name": "Image Generator",
      "description": "Generate images with AI",
      "category": "Creative",
      "enabled": true
    }
  ]
}`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WebSocket API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Webhook className="mr-2 h-6 w-6" />
          WebSocket API
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Communication</CardTitle>
            <CardDescription>Connect to Phoenix via WebSocket for real-time agent interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Connection URL</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>wss://your-phoenix-instance.vercel.app/api/ws</code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Message Format</h4>
                <div className="bg-muted p-3 rounded text-sm mt-2">
                  <code>
                    {`// Send message
{
  "type": "message",
  "agentId": "agent_123456",
  "content": "Hello, agent!"
}

// Receive response
{
  "type": "response",
  "agentId": "agent_123456", 
  "content": "Hello! How can I help you?",
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Error Handling</h2>

        <Card>
          <CardHeader>
            <CardTitle>HTTP Status Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <code className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  200
                </code>
                <span className="text-muted-foreground">Success</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  201
                </code>
                <span className="text-muted-foreground">Created</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  400
                </code>
                <span className="text-muted-foreground">Bad Request</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  401
                </code>
                <span className="text-muted-foreground">Unauthorized</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  429
                </code>
                <span className="text-muted-foreground">Rate Limited</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  500
                </code>
                <span className="text-muted-foreground">Internal Server Error</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
