"use client"
import Link from "next/link"

import { ArrowRight, Code, Command, Cpu, Globe, Lock, MessageSquare, Puzzle, Settings, Zap } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Inbox, LogOut, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              Phoenix
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
            {status === "authenticated" && (
            <div className="flex items-center gap-4">
            <img src={`${session.user?.image}`} className="rounded-full h-8 w-8" alt="" />
              <div className="text-sm text-gray-600 dark:text-gray-300">{session.user?.email}</div>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          )}

          {status === "unauthenticated" && (
          
            <Button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-6 py-5 rounded-md shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign in with Google
            </Button>
          
        )}
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
                  Build Powerful AI Agents with <span className="text-purple-600">Phoenix</span>
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
                    <div className="ml-4 text-xs text-gray-500">Phoenix Playground</div>
                  </div>
                  <div className="pt-10 bg-white">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Phoenix Interface"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Phoenix Works</h2>
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
              Join developers and researchers who are building the next generation of AI agents with Phoenix.
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
              <span className="text-xl font-bold text-gray-900">Phoenix</span>
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
            © {new Date().getFullYear()} Phoenix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
