"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { useMarkdownProcessor } from "@/hooks/use-text-processor"
import ToolInvocationCard from "./tool-invocation-card"
import { FileUp, Music, Video,DownloadIcon } from "lucide-react"
import VideoResultCard from "@/app/ai-components/youtube"
import FlightOptions from "@/app/ai-components/flight-details"
import {WeatherCard} from "@/app/ai-components/weather-card"
import GmailList from "@/app/ai-components/email-list"
import { CONTRACT_ADDRESS, CONTRACT_ABI,CONTRACT_ABI_2,CONTRACT_ADDRESS_2 } from "@/lib/contract2"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { DoctorProfileCard } from "@/app/ai-components/doctors-list"
import HotelPropertyCard from "@/app/ai-components/hotel-list"
import { useState,useEffect } from "react"
import { parseEther } from "viem"
interface MessageContentProps {
  message: any
  handlePdfClick: (url: string) => void
}

export default function MessageContent({ message, handlePdfClick }: MessageContentProps) {
   const [nftData, setNftData] = useState<null | {
  to: string,
  name: string,
  imageUrl: string
}>(null)

const [paymentData, setPaymentData] = useState<null | {
  to: string,
  amount: string
}>(null)


const [distributePaymentData, setDistributePaymentData] = useState<null | {
  amount: string,
  addresses: string[]
}>(null)
  const content = useMarkdownProcessor(message.content)
const { data: hash, writeContract } = useWriteContract()
  const { isLoading: txPending, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })



  useEffect(() => {
  const sendTransaction = async () => {
    if (!nftData) return
    try {
      const { to, name, imageUrl } = nftData
      const tx = await writeContract({
        address: CONTRACT_ADDRESS,
        abi:CONTRACT_ABI,
        functionName: "mintNFT",
        args: [to, name, imageUrl],
      })
      console.log("Transaction sent:", tx)
    } catch (error) {
      console.error("Transaction error:", error)
    }
  }

  sendTransaction()
}, []) 



useEffect(() => {
  const sendTransaction = async () => {
    if (!paymentData) return
    try {
      let { to, amount } = paymentData
      amount=amount.toString()
      const tx = await writeContract({
        address: CONTRACT_ADDRESS_2,
        abi:CONTRACT_ABI_2,
        functionName: "sendEther",
        args: [to],
        value: parseEther(amount),
      })
      console.log("Transaction sent:", tx)
    } catch (error) {
      console.error("Transaction error:", error)
    }
  }

  sendTransaction()
}, []) 




useEffect(() => {
  const sendTransaction = async () => {
    if (!distributePaymentData) return
    try {
      const { amount,addresses } = distributePaymentData
  
      const tx = await writeContract({
        address: CONTRACT_ADDRESS,
        abi:CONTRACT_ABI,
        functionName: "distributePayment",
        args: [addresses],
        value: parseEther(amount),
      })
      console.log("Transaction sent:", tx)
    } catch (error) {
      console.error("Transaction error:", error)
    }
  }

  sendTransaction()
}, []) 



  // Helper function to render message content based on parts
  const renderMessageContent = (message: any) => {
    // If message has parts array, use the new format
    if (message.parts && message.parts.length > 0) {
      return (
        <>
          {message.parts.map((part: any, index: number) => {
            switch (part.type) {
              case "text":
                return (
                  <ReactMarkdown key={`text-${index}`} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {part.text}
                  </ReactMarkdown>
                )
              case "reasoning":
                return (
                  <div key={`reasoning-${index}`} className="bg-muted/30 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1 text-muted-foreground">Reasoning:</div>
                    {part.reasoning}
                  </div>
                )
              case "source":
                return (
                  <div key={`source-${index}`} className="bg-primary/10 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1 text-primary">Source:</div>
                    <a
                      href={part.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {part.source.title || part.source.url}
                    </a>
                  </div>
                )
              case "tool-invocation":
                const toolInvocation = {
                  toolName: part.toolInvocation.toolName,
                  args: part.toolInvocation.args,
                  result: part.toolInvocation.state === "result" ? part.toolInvocation.result : null,
                  state: part.toolInvocation.state,
                }
                if (toolInvocation.state === "result" && toolInvocation.toolName === "generateImage") {
                  return (
                    <div key={`tool-${index}`} className="relative my-2 w-fit">
                        <Image 
                          src={`${toolInvocation?.result?.imageUrl}`}
                          width={300}
                          height={300}
                          alt={`Generated image ${index}`}
                          className="object-contain max-h-[350px] w-auto rounded-md"
                          />
                        <a 
                          href={`${toolInvocation?.result?.imageUrl}`} 
                          download 
                          className="absolute top-2 right-2 bg-white/70 hover:bg-white p-1 rounded-full"
                        >
                          <DownloadIcon className="w-5 h-5 text-black" />
                        </a>
                      </div>
                   )}
                   if(toolInvocation.state=='result'&& toolInvocation.toolName=="fetchYouTubeVideo")
                    {
                const videoData=toolInvocation.result
                return(<VideoResultCard result={videoData} />)
              
                    }


                    if(toolInvocation.state=='result'&& toolInvocation.toolName=="fetchFlightDetails")
                    {
                const flightData=toolInvocation.result
                return(<FlightOptions data={flightData} />)
              
                    }
                    if(toolInvocation.state=='result'&& toolInvocation.toolName=="getWeather")
                    {
                const weatherData=toolInvocation.result
                return(<WeatherCard data={weatherData} />)
              
                    }
                    if(toolInvocation.state=='result'&& toolInvocation.toolName=="readEmail")
                    {
                const emailList=toolInvocation.result.emails
                return(<GmailList emails={emailList} />)
              
                    }
                if (toolInvocation.state=='result'&& toolInvocation.toolName=="fetchDoctors")
                {
                  const doctorApiResponse=toolInvocation.result
                  console.log(doctorApiResponse)
                  return( <><div className="flex flex-col gap-6">{doctorApiResponse?.results?.length > 0 ? (
    doctorApiResponse.results.map((doctor, index) => (
      <DoctorProfileCard key={doctor.place_id || index} doctor={doctor} />
    ))
  ) : (
    <p className="text-center text-muted-foreground">No doctors found.</p>
  )}
  </div>
  </>
                  )              
                }
                if (
  toolInvocation.state === "result" &&
  toolInvocation.toolName === "fetchHotelDetails"
) {
  const hotelApiResponse = toolInvocation.result
  console.log(hotelApiResponse)

  return (
    <>
      <div className="flex flex-col gap-6">
        {
          
          hotelApiResponse.properties.map((hotel, index: number) => (
            <HotelPropertyCard key={index} property={hotel} />
          )
        ) }
      </div>
    </>
  )
}

    if (toolInvocation.state === "result" && toolInvocation.toolName === "nftTool") {
                    const { to, name, imageUrl } = toolInvocation.result.data
                    if (!txPending && !txSuccess && !nftData) {
                        setNftData({ to, name, imageUrl })
                     }
                  return (<>
                          <div className="font-semibold text-xs mb-1">Tool: {part.toolInvocation.toolName}</div>
                         {txPending && <p className="text-xs text-muted-foreground">Transaction is pending...</p>}
                          {txSuccess && <p className="text-xs text-green-500">Transaction successful!</p>}
                        </>
                      )}
if (toolInvocation.state === "result" && toolInvocation.toolName === "MoneySendTool") {
                    const { to, amount } = toolInvocation.result.data
                    if (!txPending && !txSuccess && !paymentData) {
                        setPaymentData({ to, amount })
                     }
                  return (<>
                          <div className="font-semibold text-xs mb-1">Tool: {part.toolInvocation.toolName}</div>
                         {txPending && <p className="text-xs text-muted-foreground">Transaction is pending...</p>}
                          {txSuccess && <p className="text-xs text-green-500">Transaction successful!</p>}
                        </>
                      )}


if (toolInvocation.state === "result" && toolInvocation.toolName === "distributePaymentTool") {
                    const { addresses, amount } = toolInvocation.result.data
                    if (!txPending && !txSuccess && !distributePaymentData) {
                        setDistributePaymentData({ addresses, amount })
                     }
                  return (<>
                          <div className="font-semibold text-xs mb-1">Tool: {part.toolInvocation.toolName}</div>
                         {txPending && <p className="text-xs text-muted-foreground">Transaction is pending...</p>}
                          {txSuccess && <p className="text-xs text-green-500">Transaction successful!</p>}
                        </>
                      )}




                return (
                  <div key={`tool-${index}`} className="bg-secondary/20 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1">Tool: {part.toolInvocation.toolName}</div>
                    <pre className="text-xs overflow-auto p-1 bg-black/5 rounded">
                      <ToolInvocationCard toolInvocation={toolInvocation} />
                    </pre>
                  </div>
                )
              
              case "file":
                return (
                  <div key={`file-${index}`} className="my-2">
                    {part.mimeType.startsWith("image/") && (
                      <Image
                        src={`data:${part.mimeType};base64,${part.data}`}
                        width={300}
                        height={300}
                        alt={`Generated image ${index}`}
                        className="object-contain max-h-[400px] w-auto rounded-md"
                      />
                    )}
                  </div>
                )
              default:
                return null
            }
          })}
        </>
      )
    } else {
      // Fallback to the old format for backward compatibility
      return <ReactMarkdown>{content}</ReactMarkdown>
    }
  }

  return (
    <>
      <div className="whitespace-pre-wrap break-words relative">{renderMessageContent(message)}</div>
      {(message.experimental_attachments || []).filter(
        (attachment: any) =>
          attachment?.contentType?.startsWith("image/") ||
          attachment?.contentType?.startsWith("application/pdf") ||
          attachment?.contentType?.startsWith("audio/") ||
          attachment?.contentType?.startsWith("video/"),
      ).length > 0 && (
        <div className="mt-3 space-y-2">
          {/* Image attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("image/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`${message.id}-img-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <Image
                  src={attachment.url || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={attachment.name ?? `attachment-${index}`}
                  className="object-contain max-h-[300px] w-auto rounded-md"
                />
              </motion.div>
            ))}

          {/* PDF attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("application/pdf"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`pdf-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handlePdfClick(attachment.url)}
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-sm">{attachment.name || `Document-${index}.pdf`}</p>
                    <p className="text-xs text-muted-foreground">Click to view PDF</p>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Audio attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("audio/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`audio-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium text-sm">{attachment.name || `Audio-${index}.mp3`}</p>
                    </div>
                  </div>
                  <audio controls src={attachment.url} className="w-full max-w-md" preload="metadata">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </motion.div>
            ))}

          {/* Video attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("video/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`video-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium text-sm">{attachment.name || `Video-${index}.mp4`}</p>
                    </div>
                  </div>
                  <video controls src={attachment.url} className="w-full max-w-md rounded-md" preload="metadata">
                    Your browser does not support the video element.
                  </video>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </>
  )
}
