import { AgentList } from "@/components/blockchain/agent-list"
// import { ConnectButton } from "@/components/connect-button"
import Navbar from "@/components/navbar"
import { cn } from "@/lib/utils"
import { GridPattern } from "@/components/magicui/grid-pattern"
export default function BuyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">AI Agent Marketplace</h1>

        </div>
      </header> */}
      <Navbar/>
       <GridPattern className={cn(
                "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                "inset-x-auto inset-y-auto  h-[300%] skew-y-6")}/>
            
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse AI Agents</h2>
          {/* <div className="flex gap-4">
            <a href="/" className="text-primary hover:underline">
              Home
            </a>
            <a href="/my-agents" className="text-primary hover:underline">
              My Agents
            </a>
            <a href="/sell" className="text-primary hover:underline">
              Sell
            </a>
          </div> */}
        </div>
        <AgentList />
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AI Agent Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
