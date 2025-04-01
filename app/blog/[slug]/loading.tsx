import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3">
            <Skeleton className="h-12 w-3/4 bg-white/10" />
            <Skeleton className="mt-4 h-6 w-1/2 bg-white/10" />

            <div className="mt-6 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
              <div>
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="mt-2 h-4 w-24 bg-white/10" />
              </div>
            </div>

            <Skeleton className="mt-8 h-[400px] w-full bg-white/10" />

            <div className="mt-8 space-y-4">
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-3/4 bg-white/10" />
              <Skeleton className="h-6 w-5/6 bg-white/10" />
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-2/3 bg-white/10" />
            </div>

            <div className="mt-8 space-y-4">
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-4/5 bg-white/10" />
              <Skeleton className="h-6 w-full bg-white/10" />
            </div>

            <div className="mt-8">
              <Skeleton className="h-8 w-40 bg-white/10" />
              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-8 w-20 bg-white/10" />
                ))}
              </div>
            </div>

            <Skeleton className="mt-12 h-[200px] w-full bg-white/10" />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <Skeleton className="h-[200px] w-full bg-white/10" />
              <Skeleton className="h-[250px] w-full bg-white/10" />
              <Skeleton className="h-[400px] w-full bg-white/10" />
              <Skeleton className="h-[200px] w-full bg-white/10" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

