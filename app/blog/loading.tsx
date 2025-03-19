import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section Skeleton */}
      <div className="mb-16 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-3/4 max-w-2xl" />
        <Skeleton className="mx-auto mb-8 h-6 w-2/3 max-w-xl" />

        <div className="mx-auto flex max-w-md flex-col items-center gap-4 sm:flex-row">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
      </div>

      {/* Featured Posts Slider Skeleton */}
      <div className="mb-16">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="flex gap-6 overflow-x-auto pb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[350px] w-[280px] shrink-0 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {/* Blog Posts Skeleton */}
        <div className="lg:col-span-2 xl:col-span-3">
          <Skeleton className="mb-8 h-10 w-full" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>

          <Skeleton className="mx-auto mt-10 h-10 w-40" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="space-y-8">
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[400px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

