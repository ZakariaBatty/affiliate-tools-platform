"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { allTools } from "@/data/tools"

// Filter tools by category
const marketingTools = allTools.filter((tool) => tool.category === "Marketing").slice(0, 7)

export default function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Create animation values at the top level - one set for each card
  // Card 0
  const rotate0 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -0])
  const opacity0 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 1
  const rotate1 = useTransform(scrollYProgress, [0, 1], [5, -5])
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20])
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 2
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 3
  const rotate3 = useTransform(scrollYProgress, [0, 1], [5, -5])
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity3 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 4
  const rotate4 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const y4 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity4 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 5
  const rotate5 = useTransform(scrollYProgress, [0, 1], [5, -5])
  const y5 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity5 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Card 6
  const rotate6 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const y6 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const opacity6 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Store all animation values in an array for easy access
  const animationValues = [
    { rotate: rotate0, y: y0, opacity: opacity0 },
    { rotate: rotate1, y: y1, opacity: opacity1 },
    { rotate: rotate2, y: y2, opacity: opacity2 },
    { rotate: rotate3, y: y3, opacity: opacity3 },
    { rotate: rotate4, y: y4, opacity: opacity4 },
    { rotate: rotate5, y: y5, opacity: opacity5 },
    { rotate: rotate6, y: y6, opacity: opacity6 },
  ]

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-black">
      {/* Background glow effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Marketing AI Tools
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Discover the most powerful AI tools that are revolutionizing digital marketing, content creation, and
            audience engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingTools.map((tool, index) => {
            // Use the pre-calculated animation values
            const { rotate, y, opacity } = animationValues[index]

            return (
              <motion.div
                key={tool.id}
                style={{
                  rotate,
                  y,
                  opacity,
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <div
                  className={cn(
                    "relative rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm",
                    "transition-all duration-300 shadow-lg",
                    "hover:border-purple-500/50 hover:shadow-purple-500/20 hover:shadow-xl",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-500",
                      "bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-500/20",
                      hoveredIndex === index && "opacity-100",
                    )}
                  />

                  {/* Card content */}
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">{tool.category}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                        <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>

                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={tool.image || "/placeholder.svg?height=300&width=300"}
                        alt={tool.name}
                        fill
                        className={cn("object-cover transition-all duration-700", "group-hover:scale-110")}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">{tool.description}</p>

                    <Link href={`/tools/${tool.id}`}>
                      <Button
                        className={cn(
                          "w-full transition-all duration-300",
                          "bg-white/10 text-white border-white/10",
                          "hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500",
                          "hover:border-transparent",
                        )}
                        variant="outline"
                      >
                        <span>Explore Tool</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/tools?category=Marketing">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              View All Marketing Tools
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

