import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, CheckCircle, Clock, Zap, Brain, Shield, Puzzle } from "lucide-react"

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
          <GitBranch className="mr-3 h-10 w-10 text-primary" />
          Roadmap
        </h1>
        <p className="text-xl text-muted-foreground">
          Our vision for the future of Phoenix AI agent framework and upcoming features.
        </p>
      </div>

      {/* Completed Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
          Completed Features
        </h2>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Multi-tool Support</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                >
                  ✅ Complete
                </Badge>
              </div>
              <CardDescription>Dynamic inclusion of multiple tools per agent session</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">OAuth Integration</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                >
                  ✅ Complete
                </Badge>
              </div>
              <CardDescription>Secure authentication with Google OAuth 2.0</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Real-time Streaming</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                >
                  ✅ Complete
                </Badge>
              </div>
              <CardDescription>Live streaming of AI responses and tool executions</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* In Progress */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Clock className="mr-2 h-6 w-6 text-blue-600" />
          In Progress
        </h2>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Vector-based Memory System
                </CardTitle>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                  🚧 In Progress
                </Badge>
              </div>
              <CardDescription>Long-term memory for agents using vector embeddings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Core vector storage implemented, working on retrieval optimization
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Enhanced Security Features
                </CardTitle>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                  🚧 In Progress
                </Badge>
              </div>
              <CardDescription>Advanced security controls and audit logging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Implementing role-based access controls and audit trails
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Zap className="mr-2 h-6 w-6 text-purple-600" />
          Upcoming Features
        </h2>

        <div className="space-y-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Puzzle className="mr-2 h-5 w-5" />
                  Toolchain Builder
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300"
                >
                  📋 Planned
                </Badge>
              </div>
              <CardDescription>Visual interface for creating multi-step workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Drag-and-drop workflow designer</li>
                  <li>• Conditional logic and branching</li>
                  <li>• Template library for common workflows</li>
                  <li>• Integration with existing tools</li>
                </ul>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-xs">
                    Q2 2024
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Agent Marketplace</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300"
                >
                  📋 Planned
                </Badge>
              </div>
              <CardDescription>Share and discover pre-built agent configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Community-contributed agents</li>
                  <li>• Rating and review system</li>
                  <li>• One-click agent deployment</li>
                  <li>• Version control for agent configs</li>
                </ul>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-xs">
                    Q3 2024
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">NFT-Powered Agent Assets</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300"
                >
                  💡 Research
                </Badge>
              </div>
              <CardDescription>Export and trade agent configurations as NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Concept:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unique agent personalities as NFTs</li>
                  <li>• Transferable agent ownership</li>
                  <li>• Royalties for agent creators</li>
                  <li>• Cross-platform compatibility</li>
                </ul>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-xs">
                    Q4 2024
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Long-term Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Long-term Vision</h2>

        <Card>
          <CardHeader>
            <CardTitle>Phoenix 2.0: The Future of AI Agents</CardTitle>
            <CardDescription>Our vision for the next generation of Phoenix</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Technical Advances</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Multi-modal AI integration (text, image, audio, video)</li>
                  <li>• Autonomous agent-to-agent communication</li>
                  <li>• Advanced reasoning and planning capabilities</li>
                  <li>• Real-time learning and adaptation</li>
                  <li>• Edge computing support for privacy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Platform Features</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Enterprise-grade deployment options</li>
                  <li>• Advanced analytics and monitoring</li>
                  <li>• Multi-tenant architecture</li>
                  <li>• API gateway and rate limiting</li>
                  <li>• Compliance and governance tools</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Community Involvement */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Get Involved</h2>

        <Card>
          <CardHeader>
            <CardTitle>Shape the Future of Phoenix</CardTitle>
            <CardDescription>Your feedback and contributions drive our development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">How to Contribute</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Submit feature requests on GitHub</li>
                  <li>• Join our Discord community for discussions</li>
                  <li>• Contribute code and documentation</li>
                  <li>• Share your agent configurations</li>
                  <li>• Report bugs and suggest improvements</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Next Community Call:</strong> Join us every first Friday of the month to discuss roadmap
                  updates and community contributions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
