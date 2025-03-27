import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smol Travel",
  description: "Admin dashboard for travel website management",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <Head>
        {/* Nếu dùng favicon.ico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
       
      </body>
    </html>
  )
}



import './globals.css'