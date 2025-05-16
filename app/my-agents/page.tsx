import { MyAgentsList } from "@/components/blockchain/my-agents-list"
// import { ConnectButton } from "@/components/connect-button"

export default function MyAgentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">AI Agent Marketplace</h1>
          {/* <div className="flex items-center gap-4">
            <ConnectButton />
          </div> */}
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Purchased Agents</h2>
          <div className="flex gap-4">
            <a href="/" className="text-primary hover:underline">
              Home
            </a>
            <a href="/buy" className="text-primary hover:underline">
              Buy
            </a>
            <a href="/sell" className="text-primary hover:underline">
              Sell
            </a>
          </div>
        </div>
        <MyAgentsList />
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
