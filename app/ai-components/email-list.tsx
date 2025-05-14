"use client"

import type React from "react"
import { useState } from "react"
import { Paperclip, Star, StarOff, ChevronDown, ChevronUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import DOMPurify from "dompurify"

interface Email {
  subject: string
  from: string
  snippet: string
  text?: string
  html?: string
  date?: string
  hasAttachment?: boolean
  isStarred?: boolean
}

interface GmailListProps {
  emails: Email[]
}

export default function GmailList({ emails }: GmailListProps) {
  const [openEmail, setOpenEmail] = useState<number | null>(null)
  const [starredEmails, setStarredEmails] = useState<number[]>([])

  const toggleEmailOpen = (index: number) => {
    setOpenEmail(openEmail === index ? null : index)
  }

  const toggleStarred = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setStarredEmails((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const extractName = (emailAddress: string) => {
    const match = emailAddress.match(/^"?([^"<]+)"?\s*<.*>$/)
    if (match) return match[1].trim()
    return emailAddress.split("@")[0].replace(/[.+]/g, " ")
  }

  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {emails.map((email, index) => {
          const isOpen = openEmail === index
          const isStarred = starredEmails.includes(index)
          const senderName = extractName(email.from)

          const emailDate = email.date || new Date(Date.now() - Math.random() * 604800000).toISOString()
          const timeAgo = formatDistanceToNow(new Date(emailDate), { addSuffix: true })

          return (
            <li
              key={index}
              className={`
                ${isOpen ? "bg-blue-50 dark:bg-gray-700/50" : "hover:bg-gray-50 dark:hover:bg-gray-700/30"}
                transition-colors duration-150
              `}
            >
              {/* Email Header */}
              <div
                className="p-4 cursor-pointer flex items-start"
                onClick={() => toggleEmailOpen(index)}
              >
                <div className="flex items-center mr-3">
                  <button
                    onClick={(e) => toggleStarred(index, e)}
                    className="text-gray-400 hover:text-yellow-400 focus:outline-none"
                  >
                    {isStarred ? (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <StarOff className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-semibold truncate ${isOpen ? "text-blue-600 dark:text-blue-400" : ""}`}>
                      {senderName}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{timeAgo}</span>
                  </div>

                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                    {email.subject || "(No subject)"}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{email.snippet}</p>
                </div>

                <div className="ml-4 flex items-center">
                  {email.hasAttachment && <Paperclip className="h-4 w-4 text-gray-400 mr-2" />}
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Email Body */}
              {isOpen && (
                <div className="px-12 pb-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-semibold">{email.from}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">to me</span>
                      </div>
                      <Badge variant="outline" className="text-xs">Inbox</Badge>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(emailDate).toLocaleString()}
                    </div>
                  </div>

                  {/* Email Content */}
                  {email.html ? (
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-gray-800 dark:text-gray-200
                        [&_*]:max-w-full [&_*]:text-inherit [&_*]:m-0 [&_*]:p-0 [&_*]:text-left [&_*]:float-none"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(email.html) }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                      {linkifyText(email.text || email.snippet)}
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </ScrollArea>
  )
}
