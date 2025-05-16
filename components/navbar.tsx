"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/frontend/theme-toggle"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import PhoenixLogo from "@/components/frontend/phoenix-logo"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Tools", href: "#tools" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "AI-customise", href: "/ai-test" },
    { label: "AI-chat", href: "/chat" },
    { label: "MarketPlace", href: "/buy" },
    { label: "My-agents", href: "/my-agents" },
  ]
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2" aria-label="Phoenix AI Homepage">
            <PhoenixLogo width={50} height={50} className="text-black dark:text-white" />
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

          <TooltipProvider>
            {/* Google Sign In Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  {status === "authenticated" ? (
                    <button
                      onClick={() => signOut()}
                      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image || "/placeholder.svg"}
                          alt="User profile"
                          className="w-10 h-10 rounded-full"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <GoogleIcon />
                      )}
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                    </button>
                  ) : (
                    <button
                      onClick={() => signIn("google")}
                      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <GoogleIcon />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></span>
                    </button>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {status === "authenticated"
                  ? `Signed in as ${session?.user?.name || session?.user?.email}`
                  : "Sign in with Google"}
              </TooltipContent>
            </Tooltip>

            {/* Metamask Wallet Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <button
                    onClick={() => (isConnected ? disconnect() : connect({ connector: injected() }))}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <MetamaskIcon />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E17726] rounded-full border-2 border-background"></span>
                    <span
                      className={`absolute -top-1 -right-1 w-3 h-3 ${isConnected ? "bg-green-500" : "bg-red-500"} rounded-full border-2 border-background`}
                    ></span>
                  </button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {isConnected ? `Connected: ${truncateAddress(address!)}` : "Connect Metamask Wallet"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

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

                  <div className="flex items-center gap-3">
                    {/* Mobile Google Sign In */}
                    <div className="relative">
                      {status === "authenticated" ? (
                        <button
                          onClick={() => signOut()}
                          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image || "/placeholder.svg"}
                              alt="User profile"
                              className="w-10 h-10 rounded-full"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <GoogleIcon />
                          )}
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                        </button>
                      ) : (
                        <button
                          onClick={() => signIn("google")}
                          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <GoogleIcon />
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></span>
                        </button>
                      )}
                    </div>

                    {/* Mobile Metamask Wallet */}
                    <div className="relative">
                      <button
                        onClick={() => (isConnected ? disconnect() : connect({ connector: injected() }))}
                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <MetamaskIcon />
                        <span
                          className={`absolute -top-1 -right-1 w-3 h-3 ${isConnected ? "bg-green-500" : "bg-red-500"} rounded-full border-2 border-background`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
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
  )
}

function MetamaskIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.9582 1L19.8241 10.7183L22.2665 5.09986L32.9582 1Z"
        fill="#E17726"
        stroke="#E17726"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.04187 1L15.0446 10.809L12.7336 5.09986L2.04187 1Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2292 23.5334L24.7346 28.872L32.2172 30.9324L34.3356 23.6501L28.2292 23.5334Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.686768 23.6501L2.78302 30.9324L10.2656 28.872L6.77104 23.5334L0.686768 23.6501Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.86294 14.5149L7.8186 17.6507L15.2079 17.9673L14.9765 9.98291L9.86294 14.5149Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.1372 14.5149L19.9303 9.89117L19.8242 17.9673L27.1815 17.6507L25.1372 14.5149Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2656 28.872L14.7602 26.7032L10.9029 23.7147L10.2656 28.872Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2397 26.7032L24.7344 28.872L24.0971 23.7147L20.2397 26.7032Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.7344 28.8722L20.2397 26.7034L20.6024 29.6036L20.5601 30.8408L24.7344 28.8722Z"
        fill="#D5BFB2"
        stroke="#D5BFB2"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2656 28.8722L14.4399 30.8408L14.4187 29.6036L14.7602 26.7034L10.2656 28.8722Z"
        fill="#D5BFB2"
        stroke="#D5BFB2"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5076 21.7851L10.8135 20.6946L13.3619 19.4574L14.5076 21.7851Z"
        fill="#233447"
        stroke="#233447"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4922 21.7851L21.638 19.4574L24.1863 20.6946L20.4922 21.7851Z"
        fill="#233447"
        stroke="#233447"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2656 28.872L10.9241 23.5334L6.77094 23.6501L10.2656 28.872Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.0759 23.5334L24.7344 28.872L28.2291 23.6501L24.0759 23.5334Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.1815 17.6506L19.8242 17.9672L20.4928 21.7851L21.6385 19.4574L24.1869 20.6946L27.1815 17.6506Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8135 20.6946L13.3619 19.4574L14.5076 21.7851L15.2079 17.9672L7.8186 17.6506L10.8135 20.6946Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.81848 17.6506L10.9028 23.7147L10.8134 20.6946L7.81848 17.6506Z"
        fill="#E27525"
        stroke="#E27525"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.1868 20.6946L24.0974 23.7147L27.1817 17.6506L24.1868 20.6946Z"
        fill="#E27525"
        stroke="#E27525"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2079 17.9673L14.5076 21.7852L15.3867 26.2989L15.5139 20.3779L15.2079 17.9673Z"
        fill="#E27525"
        stroke="#E27525"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8242 17.9673L19.5393 20.3596L19.6453 26.2989L20.5244 21.7852L19.8242 17.9673Z"
        fill="#E27525"
        stroke="#E27525"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5244 21.7851L19.6453 26.2988L20.2398 26.7032L24.0972 23.7147L24.1866 20.6946L20.5244 21.7851Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8135 20.6946L10.9029 23.7147L14.7603 26.7032L15.3548 26.2988L14.5076 21.7851L10.8135 20.6946Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5599 30.8407L20.6022 29.6035L20.2607 29.3053H14.7392L14.4188 29.6035L14.4399 30.8407L10.2656 28.8721L11.6747 30.0159L14.6925 32.0762H20.2819L23.3209 30.0159L24.7344 28.8721L20.5599 30.8407Z"
        fill="#C0AC9D"
        stroke="#C0AC9D"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2397 26.7033L19.6452 26.2988H15.3547L14.7602 26.7033L14.4187 29.6035L14.7391 29.3053H20.2606L20.6021 29.6035L20.2397 26.7033Z"
        fill="#161616"
        stroke="#161616"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5168 11.3532L34.6625 6.01992L32.9582 1L20.2397 10.4018L25.1372 14.5149L32.0368 16.5569L33.5805 14.7716L32.9009 14.2805L33.9831 13.2983L33.1571 12.6722L34.2393 11.8445L33.5168 11.3532Z"
        fill="#763E1A"
        stroke="#763E1A"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.337646 6.01992L1.48339 11.3532L0.739807 11.8445L1.84309 12.6722L1.01709 13.2983L2.09929 14.2805L1.41963 14.7716L2.96339 16.5569L9.86299 14.5149L14.7605 10.4018L2.04199 1L0.337646 6.01992Z"
        fill="#763E1A"
        stroke="#763E1A"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.0368 16.5569L25.1372 14.5149L27.1815 17.6507L24.0972 23.7148L28.2292 23.6502H34.3356L32.0368 16.5569Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.86301 14.5149L2.96341 16.5569L0.686768 23.6502H6.77104L10.903 23.7148L7.81866 17.6507L9.86301 14.5149Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8242 17.9673L20.2398 10.4018L22.2664 5.09985H12.7336L14.7602 10.4018L15.2079 17.9673L15.3547 20.3962L15.3759 26.2989H19.6664L19.6876 20.3962L19.8242 17.9673Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
