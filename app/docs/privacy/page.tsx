import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, Eye, Lock, Database, Globe, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
          <Shield className="mr-3 h-10 w-10 text-primary" />
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground">
          Your privacy is important to us. This policy explains how Phoenix collects, uses, and protects your
          information.
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: January 1, 2024</p>
      </div>

      {/* Information We Collect */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Eye className="mr-2 h-6 w-6" />
          Information We Collect
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Information you provide when creating an account</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Email address (for authentication via OAuth)</li>
                <li>• Profile information from OAuth providers (Google, GitHub)</li>
                <li>• User preferences and settings</li>
                <li>• Agent configurations and custom prompts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Data</CardTitle>
              <CardDescription>Information about how you use Phoenix</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Conversation history with AI agents</li>
                <li>• Tool usage patterns and frequency</li>
                <li>• Performance metrics and error logs</li>
                <li>• Session duration and interaction patterns</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
              <CardDescription>Automatically collected technical data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• IP address and location data</li>
                <li>• Browser type and version</li>
                <li>• Device information and operating system</li>
                <li>• Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Database className="mr-2 h-6 w-6" />
          How We Use Your Information
        </h2>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Service Provision</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Provide and maintain Phoenix services</li>
                  <li>• Process AI agent interactions</li>
                  <li>• Execute tool functions and integrations</li>
                  <li>• Personalize user experience</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Improvement & Analytics</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Analyze usage patterns and performance</li>
                  <li>• Improve AI model responses</li>
                  <li>• Develop new features and tools</li>
                  <li>• Debug and fix technical issues</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Communication</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Send service updates and notifications</li>
                  <li>• Respond to support requests</li>
                  <li>• Share important security information</li>
                  <li>• Provide technical documentation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Legal Compliance</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Comply with legal obligations</li>
                  <li>• Protect against fraud and abuse</li>
                  <li>• Enforce terms of service</li>
                  <li>• Respond to legal requests</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Sharing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Globe className="mr-2 h-6 w-6" />
          Data Sharing and Third Parties
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Phoenix integrates with third-party AI services to provide intelligent responses:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • <strong>Google AI:</strong> For Gemini model interactions
                </li>
                <li>
                  • <strong>OpenAI:</strong> For GPT model access (if configured)
                </li>
                <li>
                  • <strong>Anthropic:</strong> For Claude model access (if configured)
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                These providers may process your conversation data according to their own privacy policies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tool Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                When you use specific tools, data may be shared with relevant services:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • <strong>Gmail API:</strong> For email reading and sending
                </li>
                <li>
                  • <strong>Search APIs:</strong> For web search functionality
                </li>
                <li>
                  • <strong>Weather APIs:</strong> For weather information
                </li>
                <li>
                  • <strong>Image Generation:</strong> For AI image creation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>We Do NOT Share</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Personal information for marketing purposes</li>
                <li>• Conversation data with unauthorized parties</li>
                <li>• User data for advertising or profiling</li>
                <li>• Information to data brokers or similar entities</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Lock className="mr-2 h-6 w-6" />
          Data Security
        </h2>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Technical Safeguards</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• End-to-end encryption for data transmission</li>
                  <li>• Secure authentication via OAuth 2.0</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Access controls and permission management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Operational Security</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Limited employee access to user data</li>
                  <li>• Regular backup and disaster recovery</li>
                  <li>• Incident response procedures</li>
                  <li>• Compliance with industry standards</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Note:</strong> While we implement robust security measures, no system is 100% secure. We
                encourage users to follow best practices for account security.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Mail className="mr-2 h-6 w-6" />
          Contact Us
        </h2>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              If you have questions about this privacy policy or your personal information, please contact us:
            </p>
            <div className="space-y-3">
              <div>
                <strong>Email:</strong> privacy@phoenix-ai.dev
              </div>
              <div>
                <strong>Support:</strong> support@phoenix-ai.dev
              </div>
              <div>
                <strong>GitHub:</strong>{" "}
                <Link href="https://github.com/yourusername/phoenix" className="text-primary hover:underline">
                  github.com/yourusername/phoenix
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted border border-border rounded-lg">
              <p className="text-foreground text-sm">
                <strong>Response Time:</strong> We aim to respond to privacy-related inquiries within 72 hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
