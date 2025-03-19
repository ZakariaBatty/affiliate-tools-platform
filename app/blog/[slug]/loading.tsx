import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Back button skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 xl:col-span-3">
          {/* Article Header Skeleton */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>

            <Skeleton className="mb-6 h-12 w-full" />
            <Skeleton className="mb-2 h-12 w-3/4" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Featured Image Skeleton */}
          <Skeleton className="mb-8 h-[400px] w-full rounded-xl" />

          {/* Article Content Skeleton */}
          <div className="mb-12 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>

          {/* Tags Skeleton */}
          <div className="mb-8">
            <Skeleton className="mb-3 h-6 w-20" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Share and Save Skeleton */}
          <Skeleton className="mb-12 h-24 w-full rounded-xl" />
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

