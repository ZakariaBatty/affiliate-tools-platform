"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Brain, BarChart3, Megaphone, Clock, Palette, Code, ShieldCheck, Users, ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "AI Tools",
    description: "Leverage artificial intelligence to automate tasks",
    icon: Brain,
    color: "from-purple-500 to-indigo-600",
    count: 128,
  },
  {
    id: 2,
    name: "Analytics",
    description: "Track and analyze your business performance",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-600",
    count: 95,
  },
  {
    id: 3,
    name: "Marketing",
    description: "Grow your audience and increase conversions",
    icon: Megaphone,
    color: "from-green-500 to-emerald-600",
    count: 156,
  },
  {
    id: 4,
    name: "Productivity",
    description: "Streamline workflows and save time",
    icon: Clock,
    color: "from-orange-500 to-amber-600",
    count: 112,
  },
  {
    id: 5,
    name: "Design",
    description: "Create stunning visuals and user experiences",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    count: 87,
  },
  {
    id: 6,
    name: "Development",
    description: "Build and deploy software faster",
    icon: Code,
    color: "from-violet-500 to-purple-600",
    count: 143,
  },
  {
    id: 7,
    name: "Security",
    description: "Protect your business and customer data",
    icon: ShieldCheck,
    color: "from-red-500 to-rose-600",
    count: 76,
  },
  {
    id: 8,
    name: "HR & Team",
    description: "Manage your team and improve collaboration",
    icon: Users,
    color: "from-teal-500 to-green-600",
    count: 64,
  },
]

export default function PopularCategories() {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
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
                  <div className={`rounded-lg bg-gradient-to-br ${category.color} p-3`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="mb-2 flex items-center text-xl font-bold text-white">
                  {category.name}
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                    {category.count}
                  </span>
                </h3>

                <p className="mb-4 text-sm text-white/70">{category.description}</p>

                <Button variant="ghost" className="p-0 text-white hover:bg-transparent hover:text-purple-400">
                  <span>Explore</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

