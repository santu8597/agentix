import { MyAgentsList } from "@/components/blockchain/my-agents-list"
import Navbar from "@/components/navbar"

export default function MyAgentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Purchased Agents</h2>
        </div>
        <div className="rid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
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
