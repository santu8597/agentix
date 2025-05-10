"use client"

import { useChat } from "@ai-sdk/react"
import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, User, Search, Cloud, Loader2,Code,Mail } from "lucide-react"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    maxSteps: 3,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      

      <main className="flex-1 container mx-auto p-4 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-4 pb-20">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <Bot className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">Your AI Assistant</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Ask me anything! I can search the web and check the weather for you.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                className={`${message.role === "user" ? "bg-white dark:bg-gray-800" : "bg-purple-50 dark:bg-gray-900"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <Bot className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="font-medium">{message.role === "user" ? "You" : "AI Assistant"}</div>

                      {/* Display message content */}
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index} className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {part.text}
                            </div>
                          )
                        }

                        // Display tool calls
                        if (part.type === "tool-invocation") {
                          return (
                            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 my-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                {part.toolInvocation.toolName === "weather" && ( <> <Cloud className="h-4 w-4" /> Weather Tool </> )}
                                {part.toolInvocation.toolName === "webSearch" && ( <> <Search className="h-4 w-4" /> Web Tool </> )}
                                {part.toolInvocation.toolName === "shell" && ( <> <Code className="h-4 w-4" /> Shell Tool </> )}
                                {part.toolInvocation.toolName === "email" && ( <> <Mail className="h-4 w-4" /> Mail Tool </> )}
                                {part.toolInvocation.toolName === "flight" && ( <> <Mail className="h-4 w-4" /> Flight Tool </> )}
                                {part.toolInvocation.state === "result" && part.toolInvocation.toolName === "image" && ( <> <img className="h-96 w-96" src={`${part.toolInvocation.result.imageUrl}`} /> </> )}
                              </div>

                              <pre className="text-xs overflow-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
                                {JSON.stringify(part.toolInvocation.args, null, 2)}
                              </pre>
                            </div>
                          )
                        }

                        

                        
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-white dark:bg-gray-950 p-4">
        <form onSubmit={handleSubmit} className="container mx-auto max-w-3xl flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}
