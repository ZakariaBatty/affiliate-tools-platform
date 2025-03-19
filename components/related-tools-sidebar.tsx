"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Plus, Check } from "lucide-react"
import { allTools } from "@/data/tools"

interface RelatedToolsSidebarProps {
  currentToolId: number
  category: string
}

export function RelatedToolsSidebar({ currentToolId, category }: RelatedToolsSidebarProps) {
  const [relatedTools, setRelatedTools] = useState<any[]>([])
  const [selectedTools, setSelectedTools] = useState<number[]>([])
  const [popularCategories, setPopularCategories] = useState<string[]>([])

  useEffect(() => {
    // Get related tools from the same category
    const related = allTools.filter((tool) => tool.category === category && tool.id !== currentToolId).slice(0, 5)

    setRelatedTools(related)

    // Get popular categories (excluding current category)
    const categories = Array.from(new Set(allTools.map((tool) => tool.category)))
      .filter((cat) => cat !== category)
      .slice(0, 5)

    setPopularCategories(categories)
  }, [currentToolId, category])

  // Toggle tool selection for comparison
  const toggleToolSelection = (toolId: number) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((id) => id !== toolId))
    } else {
      if (selectedTools.length < 3) {
        setSelectedTools([...selectedTools, toolId])
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Related Tools */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <h2 className="mb-4 text-lg font-bold text-white">Related {category} Tools</h2>

          <div className="space-y-4">
            {relatedTools.map((tool) => (
              <div key={tool.id} className="flex gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={tool.image || "/placeholder.svg"}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate text-sm font-medium text-white">{tool.name}</h3>
                    <div className="flex items-center">
                      <span className="mr-1 text-xs text-white">{tool.rating}</span>
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    </div>
                  </div>

                  <p className="truncate text-xs text-white/70">{tool.description}</p>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-white/50">${tool.price.monthly}/mo</span>
                    <button
                      onClick={() => toggleToolSelection(tool.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${selectedTools.includes(tool.id)
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        }`}
                      aria-label={selectedTools.includes(tool.id) ? "Remove from comparison" : "Add to comparison"}
                    >
                      {selectedTools.includes(tool.id) ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link href={`/tools?category=${category}`}>
              <Button variant="outline" size="sm" className="w-full border-white/10 hover:text-white hover:bg-white/10">
                View All {category} Tools
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>

          {selectedTools.length > 0 && (
            <div className="mt-4">
              <Link href={`/tools/compare?ids=${selectedTools.join(",")}`}>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                >
                  Compare Selected ({selectedTools.length})
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Categories */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <h2 className="mb-4 text-lg font-bold text-white">Explore Categories</h2>

          <div className="flex flex-wrap gap-2">
            <Link href={`/tools?category=${category}`}>
              <Badge className="bg-purple-600 text-white hover:bg-purple-700">{category}</Badge>
            </Link>

            {popularCategories.map((cat) => (
              <Link key={cat} href={`/tools?category=${cat}`}>
                <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{cat}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-white/10 bg-gradient-to-br  from-purple-900/20 to-blue-900/20">
        <CardContent className="p-4">
          <h2 className="mb-2 text-lg font-bold ">Stay Updated</h2>
          <p className="mb-4 text-sm ">Get the latest updates on new tools and features in your inbox.</p>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm   focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
            >
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

