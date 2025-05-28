"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"
import { AgentCard } from "@/components/blockchain/agent-card"
import { CONTRACT_ABI, CONTRACT_ADDRESS, type Agent } from "@/lib/contract"
import { Skeleton } from "@/components/ui/skeleton"

export function MyAgentsList() {
  const { isConnected,address } = useAccount()
  const [isLoading, setIsLoading] = useState(true)

  const result = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getMyPurchasedAgents",
    account: address,
    query: {
      enabled: isConnected,
    },
  })
  const {
    data: myAgents,
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
        <p className="text-muted-foreground">Please connect your wallet to view your purchased agents.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
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
        <h3 className="text-xl font-medium mb-2 text-red-500">Error Loading Your Agents</h3>
        <p className="text-muted-foreground">
          There was an error loading your purchased agents. Please try again later.
        </p>
      </div>
    )
  }

  if (!myAgents || myAgents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Purchased Agents</h3>
        <p className="text-muted-foreground">
          You haven't purchased any agents yet. Browse the marketplace to find agents.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1 mt-24">
      {myAgents.map((agent: Agent) => (
        <AgentCard key={agent.id.toString()} agent={agent} isPurchased={true} />
      ))}
    </div>
  )
}
