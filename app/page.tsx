import { Button } from "@/components/ui/button"
import { Bot, Database, Shield, Zap, Code, Workflow, Sparkles } from "lucide-react"

import UseCases from "@/components/frontend/use-cases"
import Navbar from "@/components/navbar"
import Footer from "@/components/frontend/footer"
import TypingPromptInput from "@/components/frontend/typing-prompt-input"
import FramerSpotlight from "@/components/frontend/framer-spotlight"
import CssGridBackground from "@/components/frontend/css-grid-background"
import FeaturesSection from "@/components/frontend/features-section"

import PhoenixLogo from "@/components/frontend/phoenix-logo"
import Link from "next/link"
export default function Home() {
  return (
    <>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-6">AI Agent Framework</div>
              <div className="flex items-center justify-center mb-6">
                <PhoenixLogo className="text-white shadow-md font-bold" width={60} height={60} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                Build Powerful AI Agents with Phoenix
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl mb-12">
                A flexible and extensible AI agent framework for building, testing, and running AI agents with dynamic
                tool execution.
              </p>

              <TypingPromptInput />

              <div className="flex flex-wrap justify-center gap-3 mt-16">
                <Link href="/chat" className="flex items-center gap-3 px-5 py-6 h-[60px] bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(36,101,237,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <Zap className="h-5 w-5 text-white relative z-10" />
                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-[15px] font-medium">Get Started</span>
                    <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">v1.0.0</span>
                  </div>
                </Link>
                <Link href="/chat" className="flex items-center gap-3 px-5 py-6 h-[60px] bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(36,101,237,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <PhoenixLogo className="text-white relative z-10" width={30} height={30} />
                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-[15px] font-medium">Customise your AI</span>
                    <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">v1.0.0</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Tools Table */}
        <section className="py-20 bg-muted/30 dark:bg-muted/10" id="tools">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                  Powerful Tools
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Extensive Tool Library</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Phoenix comes with a wide range of pre-built tools that your agents can use to interact with the
                  world.
                </p>
              </div>
            </div>
            {/* <ToolsTable /> */}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20" id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How Phoenix Works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Build, test, and deploy AI agents in three simple steps.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Design Your Agent</h3>
                <p className="text-muted-foreground">
                  Craft prompts in the playground and select the tools your agent will have access to.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Test & Refine</h3>
                <p className="text-muted-foreground">
                  Iterate on your agent's behavior with live feedback and real-world tool execution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Deploy & Scale</h3>
                <p className="text-muted-foreground">
                  Integrate your agent into applications or run it as a standalone service with our API.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <UseCases />

        {/* Testimonials */}
        {/* <Testimonials /> */}

        {/* Contact/Pricing Section */}
        <section id="contact" className="py-20 bg-muted/50 dark:bg-muted/10" aria-labelledby="contact-heading">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Build Your Agent?
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Get in touch to discuss your use case or request a demo of Phoenix in action.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span>Unlimited agent configurations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Vector-based memory system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Extensible tool architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    <span>Multi-step toolchain builder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Export agents as NFT-powered assets</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium">
                    Contact us for a personalized demo and to discuss your specific requirements.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
