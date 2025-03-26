import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/auth/session-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Tools Affiliate Platform",
  description: "Discover, compare, and find the best AI tools for your needs",
}

import { ReactNode } from "react"

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SessionProvider session={session}>
              <div className="flex flex-col min-h-screen">
                <main className="flex-1">{children}</main>
              </div>
              <Toaster />
            </SessionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

