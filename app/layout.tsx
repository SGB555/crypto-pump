import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import PrivyAuthProvider from "@/providers/privy-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Pump",
  description: "Create and trade meme coins",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <PrivyAuthProvider>{children}</PrivyAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'