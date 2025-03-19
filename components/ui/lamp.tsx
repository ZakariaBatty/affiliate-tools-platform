"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export const LampContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mousePosition.current = { x, y }

        // Animate the spotlight to follow the mouse
        controls.start({
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(120, 60, 255, 0.15), transparent 40%)`,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [controls])

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={controls}
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      />
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black opacity-80" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
      </div>

      {/* Lamp */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-purple-500 opacity-50 blur-[100px]"
          />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 h-[250px] w-[250px] -translate-y-1/2 rounded-full bg-blue-500 opacity-50 blur-[100px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative z-20 w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

