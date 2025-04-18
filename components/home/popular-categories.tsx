"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, BarChart3, Megaphone, Clock, Palette, Code, ShieldCheck, Users, Video, Text, ArrowRight } from "lucide-react";

import { GetPopularCategoriesResponse } from "@/types"


const categoryConfig = [
  { slug: "image-generation", icon: Palette, color: "from-pink-500 to-rose-600" },
  { slug: "ai-chatbots", icon: Brain, color: "from-purple-500 to-indigo-600" },
  { slug: "summarization", icon: Text, color: "from-blue-500 to-cyan-600" },
  { slug: "data-analysis", icon: BarChart3, color: "from-blue-500 to-cyan-600" },
  { slug: "speech-to-text", icon: Text, color: "from-teal-500 to-green-600" },
  { slug: "content-writing", icon: Megaphone, color: "from-green-500 to-emerald-600" },
  { slug: "text-to-speech", icon: Text, color: "from-orange-500 to-amber-600" },
  { slug: "video-generation", icon: Video, color: "from-red-500 to-purple-500" },
];




interface PopularCategoriesProps {
  categories: GetPopularCategoriesResponse
}

export default function PopularCategories({ categories }: PopularCategoriesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-b from-black to-black/95 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Popular Categories</h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Browse tools by category to find exactly what your business needs
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const config = categoryConfig.find((c) => c.slug === category.slug)

            return (
              <motion.div
                key={category.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-white">
                    {config && (
                      <div className={`rounded-lg bg-gradient-to-br ${config.color} p-3`}>
                        <config.icon className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <h3 className="mb-2 flex items-center text-xl font-bold text-white">
                    {category.name}
                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                      {category._count?.tools}
                    </span>
                  </h3>

                  {category.description && (
                    <p className="mb-4 text-sm text-white/70">
                      {category.description.split(" ").slice(0, 6).join(" ")}
                      {category.description.split(" ").length > 6 && " ..."}
                    </p>
                  )}
                  <Link href={`/tools?${category.slug}`} key={category.id}>
                    <Button variant="ghost" className="p-0 text-white hover:bg-transparent hover:text-purple-400">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
