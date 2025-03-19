"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { Search, ListChecks, BarChart3, ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Find the Right Tools",
    description: "Search and filter through our extensive catalog of business tools and services.",
    icon: Search,
    color: "bg-purple-500",
  },
  {
    id: 2,
    title: "Compare Features",
    description: "Compare features, pricing, and reviews to make informed decisions.",
    icon: ListChecks,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Track Performance",
    description: "Monitor how the tools are performing and their impact on your business.",
    icon: BarChart3,
    color: "bg-green-500",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="bg-black py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Our platform makes it easy to discover, compare, and implement the best tools for your business
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color} text-white`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="mt-4 h-full w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[400px] overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-30" />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Platform Dashboard"
                width={600}
                height={400}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

