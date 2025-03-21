import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export function ToolLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
          <div className="h-32 w-full bg-white/10 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-96 bg-white/10 rounded mb-8"></div>
            </div>
            <div>
              <div className="h-64 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

