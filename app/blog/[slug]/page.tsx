import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/data/blog-data"
import { constructMetadata } from "@/lib/seo-config"
import BlogPostClientPage from "./blog-post-client-page"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug)

  if (!post) {
    return constructMetadata({ title: "Blog Post Not Found", noIndex: true })
  }

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    url: `/blog/${post.slug}`,
    type: "article",
    keywords: [...post.tags, post.category, "blog", "article"],
  })
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params

  const post = blogPosts.find((post) => post.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClientPage post={post} />
}

