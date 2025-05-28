import { MyAgentsList } from "@/components/blockchain/my-agents-list"
import Navbar from "@/components/navbar"
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";


export default function MyAgentsPage() {
  return (
    
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
    <InteractiveGridPattern className={cn(
          "[mask-image:radial-gradient(750px_circle_at_center,white,transparent)]",
          "inset-x-auto inset-y-auto  h-[200%] skew-y-6")}/>
      
      <main className="flex-1 container py-8">
         
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">My Purchased Agents</h2>
        </div>
        <div className="">
          <MyAgentsList />
        </div>
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
