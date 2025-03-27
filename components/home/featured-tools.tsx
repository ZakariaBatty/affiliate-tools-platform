"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { allTools } from "@/data/tools"

export default function FeaturedTools() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Use the first 6 tools from our data
  const tools = allTools.slice(0, 6)

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 opacity-50" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Featured Tools</h2>
          <p className="mx-auto max-w-2xl text-white/70 mt-4">
            Discover the most popular tools that are helping businesses grow and succeed
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link href={`/tools/${tool.id}`} key={tool.id} className="block">
              <motion.div
                className="group relative overflow-hidden rounded-xl bg-gray-900 transition-all duration-300 h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Main image */}
                <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
                  <Image
                    src={tool.image || "/placeholder.svg?height=400&width=600"}
                    alt={tool.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content area */}
                <div className="flex p-4">
                  {/* Tool icon */}
                  <div className="mr-4 flex-shrink-0">
                    <div
                      className={`relative h-12 w-12 overflow-hidden rounded-full 
                      ${index % 3 === 0 ? "bg-orange-500" : index % 3 === 1 ? "bg-blue-500" : "bg-green-500"}`}
                    >
                      <Image
                        src={tool.image || "/placeholder.svg?height=100&width=100"}
                        alt={tool.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Tool info */}
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-400">{tool.category}</span>
                      <div className="flex items-center ml-auto">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium text-yellow-500">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tools">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 px-8 py-6 text-lg">
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

