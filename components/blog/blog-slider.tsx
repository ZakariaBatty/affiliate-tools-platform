"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BlogCard from "@/components/blog/blog-card"
import { BlogPost } from "@/types/types"

interface BlogSliderProps {
  title: string
  posts: BlogPost[]
}

export default function BlogSlider({ title, posts }: BlogSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener("scroll", checkScrollButtons)
      // Check on mount
      checkScrollButtons()

      // Check on window resize
      window.addEventListener("resize", checkScrollButtons)

      return () => {
        slider.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full border-white/10 hover:text-white ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
              }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`rounded-full border-white/10 hover:text-white ${!canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
              }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} variant="slider" />
        ))}
      </div>
    </div>
  )
}

