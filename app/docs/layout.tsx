import type React from "react"
import Navbar from "@/components/navbar"
import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <aside className="hidden md:block">
          <DocsSidebar />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
