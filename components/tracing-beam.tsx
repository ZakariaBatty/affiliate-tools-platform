"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Create a spring animation for the path drawing
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  })

  const [svgHeight, setSvgHeight] = useState(0)

  // Update SVG height on resize and initial load
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setSvgHeight(ref.current.scrollHeight)
      }
    }

    // Initial update
    updateHeight()

    // Update on resize
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <div className="absolute -left-4 md:-left-20 top-3 bottom-0 w-4 md:w-20">
        <svg
          className="h-full w-full"
          width="100%"
          height={svgHeight}
          viewBox={`0 0 20 ${svgHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d={`M 10 0 L 10 ${svgHeight}`}
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength,
              strokeDasharray: 1,
              strokeDashoffset: 0,
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2={svgHeight} gradientUnits="userSpaceOnUse">
              <stop stopColor="#9333EA" />
              <stop offset="0.5" stopColor="#E879F9" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated circle following the path */}
        <motion.div
          className="absolute left-0 h-4 w-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg shadow-purple-500/20 md:left-8"
          style={{
            top: useTransform(scrollYProgress, [0, 1], [0, svgHeight - 16]),
            left: "8px",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      {children}
    </motion.div>
  )
}

