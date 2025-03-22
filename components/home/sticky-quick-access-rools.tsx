"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { allTools } from "@/data/tools"

export default function StickyQuickAccessTools() {
  // Get 6 tools from different categories for variety
  const tools = [
    allTools.find((t) => t.category === "AI Tools"),
    allTools.find((t) => t.category === "Analytics"),
    allTools.find((t) => t.category === "Marketing"),
    allTools.find((t) => t.category === "Productivity"),
    allTools.find((t) => t.category === "Design"),
    allTools.find((t) => t.category === "Development"),
  ]
    .filter(Boolean)
    .slice(0, 6)

  const colors = [
    { bg: "bg-pink-500/20", ring: "ring-pink-500" },
    { bg: "bg-blue-500/20", ring: "ring-blue-500" },
    { bg: "bg-green-500/20", ring: "ring-green-500" },
    { bg: "bg-purple-500/20", ring: "ring-purple-500" },
    { bg: "bg-amber-500/20", ring: "ring-amber-500" },
    { bg: "bg-cyan-500/20", ring: "ring-cyan-500" },
  ]

  return (
    <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden xl:block">
      <div className="flex flex-col space-y-6">
        {tools.map((tool, index) => (
          <Link href={`/tools/${tool?.id}`} key={`quick-${tool?.id}`}>
            <motion.div
              className="flex flex-col items-center group"
              whileHover={{ x: 5, scale: 1.1 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`relative h-14 w-14 rounded-full flex items-center justify-center ${colors[index].bg} ring-2 ${colors[index].ring}`}
              >
                <Image
                  src={tool?.image || "/placeholder.svg?height=50&width=50"}
                  alt={tool?.name || "Tool"}
                  width={35}
                  height={35}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="mt-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tool?.name.split(" ")[0]}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

