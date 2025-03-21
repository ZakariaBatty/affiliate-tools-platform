"use client"

import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export function ToolNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-white">Tool Not Found</h1>
        <p className="mb-8 text-white/70">The tool you're looking for doesn't exist or has been removed.</p>
        <Button
          onClick={() => router.push("/tools")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
        >
          Browse All Tools
        </Button>
      </div>
      <Footer />
    </div>
  )
}

