import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { constructMetadata } from "@/lib/seo-config"
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`min-h-screen bg-black font-sans antialiased ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

