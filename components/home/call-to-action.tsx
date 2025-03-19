"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitted email:", email)
    setEmail("")
    // Show success message or redirect
  }

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Grow Your Business with the Right Tools?
              </h2>
              <p className="mb-8 text-white/70">
                Join thousands of businesses that use our platform to find the perfect tools for their needs. Add your
                email to get started or list your tool on our platform.
              </p>

              <form onSubmit={handleSubmit} className="mx-auto mb-6 flex max-w-md flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-sm text-white/50">
                Or{" "}
                <Button variant="link" className="h-auto p-0 text-purple-400 hover:text-purple-300">
                  list your tool
                </Button>{" "}
                on our platform to reach more customers
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

