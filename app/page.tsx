import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import Hero from "@/components/home/hero"
import FeaturedTools from "@/components/home/featured-tools"
import QuickAccessTools from "@/components/home/quick-access-tools"
import CompareTools from "@/components/home/compare-tools"
import PopularCategories from "@/components/home/popular-categories"
import TrackPerformance from "@/components/home/track-performance"
import HowItWorks from "@/components/home/how-it-works"
import BlogPreview from "@/components/blog/blog-preview"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import StickyQuickAccessTools from "@/components/home/sticky-quick-access-rools"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { getFeaturedBlogPosts, getFeaturedTools, getPopularCategories } from "./actions/data-fetching"
import { Suspense } from "react"
import Loading from "./loading"

export const metadata: Metadata = constructMetadata({
  title: "Home",
  description: "Discover and compare the best affiliate marketing tools to boost your business growth and revenue",
  keywords: ["affiliate marketing", "marketing tools", "tool comparison", "best tools"],
})

export default async function HomePage() {
  const [featuredTools, categories, blogPosts] = await Promise.all([
    getFeaturedTools(),
    getPopularCategories(),
    getFeaturedBlogPosts(),
  ])
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Suspense fallback={<Loading />}>
        <FeaturedTools tools={featuredTools} />
      </Suspense>
      <StickyQuickAccessTools />
      <QuickAccessTools />
      <div id="categories">
        <Suspense fallback={<Loading />}>
          <PopularCategories categories={categories} />
        </Suspense>
      </div>
      <CompareTools />
      {/* <TrackPerformance /> */}
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Suspense fallback={<Loading />}>
        <BlogPreview posts={blogPosts} />
      </Suspense>
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

