import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Award, TrendingUp, Globe } from "lucide-react"
import LampSection from "@/components/home/lamp-section"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"

export const metadata: Metadata = constructMetadata({
  title: "About Us",
  description: "Learn about ToolsHub, our mission, and how we help affiliate marketers find the best tools",
  keywords: ["about toolshub", "affiliate marketing platform", "tool comparison site"],
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        {/* Lamp Section */}
        <LampSection />

        {/* Our Story Section */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative h-[400px] overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-30" />
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="ToolsHub Team"
                  width={600}
                  height={400}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Our Story</h2>
                <p className="mb-6 text-white/70">
                  ToolsHub was founded in 2023 with a simple idea: make it easier for businesses to discover, compare,
                  and implement the right tools for their needs.
                </p>
                <p className="mb-6 text-white/70">
                  Our founders experienced firsthand the challenges of finding the right software solutions in an
                  increasingly crowded marketplace. After wasting countless hours on research and trial-and-error, they
                  decided to create a platform that would simplify this process for others.
                </p>
                <p className="mb-6 text-white/70">
                  Today, ToolsHub has helped thousands of businesses find the perfect tools to streamline their
                  operations, boost productivity, and drive growth.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <span>12,000+ Tools</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>50,000+ Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Award className="h-5 w-5 text-green-500" />
                    <span>500+ Categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-gradient-to-b from-black to-black/95 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Our Mission</h2>
              <p className="mb-10 text-lg text-white/70">
                We're on a mission to help businesses of all sizes find the perfect tools to achieve their goals,
                without the hassle and confusion.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Simplify Discovery</h3>
                <p className="text-white/70">
                  We curate and organize the best tools on the market, making it easy to find exactly what you need for
                  your specific business challenges.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Enable Comparison</h3>
                <p className="text-white/70">
                  Our detailed comparison features help you make informed decisions by evaluating features, pricing, and
                  performance side by side.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Build Community</h3>
                <p className="text-white/70">
                  We foster a community of business leaders and professionals who share insights, experiences, and best
                  practices for tool implementation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Meet Our Team</h2>
              <p className="text-white/70">
                We're a passionate team of tech enthusiasts, business experts, and problem solvers dedicated to helping
                businesses thrive.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Former tech consultant with a passion for helping businesses find the right tools.",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Software engineer with 15+ years of experience building scalable platforms.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Partnerships",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Building relationships with tool providers to bring the best options to our users.",
                },
                {
                  name: "Emily Patel",
                  role: "Head of Content",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Creating educational content to help businesses make the most of their tools.",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10"
                >
                  <div className="mb-4 h-40 w-full overflow-hidden rounded-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
                  <p className="mb-3 text-sm text-purple-400">{member.role}</p>
                  <p className="text-sm text-white/70">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-b from-black/95 to-black py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Get in Touch</h2>
              <p className="mb-8 text-white/70">
                Have questions, feedback, or want to list your tool on our platform? We'd love to hear from you!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                  Contact Us
                </Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                  List Your Tool
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

