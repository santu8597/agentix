"use client"

import { useChat } from "@ai-sdk/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Loader2, Youtube, Stethoscope, Hotel, Plane, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ChatInput from "./chat-input"
import ChatMessages from "./chat-messages"
import FilePreviewArea from "./file-preview-area"
import PdfViewer from "./pdf-viewer"
import Navbar from "@/components/navbar"

// Background animation component with glowing effects
const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Gradient Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/10 via-transparent to-cyan-900/10" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Floating Objects with Glow */}
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`youtube-glow-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              window.innerHeight + 100,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.6,
              -100,
            ],
            rotate: [0, 180, 360, 540],
            scale: [0.5, 1, 0.8, 0.3],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            delay: i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl scale-150" />
            <Youtube size={50 + i * 4} className="relative text-red-500/40 drop-shadow-lg" />
          </div>
        </motion.div>
      ))}

      {Array.from({ length: 1 }).map((_, i) => (
        <motion.div
          key={`stethoscope-glow-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              window.innerHeight + 100,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.6,
              -100,
            ],
            rotate: [0, 180, 360, 540],
            scale: [0.5, 1, 0.8, 0.3],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 18 + i * 2,
            delay: i * 3 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl scale-150" />
            <Stethoscope size={50 + i * 3} className="relative text-green-500/40 drop-shadow-lg" />
          </div>
        </motion.div>
      ))}

      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`hotel-glow-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              window.innerHeight + 100,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.6,
              -100,
            ],
            rotate: [0, 180, 360, 540],
            scale: [0.5, 1, 0.8, 0.3],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            delay: i * 4 + 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl scale-150" />
            <Hotel size={50 + i * 5} className="relative text-blue-500/40 drop-shadow-lg" />
          </div>
        </motion.div>
      ))}

      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`plane-glow-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              window.innerHeight + 100,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.6,
              -100,
            ],
            rotate: [0, 180, 360, 540],
            scale: [0.5, 1, 0.8, 0.3],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 16 + i * 3,
            delay: i * 2.5 + 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl scale-150" />
            <Plane size={55 + i * 2} className="relative text-purple-500/40 drop-shadow-lg" />
          </div>
        </motion.div>
      ))}

      {/* Enhanced Sparkle Particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-sm scale-200" />
            <Sparkles size={5 + Math.random() * 8} className="relative text-yellow-400/80 drop-shadow-lg" />
          </div>
        </motion.div>
      ))}

      {/* Floating Light Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0.5, 0],
            opacity: [0, 0.8, 0.4, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: i * 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)",
          }}
        />
      ))}
    </div>
  )
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/chat",
    // body: {
    //   ai_agent: selectedAgent
    // }
  })
  const [files, setFiles] = useState<FileList | undefined>(undefined)

  const [previews, setPreviews] = useState<string[]>([])
  const [pdfPreviews, setPdfPreviews] = useState<{ name: string; size: number; url: string; type?: string }[]>([])
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate image previews when files are selected
  useEffect(() => {
    if (!files) {
      setPreviews([])
      setPdfPreviews([])
      return
    }

    const newPreviews: string[] = []
    const newPdfPreviews: { name: string; size: number; url: string; type?: string }[] = []
    setIsUploading(true)

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith("application/pdf")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            const url = URL.createObjectURL(file)
            newPdfPreviews.push({ name: file.name, size: file.size, url })
            setPdfPreviews(newPdfPreviews)
          }
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        // Create object URL for audio and video files
        const url = URL.createObjectURL(file)
        // Store in the same array as PDFs for simplicity
        newPdfPreviews.push({
          name: file.name,
          size: file.size,
          url,
          type: file.type.startsWith("audio/") ? "audio" : "video",
        })
        setPdfPreviews(newPdfPreviews)
      }
    })
    setIsUploading(false)
  }, [files])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
    }
  }

  const clearFiles = () => {
    setFiles(undefined)
    setPreviews([])
    setPdfPreviews([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!input && (!files || files.length === 0)) return

    handleSubmit(event, {
      experimental_attachments: files,
    })

    clearFiles()
  }

  const handlePdfClick = (url: string) => {
    setActivePdf(url === activePdf ? null : url)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => formRef.current?.requestSubmit(), 100)
  }

  return (
    <div className="relative flex flex-col w-full mx-auto h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2 border-b bg-background/60 backdrop-blur-md border-white/10">
          <Navbar />
        </div>

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          scrollAreaRef={scrollAreaRef}
          handlePdfClick={handlePdfClick}
          handleSuggestedPrompt={handleSuggestedPrompt}
          formRef={formRef}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />

        <AnimatePresence>
          {(previews.length > 0 || pdfPreviews.length > 0) && (
            <FilePreviewArea
              previews={previews}
              pdfPreviews={pdfPreviews}
              clearFiles={clearFiles}
              setPdfPreviews={setPdfPreviews}
            />
          )}
        </AnimatePresence>

        {isUploading && previews.length === 0 && pdfPreviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 py-2 px-4 bg-background/80 backdrop-blur-sm"
          >
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">Processing files...</span>
          </motion.div>
        )}

        <div className="bg-background/60 backdrop-blur-md border-t border-white/10">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            files={files}
            formRef={formRef}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />
        </div>

        {activePdf && <PdfViewer activePdf={activePdf} setActivePdf={setActivePdf} />}
      </div>
    </div>
  )
}
