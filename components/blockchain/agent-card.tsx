"use client"

import { useState } from "react"
import Image from "next/image"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { formatEther } from "viem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CONTRACT_ABI, CONTRACT_ADDRESS, type Agent } from "@/lib/contract"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
interface AgentCardProps {
  agent: Agent
  isPurchased?: boolean
}

export function AgentCard({ agent, isPurchased = false }: AgentCardProps) {
  const { toast } = useToast()
  const { isConnected } = useAccount()
  const [showDetails, setShowDetails] = useState(false)
  const extractIdFromUrl = (url:string) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

  const { data: hash, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleBuy = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "buyAgent",
        args: [agent.id],
        value: agent.price,
      })
    } catch (error) {
      console.error("Error buying agent:", error)
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = () => {
    setShowDetails(true)
  }

  return (
    <>
      <Card className="overflow-hidden h-full w-72">
        <div className="relative h-36">
          <Image
            src={agent.imageLink || "/placeholder.svg?height=200&width=400"}
            alt={agent.agentName}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{agent.agentName}</CardTitle>
          <CardDescription className="line-clamp-2">{agent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="font-medium">{formatEther(agent.price)} ETH</div>
            <div className="text-sm text-muted-foreground">ID: {agent.id.toString()}</div>
          </div>
        </CardContent>
        <CardFooter>
          {isPurchased ? (
            <Button className="w-full" onClick={handleViewDetails}>
              View Details
            </Button>
          ) : (
            <Button className="w-full" onClick={handleBuy} disabled={!isConnected || isPending || isConfirming}>
              {isPending || isConfirming ? "Processing..." : "Buy Now"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{agent.agentName}</DialogTitle>
            <DialogDescription>Created by: {agent.creator}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative h-48 w-full rounded-md overflow-hidden">
              <Image
                src={agent.imageLink || "/placeholder.svg?height=200&width=400"}
                alt={agent.agentName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
            {isPurchased && agent.fileLink && (
              <div>
                <h4 className="font-medium mb-1">File Link</h4>
                <a
                  href={agent.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {agent.fileLink}
                </a>
                <Link href={`/ai-use/${extractIdFromUrl(agent.fileLink)}/chat-with-agent`}>use your agent</Link>
              </div>
            )}
            <div>
              <h4 className="font-medium mb-1">Price</h4>
              <p className="text-sm">{formatEther(agent.price)} ETH</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
