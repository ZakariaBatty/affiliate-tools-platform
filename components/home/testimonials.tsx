"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "GrowthTech",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "ToolsHub has transformed how we discover and implement new marketing tools. We've increased our productivity by 40% since finding the right stack through this platform.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateSoft",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As a tech company, we're always looking for the best tools to improve our workflow. This platform made it easy to compare options and find exactly what we needed.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "DigitalNomad",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Running a remote team requires the right tools. Thanks to ToolsHub, we found everything we needed in one place and our team collaboration has never been better.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Product Manager",
    company: "TechSolutions",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The comparison features saved us countless hours of research. We were able to make informed decisions quickly and implement the right tools for our team.",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    role: "CEO",
    company: "StartupInnovate",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As a startup founder, I needed to make smart choices with our limited budget. This platform helped us find the perfect tools that scaled with our business growth.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
    setScrollLeft(sliderRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth
      const scrollPosition = sliderRef.current.scrollLeft
      const newIndex = Math.round(scrollPosition / cardWidth)
      setCurrent(Math.min(Math.max(newIndex, 0), testimonials.length - 1))
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black/95 to-black py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Hear from businesses that have found success using our platform
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-0 top-1/2 z-20 -translate-y-1/2 transform">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label="Previous testimonial"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 transform">
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label="Next testimonial"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            ref={sliderRef}
            className="hide-scrollbar relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`min-w-full snap-center px-4 transition-opacity duration-300 ${
                  current === index ? "opacity-100" : "opacity-0 pointer-events-none absolute"
                }`}
              >
                <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
                    <div className="mb-6 flex-shrink-0 md:mb-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-purple-500 md:h-32 md:w-32">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                        <Quote className="h-5 w-5 text-white" />
                      </div>
                      <p className="mb-6 text-lg leading-relaxed text-white/90 md:text-xl">"{testimonial.content}"</p>
                      <div>
                        <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                        <p className="text-white/70">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 10000)
                }}
                className={`h-2 w-10 rounded-full transition-all duration-300 ${
                  current === index ? "bg-gradient-to-r from-purple-600 to-blue-500 w-12" : "bg-white/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

