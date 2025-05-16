"use client"

import type React from "react"

import { useState } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { CONTRACT_ABI, CONTRACT_ADDRESS, convertToWei } from "@/lib/contract"
import { generateRandomId, uploadToPinata } from "@/lib/pinata"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeployAgentModalProps {
  isOpen: boolean
  onClose: () => void
  systemPrompt: string
  selectedTools: string[]
}

export function DeployAgentModal({ isOpen, onClose, systemPrompt, selectedTools }: DeployAgentModalProps) {
  const { toast } = useToast()
  const { isConnected } = useAccount()
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    agentName: "",
    description: "",
    imageLink: "",
    price: "",
    prompt: systemPrompt, // Pre-filled with the current system prompt
    toolType: selectedTools, // Pre-filled with the first selected tool
  })

  const { data: hash, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleRadioChange = (value: string) => {
  //   setFormData((prev) => ({ ...prev, toolType: value }))
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create an agent.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)

      // Generate random ID for the file
      const fileId = generateRandomId()

      // Create content for the file
      const fileContent = JSON.stringify(
        {
          agentName: formData.agentName,
          description: formData.description,
          prompt: formData.prompt,
          toolType: formData.toolType,
          selectedTools: selectedTools, // Include all selected tools
          createdAt: new Date().toISOString(),
        },
        null,
        2,
      )

      // Upload to Pinata
      const fileLink = await uploadToPinata(fileContent, `${fileId}.json`)

      // Call the smart contract
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "createAgent",
        args: [formData.agentName, formData.description, formData.imageLink, fileLink, convertToWei(formData.price)],
      })

      setIsUploading(false)

      // Reset form and close modal after successful submission
      if (isConfirmed) {
        setFormData({
          agentName: "",
          description: "",
          imageLink: "",
          price: "",
          prompt: systemPrompt,
          toolType: selectedTools,
        })

        toast({
          title: "Agent Created",
          description: "Your AI agent has been successfully created and listed on the marketplace.",
        })

        onClose()
      }
    } catch (error) {
      console.error("Error creating agent:", error)
      setIsUploading(false)
      toast({
        title: "Creation Failed",
        description: "There was an error creating your agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>Please connect your wallet to create and sell AI agents.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Deploy AI Agent</DialogTitle>
          <DialogDescription>
            Fill out the form below to create and list your AI agent on the marketplace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                name="agentName"
                placeholder="Enter a name for your agent"
                value={formData.agentName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what your agent does"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageLink">Image Link</Label>
              <Input
                id="imageLink"
                name="imageLink"
                placeholder="Enter a URL for the agent's image"
                value={formData.imageLink}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price (ETH)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.001"
                min="0"
                placeholder="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="prompt">Agent Prompt</Label>
              <Textarea
                id="prompt"
                name="prompt"
                placeholder="Enter the prompt for your agent"
                value={formData.prompt}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>

            <div className="grid gap-2">
              <Label>Tool Type</Label>
              {/* <RadioGroup
                value={formData.toolType}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-1"
              > */}
                {selectedTools.map((tool) => (
                  <div key={tool} className="flex items-center space-x-2">
                    {/* <RadioGroupItem value={tool} id={tool} /> */}
                    <Label htmlFor={tool}>{tool}</Label>
                  </div>
                ))}
                {/* {selectedTools.length === 0 && (
                  <>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weatherTool" id="weatherTool" />
                      <Label htmlFor="weatherTool">Weather Tool</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shellTool" id="shellTool" />
                      <Label htmlFor="shellTool">Shell Tool</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emailTool" id="emailTool" />
                      <Label htmlFor="emailTool">Email Tool</Label>
                    </div>
                  </>
                )} */}
              {/* </RadioGroup> */}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading || isPending || isConfirming}>
              {isUploading ? "Uploading to IPFS..." : isPending || isConfirming ? "Creating Agent..." : "Create Agent"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
