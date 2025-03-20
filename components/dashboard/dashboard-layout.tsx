import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}

