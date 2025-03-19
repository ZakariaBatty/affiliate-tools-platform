import Navbar from "@/components/navbar"
import Hero from "@/components/home/hero"
import FeaturedTools from "@/components/home/featured-tools"
import QuickAccessTools from "@/components/home/quick-access-tools"
import BlogPreview from "@/components/blog/blog-preview"
import PopularCategories from "@/components/home/popular-categories"
import CompareTools from "@/components/home/compare-tools"
import TrackPerformance from "@/components/home/track-performance"
import HowItWorks from "@/components/home/how-it-works"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <FeaturedTools />
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

