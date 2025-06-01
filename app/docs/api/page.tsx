import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, CreditCard, Key,Copy  } from "lucide-react"
import { ClipboardCopy } from "@/components/ClipboardCopy/page"


export default function APIReferencePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for Phoenix's REST API endpoints and how to interact with your purchased agents.
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

      {/* Agent Service API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Bot className="mr-2 h-6 w-6" />
          Agent Service API
        </h2>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Note:</strong> To use the Agent Service API, you must first purchase an agent. Each purchased
                agent gets a unique agent ID that you use in the API endpoint.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Interact with Your Agent
              <Badge variant="outline">POST</Badge>
            </CardTitle>
            <CardDescription>/api/service/{"{agent_id}"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Endpoint Structure</h4>
                <div className="bg-muted p-3 rounded text-sm flex items-center justify-between">
                  <code>POST https://your-phoenix-instance.vercel.app/api/service/QmaXcMfG</code>
                   <ClipboardCopy text="https://your-phoenix-instance.vercel.app/api/service/QmaXcMfG"/>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Replace <code>QmaXcMfG</code> with your actual agent ID received after purchase.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Request Headers</h4>
                <div className="bg-muted p-3 rounded text-sm flex items-center justify-between">
                  <code  className="overflow-x-auto whitespace-nowrap">
                    Content-Type: application/json
                    </code>
                     <ClipboardCopy  text="application/json"  />
                  
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <div className="bg-muted p-3 rounded text-sm flex items-center justify-between">
                  <code>
                    {`{
  "query": "What can u do?"
}`}               
                    
                  </code>
                  <ClipboardCopy text= " What can u do?"/>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Format</h4>
                <div className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>
                    {`{
  "result": "I can generate images based on text prompts using the 'generateImage' function. For example, if you provide the prompt 'a cat riding a bicycle', I will generate an image of a cat riding a bicycle.",
  "tools": [
    {
      "stepType": "initial",
      "text": "I can generate images based on text prompts using the 'generateImage' function. For example, if you provide the prompt 'a cat riding a bicycle', I will generate an image of a cat riding a bicycle.",
      "reasoningDetails": [],
      "files": [],
      "sources": [],
      "toolCalls": []
    }
  ]
}`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Fields</h4>
                <div className="space-y-3">
                  <div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">result</code>
                    <p className="text-sm text-muted-foreground mt-1">The main response text from your agent</p>
                  </div>
                  <div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">tools</code>
                    <p className="text-sm text-muted-foreground mt-1">Array of tool execution steps and details</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">stepType</code>
                    <p className="text-sm text-muted-foreground mt-1">Type of step (initial, tool_call, etc.)</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">text</code>
                    <p className="text-sm text-muted-foreground mt-1">Text content for this step</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">reasoningDetails</code>
                    <p className="text-sm text-muted-foreground mt-1">Agent's reasoning process (if available)</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">files</code>
                    <p className="text-sm text-muted-foreground mt-1">Generated or processed files</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">sources</code>
                    <p className="text-sm text-muted-foreground mt-1">Information sources used</p>
                  </div>
                  <div className="ml-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm">toolCalls</code>
                    <p className="text-sm text-muted-foreground mt-1">Details of tools executed</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

     

      {/* Example Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Example Usage</h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>cURL Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>
                  {`curl -X POST https://your-phoenix-instance.vercel.app/api/service/QmaXcMfG \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "Generate an image of a sunset over mountains"
  }'`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JavaScript Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>
                  {`const response = await fetch('https://your-phoenix-instance.vercel.app/api/service/QmaXcMfG', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'What are your capabilities?'
  })
});

const data = await response.json();
console.log(data.result);`}
                </code>
              </div>
            </CardContent>
          </Card>

         
        </div>
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
                <span className="text-muted-foreground">Success - Agent responded successfully</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  400
                </code>
                <span className="text-muted-foreground">Bad Request - Invalid query format</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  401
                </code>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  403
                </code>
                <span className="text-muted-foreground">Forbidden - Agent not purchased or access denied</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  404
                </code>
                <span className="text-muted-foreground">Not Found - Agent ID does not exist</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  429
                </code>
                <span className="text-muted-foreground">Rate Limited - Too many requests</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  500
                </code>
                <span className="text-muted-foreground">Internal Server Error - Agent processing failed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rate Limits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Rate Limits</h2>

        <Card>
          <CardHeader>
            <CardTitle>API Usage Limits</CardTitle>
            <CardDescription>Understand the limits for your API usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">100</div>
                  <div className="text-sm text-muted-foreground">Requests per minute</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">1000</div>
                  <div className="text-sm text-muted-foreground">Requests per hour</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">10000</div>
                  <div className="text-sm text-muted-foreground">Requests per day</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Rate limits may vary based on your subscription plan. Contact support for higher limits.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Best Practices</h2>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Query Optimization</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific and clear in your queries</li>
                  <li>• Provide context when necessary</li>
                  <li>• Break complex requests into smaller parts</li>
                  <li>• Use consistent terminology</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Error Handling</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Always check response status codes</li>
                  <li>• Implement retry logic for transient errors</li>
                  <li>• Log errors for debugging</li>
                  <li>• Handle rate limiting gracefully</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Security</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Never expose API keys in client-side code</li>
                  <li>• Use environment variables for API keys</li>
                  <li>• Rotate API keys regularly</li>
                  <li>• Monitor API usage for anomalies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
