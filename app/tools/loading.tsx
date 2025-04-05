import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ToolsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-12 w-3/4 bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-6 w-2/3 bg-white/10" />
        </div>

        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-10 w-full bg-white/10" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 bg-white/10" />
              <Skeleton className="h-10 w-10 bg-white/10" />
              <Skeleton className="h-10 w-24 bg-white/10" />
              <Skeleton className="hidden h-10 w-32 bg-white/10 md:block" />
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-white/10" />
          <Skeleton className="h-6 w-48 bg-white/10" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Skeleton key={i} className="h-[350px] w-full bg-white/10" />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="mx-auto h-10 w-40 bg-white/10" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

