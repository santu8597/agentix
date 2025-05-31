"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp,RocketIcon, Cloud, ImageIcon, RefreshCw,Mail,Globe ,Plane,Youtube,Search,Music,Wand2,Calendar, Heart, Hotel,DollarSign,Wallet,Users} from "lucide-react"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0",
});
// const { text } = await generateText({
// model: google("models/gemini-2.0-flash-exp"),
// prompt: "What is love?"
// })
interface SystemPromptEditorProps {
  systemPrompt: string
  onSystemPromptChange: (prompt: string) => void
  selectedTools: string[]
  onToolsChange: (tools: string[]) => void
  onApplyConfig: () => void,
  handleOpenDeployModal: () => void
}



export default function SystemPromptEditor({
  systemPrompt,
  onSystemPromptChange,
  selectedTools,
  onToolsChange,
  onApplyConfig,
  handleOpenDeployModal
}: SystemPromptEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const handleAiGenerate = async () => {
    setIsGenerating(true)
    const { text } = await generateText({
      model: google("models/gemini-2.0-flash"),
      prompt: `generate a system prompt for an AI that can use the following tools: ${selectedTools.join(", ")}. The system prompt should be and enchance the AI's ability to use the tools effectively. The system prompt should be in a rich format.Use the following system prompt as a base: ${systemPrompt}.**keep the system prompt medium and descriptive**
      remove the markdown formatting and return only the system prompt.
      ->use multiple tools if needed
      `,
    })
    setIsGenerating(false)
    onSystemPromptChange(text);
  }

  const availableTools = [
    { id: "getWeather", name: "Weather Tool", icon: <Cloud className="h-4 w-4 mr-2" /> },
    // { id: "executeShell", name: "Shell Tool", icon: <Terminal className="h-4 w-4 mr-2" /> },
    { id: "generateImage", name: "Image Generation Tool", icon: <ImageIcon className="h-4 w-4 mr-2" /> },
    // { id: "analyzeSrcStructureTool", name: "Folder-Structure Tool", icon: <Folder className="h-4 w-4 mr-2" /> },
    { id: "musicMood", name: "Music Mood Tool", icon: <Music className="h-4 w-4 mr-2" /> },
    { id: "sendEmail", name: "Send Email Tool", icon: <Mail className="h-4 w-4 mr-2" /> },
    { id: "readEmail", name: "Read Email Tool", icon: <Mail className="h-4 w-4 mr-2" /> },
    
    { id: "webSearch", name: "Browser Tool", icon: <Globe className="h-4 w-4 mr-2" /> },
    { id: "scrapeDocsTool", name: "Web Scraper Tool", icon: <Search className="h-4 w-4 mr-2" /> },
    { id: "fetchFlightDetails", name: "Flight Tool", icon: <Plane className="h-4 w-4 mr-2" /> },
    { id: "fetchYouTubeVideo", name: "YouTube Tool", icon: <Youtube className="h-4 w-4 mr-2" /> },
    { id: "googleCalendarManager", name: "Calender Tool", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { id: "fetchDoctors", name: "Finding Doctors Tool", icon: <Heart className="h-4 w-4 mr-2" /> },
    { id: "fetchHotelDetails", name: "Hotel Tool", icon: <Hotel className="h-4 w-4 mr-2" /> },
    { id: "nftTool", name: "NFT Tool", icon: <Wallet className="h-4 w-4 mr-2" /> },
    { id: "MoneySendTool", name: "Send Money Tool", icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { id: "distributePaymentTool", name: "Distribute Money Tool", icon: <Users className="h-4 w-4 mr-2" /> },
  ]

  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter((id) => id !== toolId))
    } else {
      onToolsChange([...selectedTools, toolId])
    }
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader
        className="pb-2 flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-md">AI Configuration</CardTitle>
        <Button variant="ghost" size="sm">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {isExpanded && (
        <BackgroundBeamsWithCollision>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex gap-2">
              <Button className="" disabled={isGenerating} onClick={handleAiGenerate}>{isGenerating?"Generating...":<>Generate <Wand2 className="h-4 w-4" /> </>}</Button>
              <Button onClick={handleOpenDeployModal} className="flex items-center" variant="outline">
              Deploy Agent
              <RocketIcon className="h-4 w-4" />
            </Button>
              </div>
              <Label htmlFor="system-prompt">System Prompt</Label>
              
              <Textarea
                id="system-prompt"
                placeholder="Enter system instructions for the AI..."
                className="mt-4 min-h-[205px] max-h-[205px] overflow-y-scroll"
                value={systemPrompt}
                onChange={(e) => onSystemPromptChange(e.target.value)}
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Available Tools</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableTools.map((tool) => (
                  <div key={tool.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={tool.id}
                      checked={selectedTools.includes(tool.id)}
                      onCheckedChange={() => handleToolToggle(tool.id)}
                    />
                    <Label htmlFor={tool.id} className="flex items-center cursor-pointer">
                      {tool.icon}
                      {tool.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={onApplyConfig} className="w-full" variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Apply Configuration
            </Button>
          </div>
        </CardContent>
        </BackgroundBeamsWithCollision>
      )}
    </Card>
  )
}
