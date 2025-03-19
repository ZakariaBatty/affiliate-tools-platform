"use client"

import { LampDemo } from "@/components/ui/lamp-advanced"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LampSection() {
  return (
    <section className="w-full overflow-hidden pb-12 md:pb-24">
      <LampDemo />

      <div className="container relative z-10 mx-auto px-4 text-center -mt-64 md:-mt-72">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Discover the Perfect Tools</h2>
          <p className="mb-8 text-lg text-white/70">
            Our platform helps you find, compare, and integrate the best tools for your specific needs. Stop wasting
            time on solutions that don't work.
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90" size="lg">
            Explore All Tools
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

