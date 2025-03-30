import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import { Suspense } from "react"
import BlogClientPage from "./BlogClientPage"
import BlogLoading from "./loading"
import {
  getAllBlogPosts,
  getFeaturedBlogPostsForSlider,
  getBlogCategories,
  getBlogTags,
} from "@/app/actions/data-fetching"

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description: "Insights, guides, and news about affiliate marketing tools and strategies",
  keywords: ["affiliate marketing blog", "marketing guides", "tool reviews", "affiliate strategies"],
})

export default async function BlogPage() {
  const [posts, featuredPosts, categories, tags] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPostsForSlider(),
    getBlogCategories(),
    getBlogTags(),
  ])

  console.log("posts", posts)
  console.log("featuredPosts", featuredPosts)
  console.log("categories", categories)
  console.log("tags", tags)


  // posts={posts} featuredPosts={featuredPosts} categories={categories} tags={tags}
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClientPage />
    </Suspense>
  )
}

