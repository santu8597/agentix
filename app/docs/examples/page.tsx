import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Bot, Mail, Search, ImageIcon, Code } from "lucide-react"

export default function ExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Examples</h1>
        <p className="text-xl text-muted-foreground">
          Practical examples and use cases to help you get started with Phoenix AI agents.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Basic Examples</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Bot className="h-8 w-8 text-primary" />
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <CardTitle>Simple Chatbot</CardTitle>
              <CardDescription>Create a basic conversational AI agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm">
                <code>
                  {`const agent = {
  name: "Helper Bot",
  systemPrompt: "You are a helpful assistant.",
  tools: [],
  temperature: 0.7
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Search className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <CardTitle>Web Search Agent</CardTitle>
              <CardDescription>Agent that can search the web for information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm">
                <code>
                  {`const searchAgent = {
  name: "Research Assistant",
  systemPrompt: "You help users find information online.",
  tools: ["webSearch"],
  maxSteps: 3
}`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Advanced Examples</h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Mail className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Advanced</Badge>
              </div>
              <CardTitle>Email Management Agent</CardTitle>
              <CardDescription>Comprehensive email assistant with reading and sending capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Configuration</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <code>
                      {`const emailAgent = {
  name: "Email Assistant",
  systemPrompt: \`You are an email management assistant. 
You can read emails, compose responses, and organize communications.
Always ask for confirmation before sending emails.\`,
  tools: ["readEmail", "sendEmail"],
  maxSteps: 5,
  temperature: 0.3
}`}
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Usage</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <code>
                      {`User: "Check my latest emails and draft a response to any urgent ones"
Agent: "I'll check your emails and help you respond to urgent messages."`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <ImageIcon className="h-8 w-8 text-purple-600" />
                <Badge variant="outline">Advanced</Badge>
              </div>
              <CardTitle>Creative Content Agent</CardTitle>
              <CardDescription>Multi-modal agent for content creation and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Configuration</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <code>
                      {`const creativeAgent = {
  name: "Creative Assistant",
  systemPrompt: \`You are a creative content assistant specializing in 
visual and written content creation. You can generate images, 
analyze existing content, and provide creative suggestions.\`,
  tools: [
    "generateImage", 
    "webSearch", 
    "analyzeSrcStructureTool"
  ],
  maxSteps: 7,
  temperature: 0.8
}`}
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Generate marketing visuals</li>
                    <li>• Create social media content</li>
                    <li>• Analyze competitor content</li>
                    <li>• Design blog post illustrations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Specialized Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Specialized Use Cases</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Code className="h-8 w-8 text-orange-600" />
                <Badge variant="outline">Expert</Badge>
              </div>
              <CardTitle>Development Assistant</CardTitle>
              <CardDescription>Code analysis and project management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm">
                <code>
                  {`const devAgent = {
  name: "Dev Assistant",
  systemPrompt: \`You are a software development assistant.
You can analyze code structure, suggest improvements,
and help with project organization.\`,
  tools: [
    "analyzeSrcStructureTool",
    "executeShell",
    "webSearch"
  ],
  maxSteps: 10
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-8 w-8 text-red-600" />
                <Badge variant="outline">Expert</Badge>
              </div>
              <CardTitle>Research Agent</CardTitle>
              <CardDescription>Comprehensive research and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm">
                <code>
                  {`const researchAgent = {
  name: "Research Assistant",
  systemPrompt: \`You are a research specialist who can
gather information from multiple sources, analyze data,
and create comprehensive reports.\`,
  tools: [
    "webSearch",
    "scrapeDocsTool",
    "fetchYouTubeVideo"
  ],
  maxSteps: 15
}`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Best Practices</h2>

        <Card>
          <CardHeader>
            <CardTitle>Agent Design Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">System Prompts</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific about the agent's role and capabilities</li>
                  <li>• Include guidelines for tool usage</li>
                  <li>• Set clear boundaries and limitations</li>
                  <li>• Provide examples of expected behavior</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Tool Selection</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Only include tools relevant to the agent's purpose</li>
                  <li>• Consider security implications of each tool</li>
                  <li>• Test tool combinations thoroughly</li>
                  <li>• Monitor tool usage patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Performance Tuning</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Adjust temperature based on use case</li>
                  <li>• Set appropriate maxSteps limits</li>
                  <li>• Monitor response times and costs</li>
                  <li>• Implement proper error handling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
