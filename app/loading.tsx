import { Skeleton } from "@/components/ui/skeleton"
import Footer from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">

      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto h-12 w-3/4 bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-6 w-2/3 bg-white/10" />

          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-full sm:w-auto bg-white/10" />
          </div>
        </div>

        <section className="mb-16">
          <Skeleton className="h-[400px] w-full bg-white/10" />
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3">
            <Skeleton className="h-10 w-full bg-white/10" />

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[350px] w-full bg-white/10" />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Skeleton className="mx-auto h-10 w-40 bg-white/10" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-8">
              <Skeleton className="h-[200px] w-full bg-white/10" />
              <Skeleton className="h-[200px] w-full bg-white/10" />
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

