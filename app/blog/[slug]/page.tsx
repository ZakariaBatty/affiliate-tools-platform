import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TracingBeam } from "@/components/tracing-beam"
import BlogCard from "@/components/blog/blog-card"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react"
import { blogPosts } from "@/data/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category or shared tags)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

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
            {/* Article Header */}
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-purple-500/20 text-purple-300">{post.category}</Badge>
                <div className="flex items-center text-sm text-white/60">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-white/60">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{post.title}</h1>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm text-white/60">{post.author.role}</p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>

            {/* Article Content with Tracing Beam */}
            <TracingBeam className="mb-12 text-white">
              <div
                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-purple-400 prose-strong:text-white prose-li:text-white/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </TracingBeam>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-medium text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-white/10 text-white/70 hover:border-purple-500/50 hover:text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share and Save */}
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <div>
                <h3 className="mb-2 text-lg font-medium hover:text-white">Share this article</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
                <Bookmark className="mr-2 h-4 w-4" />
                Save for later
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Author Info */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    <p className="text-sm text-white/60">{post.author.role}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  Expert in {post.category} with years of experience helping businesses leverage technology for growth.
                </div>
              </div>

              {/* Table of Contents */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Table of Contents</h3>
                <nav className="space-y-2 text-sm">
                  {post.content.match(/<h2>(.*?)<\/h2>/g)?.map((match, index) => {
                    const title = match.replace(/<h2>|<\/h2>/g, "")
                    const anchor = title.toLowerCase().replace(/\s+/g, "-")
                    return (
                      <a key={index} href={`#${anchor}`} className="block text-white/70 hover:text-purple-400">
                        {title}
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Related Posts */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} variant="sidebar" />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
                <h3 className="mb-2 text-xl font-bold text-white">Subscribe to Our Newsletter</h3>
                <p className="mb-4 text-sm text-white/70">
                  Get the latest articles and insights delivered straight to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

