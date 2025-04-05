import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { constructMetadata } from "@/lib/seo-config"
import { Suspense } from "react"
import BlogPostLoading from "./loading"
import { getBlogPostDetail } from "@/app/actions/data-fetching"
import BlogPostClientPage from "./blog-post-client-page"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params
  const data = await getBlogPostDetail(resolvedParams.slug)

  if (!data) {
    return constructMetadata({ title: "Blog Post Not Found", noIndex: true })
  }

  const { post } = data

  return constructMetadata({
    title: post.title,
    description: post.excerpt || 'Discover and compare the best affiliate marketing tools for your business',
    image: post.coverImage || '/images/og-image.jpg',
    url: `/blog/${post.slug}`,
    type: "article",
    keywords: [...post.tags.map((tag) => tag.name), ...post.categories.map((cat) => cat.name), "blog", "article"],
  })
}

export default async function BlogPostPage({ params }: any) {
  const resolvedParams = await params

  const data = await getBlogPostDetail(resolvedParams.slug)

  if (!data) {
    notFound()
  }

  const { post, relatedPosts } = data
  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostClientPage post={post} relatedPosts={relatedPosts} />
    </Suspense>
  )
}

