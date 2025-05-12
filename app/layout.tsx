import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/providers/providers'
import Navbar from '@/components/navbar'
export const metadata: Metadata = {
  title: 'Phoenix',
  description: 'AI Builder',
  generator: 'Next.js',
  
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>

        <link rel="icon" href="/favicon.ico" />
        
      </head>
      <body>
        <Providers>
          {/* <Navbar/> */}
          {children}
        </Providers>
        
      </body>
    </html>
  )
}
