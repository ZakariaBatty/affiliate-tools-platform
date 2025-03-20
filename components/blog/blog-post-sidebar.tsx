import Image from "next/image"
import { Button } from "@/components/ui/button"
import BlogCard from "@/components/blog/blog-card"

interface BlogPostSidebarProps {
  post: any
  relatedPosts: any[]
}

export function BlogPostSidebar({ post, relatedPosts }: BlogPostSidebarProps) {
  return (
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
          {post.content.match(/<h2>(.*?)<\/h2>/g)?.map((match: string, index: number) => {
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
  )
}

