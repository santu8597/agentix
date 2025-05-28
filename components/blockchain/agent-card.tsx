"use client"

import { useState } from "react"
import Image from "next/image"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { formatEther } from "viem"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
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

  const extractIdFromUrl = (url: string) => {
    const parts = url.split("/")
    return parts[parts.length - 1]
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
    <div className="">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-background dark:border-white/[0.2] border-black/[0.1] w-[25rem] min-h-[27rem] h-auto rounded-xl py-6 px-4 border -mt-32">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mb-6">
            {agent.agentName}
          </CardItem>
          
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={agent.imageLink || "/placeholder.svg?height=200&width=400"}
              alt={agent.agentName}
              height={240}
              width={320}
              className="h-48 w-full object-cover rounded-md group-hover/card:shadow-xl"
            />
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 line-clamp-1"
          >
            {agent.description}
          </CardItem>
          <CardItem translateZ="50" className="flex flex-row justify-between items-center mt-2 gap-10">
            {!isPurchased && <div className="font-medium text-lg">Price: {formatEther(agent.price)} ETH</div>}
            
            {/* <div className="text-sm text-muted-foreground">ID: {agent.id.toString()}</div> */}
            
          </CardItem>
          <div className="flex justify-between mt-6">
            {isPurchased ? (
              <div className="flex flex-col items-center">
              <CardItem
                translateZ={20}
                as="button"
                onClick={handleViewDetails}
                className="px-4 py-3 rounded-md bg-black dark:bg-white dark:text-black text-white text-xs font-bold w-full"
              >
                View Details
              </CardItem>
              <Link
                  className="bg-primary text-white rounded-md px-32 py-2 mt-2 flex text-md text-center text-nowrap"
                  href={`/ai-use/${extractIdFromUrl(agent.fileLink)}/chat-with-agent`}
                >
                  Use This Agent
                </Link>
              </div>
            ) : (
              <CardItem
                translateZ={20}
                as="button"
                onClick={handleBuy}
                disabled={!isConnected || isPending || isConfirming}
                className="px-4 py-3 rounded-md bg-black dark:bg-white dark:text-black text-white text-xs font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming ? "Processing..." : "Buy Now"}
              </CardItem>
            )}
          </div>
        </CardBody>
      </CardContainer>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg">{agent.agentName}</DialogTitle>
            <DialogDescription className="text-xs">Created by: {agent.creator}</DialogDescription>
          </DialogHeader>
          
            <div className="flex justify-center">
              {/* <CardContainer className="" containerClassName=" -my-2">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-72 h-96 rounded-lg p-1 border">
                  <CardItem translateZ="100" className="w-full"> */}
                    <Image
                      src={agent.imageLink || "/placeholder.svg?height=200&width=400"}
                      alt={agent.agentName}
                      width={320}
                      height={240}
                      className="h-48 w-full object-cover rounded-lg group-hover/card:shadow-xl transition-shadow duration-300"
                    />
                  {/* </CardItem>
                </CardBody>
              </CardContainer> */}
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Description</h4>
              <p className="text-xs text-muted-foreground">{agent.description}</p>
            </div>
            {/* {isPurchased && agent.fileLink && (
              <div>
                <Link
                  className="bg-primary text-white rounded-sm px-2 py-1 inline-block text-xs"
                  href={`/ai-use/${extractIdFromUrl(agent.fileLink)}/chat-with-agent`}
                >
                  Use This Agent
                </Link>
              </div>
            )} */}
            <div>
              <h4 className="font-medium mb-1 text-sm">Price</h4>
              <p className="text-xs">{formatEther(agent.price)} ETH</p>
            </div>
          
        </DialogContent>
      </Dialog>
    </div>
  )
}