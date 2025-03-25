import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { constructMetadata } from "@/lib/seo-config"
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/json-ld"
import { ThemeProvider } from "@/provider/theme-provider"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SessionProvider } from "@/provider/session-provider"
import { getServerSession } from "next-auth"
import { Toaster } from "@/components/ui/toaster"
import { authOptions } from "./api/auth/auth/[...nextauth]/route"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = constructMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`min-h-screen bg-black font-sans antialiased ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider session={session}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </SessionProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}

