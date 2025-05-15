"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Zap,LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/frontend/theme-toggle"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import PhoenixLogo from "@/components/frontend/phoenix-logo"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
   const { data: session, status } = useSession()
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Tools", href: "#tools" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "AI-customise", href: "/ai-test" },
    { label: "AI-chat", href: "/chat" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2" aria-label="Phoenix AI Homepage">
          <PhoenixLogo width={50} height={50} className="text-black dark:text-white"/>
            <span className="text-2xl font-bold">Phoenix AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* <Button
            asChild
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 h-auto dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_10px_rgba(36,101,237,0.4)]"
          >
            <Link href="#contact">
              <Zap className="h-4 w-4 text-white" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Request Demo</span>
                <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">v1.0.0</span>
              </div>
            </Link>
          </Button> */}
{status === "authenticated" && (
                              <div className="flex items-center gap-4">
                                {/* <div className="text-sm text-gray-600 dark:text-gray-300">{session.user?.email}</div> */}
                                <Image src={`${session.user?.image}`} alt="" className="w-10 h-10 rounded-full" width={60} height={60}/>
                                <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center gap-2">
                                  <LogOut className="h-4 w-4" />
                                  Sign out
                                </Button>
                              </div>
                            )}
                  
                            {status === "unauthenticated" && (
                            
                              <Button
                                onClick={() => signIn("google")}
                                className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-6 py-5 rounded-md shadow-sm"
                              >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                  <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                  />
                                  <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                  />
                                  <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                  />
                                  <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                  />
                                  <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                                Sign in with Google
                              </Button>
                            
                          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 mt-4">
                  <ThemeToggle />
                  
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
