import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navbar } from "@/components/navbar"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Movie Search App - Fullstack Assignment",
  description: "A beautiful movie search application built with Next.js, Redux Toolkit, and OMDB API",
  keywords: ["movies", "search", "OMDB", "Next.js", "React"],
  authors: [{ name: "Fullstack Intern" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
