'use client'

// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
// import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react";
// import {config} from '@/lib/wagmi-config'


const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
   
      <QueryClientProvider client={queryClient}>
       
          {children}
       
      </QueryClientProvider>
    
    </SessionProvider>
  )
}