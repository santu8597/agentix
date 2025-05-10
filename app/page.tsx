import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Command, Cpu, Globe, Lock, MessageSquare, Puzzle, Settings, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              Agentix
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">
              How It Works
            </Link>
            <Link href="#docs" className="text-gray-600 hover:text-purple-600 transition-colors">
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex border-purple-200 text-purple-600 hover:bg-purple-50">
              Sign In
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex justify-center items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                  Flexible AI Agent Framework
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Build Powerful AI Agents with <span className="text-purple-600">Agentix</span>
                </h1>
                <p className="text-xl text-gray-600">
                  A flexible and extensible AI agent framework built with Next.js and the Vercel AI SDK. Combine custom
                  prompts with dynamic tool execution in a sleek, browser-based interface.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/chat" className="bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white flex items-center rounded-sm shadow-sm">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="/ai-test" className="bg-white text-purple-600 flex px-3 items-center rounded-sm shadow-sm border">
                    Make your Own <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              {/* <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-purple-100">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 flex items-center px-4 gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 text-xs text-gray-500">Agentix Playground</div>
                  </div>
                  <div className="pt-10 bg-white">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Agentix Interface"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to build, test, and run AI agents that combine reasoning with real-world actions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dynamic Tool Execution</h3>
                <p className="text-gray-600">
                  Agents can call multiple real-world tools like web search, email, shell commands, and more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Prompt Playground</h3>
                <p className="text-gray-600">
                  Craft, test, and iterate on AI prompts with live feedback in a user-friendly interface.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Selective Tool Use</h3>
                <p className="text-gray-600">
                  Activate only the tools you need per agent session for maximum efficiency and control.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <Puzzle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Modular & Extensible</h3>
                <p className="text-gray-600">
                  Easily add or remove tools via clean interfaces. Build your perfect agent workflow.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Modern Tech Stack</h3>
                <p className="text-gray-600">
                  Built with Next.js, Tailwind, TypeScript, and the Vercel AI SDK for a powerful foundation.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Google OAuth Integration</h3>
                <p className="text-gray-600">
                  Securely access and manage Gmail and YouTube via OAuth-based authentication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Agentix Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building AI agents has never been easier. Follow these simple steps to get started.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Define Your Agent</h3>
                <p className="text-gray-600">
                  Create a new agent and define its purpose, capabilities, and behavior through custom prompts.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Select Tools</h3>
                <p className="text-gray-600">
                  Choose from a library of pre-built tools or create your own custom tools for your agent to use.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Deploy & Interact</h3>
                <p className="text-gray-600">
                  Deploy your agent and start interacting with it through the intuitive browser-based interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your AI Agent?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join developers and researchers who are building the next generation of AI agents with Agentix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-700">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Cpu className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">Agentix</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Blog
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Command className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Agentix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
