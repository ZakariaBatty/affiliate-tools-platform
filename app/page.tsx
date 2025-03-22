import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import Navbar from "@/components/navbar"
import Hero from "@/components/home/hero"
import FeaturedTools from "@/components/home/featured-tools"
import QuickAccessTools from "@/components/home/quick-access-tools"
import PopularCategories from "@/components/home/popular-categories"
import CompareTools from "@/components/home/compare-tools"
import TrackPerformance from "@/components/home/track-performance"
import HowItWorks from "@/components/home/how-it-works"
import BlogPreview from "@/components/blog/blog-preview"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import Footer from "@/components/footer"
import StickyQuickAccessTools from "@/components/home/sticky-quick-access-rools"

export const metadata: Metadata = constructMetadata({
  title: "Home",
  description: "Discover and compare the best affiliate marketing tools to boost your business growth and revenue",
  keywords: ["affiliate marketing", "marketing tools", "tool comparison", "best tools"],
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <FeaturedTools />
      <StickyQuickAccessTools />
      <QuickAccessTools />
      <div id="categories">
        <PopularCategories />
      </div>
      <CompareTools />
      <TrackPerformance />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <BlogPreview />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

