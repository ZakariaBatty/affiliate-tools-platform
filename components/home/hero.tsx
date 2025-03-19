"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-black py-20 md:py-32"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 60, 255, 0.15), transparent 80%)`,
      }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Discover the Best Tools for Your Business
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
            Find, compare, and integrate the perfect tools to grow your business. Our platform connects you with the
            best software solutions across all categories.
          </p>

          <div className="mx-auto mb-10 flex max-w-md flex-col items-center gap-4 sm:flex-row">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                type="text"
                placeholder="Search for tools..."
                className="w-full border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span>Popular:</span>
            <Button variant="link" className="h-auto p-0 text-white/70 hover:text-white">
              AI Tools
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-white/70 hover:text-white">
              Marketing
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-white/70 hover:text-white">
              Analytics
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-white/70 hover:text-white">
              Productivity
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

