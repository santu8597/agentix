'use client'

// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
// import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react";
// import {config} from '@/lib/wagmi-config'
import { ThemeProvider } from "@/components/theme-provider"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
   <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
       {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange> */}
          {children}
       {/* </ThemeProvider> */}
      </QueryClientProvider>
    </ThemeProvider>
    </SessionProvider>
  )
}