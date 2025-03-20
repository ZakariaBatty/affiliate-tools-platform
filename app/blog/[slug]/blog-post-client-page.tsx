"use client"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { blogPosts } from "@/data/blog-data"
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/json-ld"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostSidebar } from "@/components/blog/blog-post-sidebar"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostFooter } from "@/components/blog/blog-post-footer"

interface BlogPostClientPageProps {
  post: any
}

export default function BlogPostClientPage({ post }: BlogPostClientPageProps) {
  // Get related posts (same category or shared tags)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 5)

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        image={post.image || "/placeholder.svg"}
        url={`/blog/${post.slug}`}
        datePublished={post.date}
        authorName={post.author.name}
      />

      <main className="container mx-auto px-4 py-16">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-2 xl:col-span-3">
            <BlogPostHeader post={post} />
            <BlogPostContent post={post} />
            <BlogPostFooter post={post} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogPostSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

