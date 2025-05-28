"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"
import { AgentCard } from "@/components/blockchain/agent-card"
import { CONTRACT_ABI, CONTRACT_ADDRESS, type Agent } from "@/lib/contract"
import { Skeleton } from "@/components/ui/skeleton"

export function AgentList() {
  const { isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(true)

  const result = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getAllAgents",
    query: {
      enabled: isConnected,
    },
  })
  const {
      data: agents,
      isError,
      isLoading: isLoadingAgents,
    } = result as { data: Agent[]; isError: boolean; isLoading: boolean }
  

  useEffect(() => {
    if (!isConnected || isLoadingAgents) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isConnected, isLoadingAgents])

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground">Please connect your wallet to browse available agents.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-48 w-full rounded-md mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2 text-red-500">Error Loading Agents</h3>
        <p className="text-muted-foreground">There was an error loading the agents. Please try again later.</p>
      </div>
    )
  }

  if (!agents || agents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Agents Available</h3>
        <p className="text-muted-foreground">There are no agents available for purchase at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24">
      {agents.map((agent: Agent) => (
        <AgentCard key={agent.id.toString()} agent={agent} />
      ))}
    </div>
  )
}
