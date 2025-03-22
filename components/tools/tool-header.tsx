"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, Share2, Star } from "lucide-react"

type ToolHeaderProps = {
  tool: any
  overallScore: number
}

export function ToolHeader({ tool, overallScore }: ToolHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} - ToolsHub`,
        text: `Check out ${tool.name} on ToolsHub`,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10">
          <Image
            src={tool.image || "/placeholder.svg"}
            alt={`Logo of ${tool.name}`}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{tool.category}</Badge>
            <div className="flex items-center">
              <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
              <Star className="ml-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
            </div>
            {tool.price.hasFree && <Badge className="bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>}
          </div>

          <h1 className="mb-2 text-3xl font-bold text-white">{tool.name}</h1>
          <p className="mb-4 text-white/70">{tool.description}</p>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:text-white hover:bg-white/10"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-purple-500 text-purple-500" : ""}`} />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:text-white hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <div className="text-3xl font-bold text-white">{overallScore}%</div>
          <div className="text-sm text-white/70">Overall Score</div>
          <div className="mt-2 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < Math.floor(tool.rating) ? "#EAB308" : "none"}
                color={i < Math.floor(tool.rating) ? "#EAB308" : "#6b7280"}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-white/50">{tool.rating} out of 5</div>
        </div>
      </div>
    </div>
  )
}

