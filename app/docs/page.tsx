import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Settings, Play, CheckCircle, AlertCircle } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started with Phoenix</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to set up and configure Phoenix AI agent framework in just a few minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Badge variant="destructive" className="mr-2">
                Required
              </Badge>
              Node.js 18.0 or later
            </li>
            <li className="flex items-center">
              <Badge variant="destructive" className="mr-2">
                Required
              </Badge>
              npm, yarn, or pnpm package manager
            </li>
            <li className="flex items-center">
              <Badge variant="secondary" className="mr-2">
                Optional
              </Badge>
              Git for version control
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Clone the Repository</h2>
          <p className="text-muted-foreground mb-4">Start by cloning the Phoenix repository to your local machine:</p>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              git clone https://github.com/yourusername/phoenix.git
              <br />
              cd phoenix
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Install Dependencies</h2>
          <p className="text-muted-foreground mb-4">
            Install the required dependencies using your preferred package manager:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">pnpm</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">pnpm install</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">npm</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">npm install</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">yarn</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">yarn install</code>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Environment Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Create a <code className="bg-muted px-2 py-1 rounded">.env.local</code> file in the root directory and add
            your API credentials:
          </p>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>
              # AI Model Configuration
              <br />
              GOOGLE_GENERATIVE_AI_API_KEY=your-google-generative-ai-api-key
              <br />
              <br /># Search Tools
              <br />
              TAVILY_API_KEY=your-tavily-api-key
              <br />
              SERP_API_KEY=your-serp-api-key
              <br />
              <br /># Authentication
              <br />
              GOOGLE_CLIENT_ID=your-google-oauth-client-id
              <br />
              GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
              <br />
              NEXTAUTH_SECRET=your-nextauth-secret
              <br />
              NEXTAUTH_URL=http://localhost:3000
              <br />
              <br /># Additional Services
              <br />
              CORSEL_API_KEY=your-corsel-api-key
              <br />
              NEXT_PUBLIC_PINATA_API_KEY=your-pinata-api-key
              <br />
              NEXT_PUBLIC_PINATA_SECRET_API_KEY=your-pinata-api-secret
            </code>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Note:</strong> You don't need all API keys to get started. Phoenix will work with whatever tools
                you configure.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Start the Development Server</h2>
          <p className="text-muted-foreground mb-4">Launch the development server to start using Phoenix:</p>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>npm run dev</code>
          </div>
          <p className="text-muted-foreground mt-4">
            Open{" "}
            <Link href="http://localhost:3000" className="text-primary hover:underline">
              http://localhost:3000
            </Link>{" "}
            in your browser to access the Phoenix interface.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Create Your First Agent</h2>
          <p className="text-muted-foreground mb-4">Once Phoenix is running, you can create your first AI agent:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
            <li>Navigate to the agent creation interface</li>
            <li>Write a system prompt for your agent</li>
            <li>Select the tools you want your agent to have access to</li>
            <li>Start a conversation and watch your agent use tools dynamically</li>
          </ol>
        </section>
      </div>

      {/* Next Steps */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Play className="mr-2 h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/docs/tools" className="flex flex-col items-start">
                <span className="font-semibold">Explore Available Tools</span>
                <span className="text-sm text-muted-foreground">Learn about all the tools Phoenix provides</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/docs/configuration" className="flex flex-col items-start">
                <span className="font-semibold">Advanced Configuration</span>
                <span className="text-sm text-muted-foreground">Customize Phoenix for your needs</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Checklist */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Installation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Repository cloned successfully</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Dependencies installed</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Environment variables configured</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Development server running</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">First agent created</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end items-center mt-12 pt-8 border-t border-border">
        <Button asChild>
          <Link href="/docs/tools">
            Tools Reference
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
