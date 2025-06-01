"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Bot,
  BookOpen,
  Settings,
  Code,
  Shield,
  Zap,
  FileText,
  GitBranch,
  Users,
  History,
  ExternalLink,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: BookOpen,
  },
  {
    title: "Tools Reference",
    href: "/docs/tools",
    icon: Zap,
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    icon: Settings,
  },
  {
    title: "API Reference",
    href: "/docs/api",
    icon: Code,
  },
  {
    title: "Examples",
    href: "/docs/examples",
    icon: FileText,
  },
  {
    title: "Roadmap",
    href: "/docs/roadmap",
    icon: GitBranch,
  },
  {
    title: "Privacy Policy",
    href: "/docs/privacy",
    icon: Shield,
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-background border-r border-border">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Phoenix Docs</span>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">External Links</h4>
          <div className="space-y-1">
            <a
              href="https://github.com/yourusername/phoenix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
