"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BlogSlider from "@/components/blog/blog-slider"
import { featuredPosts } from "@/data/blog-data"

export default function BlogPreview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Latest from Our Blog</h2>
            <p className="mt-2 text-white/70">Insights and guides about AI tools and technologies</p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="group border-white/10 text-white hover:bg-white/10">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <BlogSlider title="" posts={featuredPosts} />

        <div className="mt-10 flex justify-center">
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              Explore All Blog Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

