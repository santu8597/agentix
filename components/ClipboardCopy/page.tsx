// components/ClipboardCopy.tsx
"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ClipboardCopyProps {
  text: string
  className?: string
}

export function ClipboardCopy({ text, className = "" }: ClipboardCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors ${className}`}
      title="Copy to clipboard"
      type="button"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      )}
    </button>
  )
}
