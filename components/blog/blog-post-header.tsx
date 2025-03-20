import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface BlogPostHeaderProps {
  post: any
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <>
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
              alt={`Avatar of ${post.author.name}`}
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
          alt={`Featured image for ${post.title}`}
          width={1200}
          height={600}
          priority
          className="w-full object-cover"
        />
      </div>
    </>
  )
}

