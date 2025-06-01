import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Key, Settings, Shield, Zap } from "lucide-react"

export default function ConfigurationPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Configuration Guide</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to configure Phoenix for your specific needs and use cases.
        </p>
      </div>

      {/* Environment Variables */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Key className="mr-2 h-6 w-6" />
          Environment Variables
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
              <CardDescription>Configure your AI model providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">GOOGLE_GENERATIVE_AI_API_KEY</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Required for Google Gemini models. Get your API key from the Google AI Studio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search & Web Tools</CardTitle>
              <CardDescription>Configure web search and scraping capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">TAVILY_API_KEY</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    For advanced web search capabilities. Sign up at tavily.com for an API key.
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">SERP_API_KEY</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Alternative search provider. Get your key from serpapi.com.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>OAuth and session management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">GOOGLE_CLIENT_ID</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Google OAuth client ID for Gmail integration and user authentication.
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">GOOGLE_CLIENT_SECRET</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Google OAuth client secret. Keep this secure and never expose it publicly.
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">NEXTAUTH_SECRET</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Random string used to encrypt session tokens. Generate with: openssl rand -base64 32
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">NEXTAUTH_URL</code>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your application URL. Use http://localhost:3000 for development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tool Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Settings className="mr-2 h-6 w-6" />
          Tool Configuration
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Selective Tool Activation</CardTitle>
            <CardDescription>Configure which tools are available for each agent session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
              <code>
                {`// Example tool configuration
const agentConfig = {
  tools: [
    'webSearch',
    'generateImage', 
    'sendEmail',
    'getWeather'
  ],
  maxSteps: 5,
  temperature: 0.7
}`}
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Tools can be enabled or disabled per session based on your agent's requirements.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Security Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          Security Configuration
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Key Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Never commit API keys to version control</li>
                <li>• Use environment variables for all sensitive data</li>
                <li>• Rotate API keys regularly</li>
                <li>• Use different keys for development and production</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OAuth Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Google OAuth Setup</h4>
                  <ol className="list-decimal list-inside text-muted-foreground text-sm space-y-1 mt-2">
                    <li>Go to Google Cloud Console</li>
                    <li>Create a new project or select existing</li>
                    <li>Enable Gmail API and Google+ API</li>
                    <li>Create OAuth 2.0 credentials</li>
                    <li>Add authorized redirect URIs</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Performance Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Zap className="mr-2 h-6 w-6" />
          Performance Configuration
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Model Parameters</h4>
                <div className="bg-muted p-3 rounded text-sm mt-2">
                  <code>
                    temperature: 0.7 // Controls randomness (0-1)
                    <br />
                    maxTokens: 2048 // Maximum response length
                    <br />
                    topP: 0.9 // Nucleus sampling parameter
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Agent Limits</h4>
                <div className="bg-muted p-3 rounded text-sm mt-2">
                  <code>
                    maxSteps: 5 // Maximum tool calls per session
                    <br />
                    timeout: 30000 // Request timeout in milliseconds
                    <br />
                    retries: 3 // Number of retry attempts
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
