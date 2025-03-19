"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/data/blog-data"

interface BlogCardProps {
  post: BlogPost
  index?: number
  variant?: "default" | "featured" | "sidebar" | "slider"
  className?: string
}

export default function BlogCard({ post, index = 0, variant = "default", className }: BlogCardProps) {
  // Different card layouts based on variant
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10",
          className,
        )}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative h-60 w-full md:h-auto md:w-1/2">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:bg-gradient-to-l" />
          </div>

          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                  {post.category}
                </span>
                <div className="flex items-center text-xs text-white/60">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-purple-300">
                {post.title}
              </h3>

              <p className="mb-4 text-white/70 line-clamp-3">{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{post.author.name}</p>
                  <p className="text-xs text-white/60">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center text-xs text-white/60">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={`Read ${post.title}`}>
          <span className="sr-only">Read article</span>
        </Link>
      </motion.div>
    )
  }

  if (variant === "sidebar") {
    return (
      <div className={cn("group flex gap-3 border-b border-white/10 pb-4 last:border-0", className)}>
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="mb-1 text-sm font-medium text-white line-clamp-2 group-hover:text-purple-300">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h4>
          <div className="flex items-center text-xs text-white/60">
            <Calendar className="mr-1 h-3 w-3" />
            {post.date}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "slider") {
    return (
      <div
        className={cn(
          "group relative h-[350px] w-[280px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5",
          className,
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
                {post.category}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white line-clamp-2 group-hover:text-purple-300">{post.title}</h3>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-sm text-purple-300 hover:text-purple-200"
            >
              Read more
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10",
        className,
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-white line-clamp-2 group-hover:text-purple-300">{post.title}</h3>

        <p className="mb-4 text-sm text-white/70 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-white/60">{post.author.name}</span>
          </div>

          <div className="flex items-center text-xs text-white/60">
            <Clock className="mr-1 h-3 w-3" />
            {post.readTime}
          </div>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={`Read ${post.title}`}>
        <span className="sr-only">Read article</span>
      </Link>
    </motion.div>
  )
}

