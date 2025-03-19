import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
        <Skeleton className="mx-auto mb-12 h-20 w-full" />
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>

        <div className="order-1 md:order-2">
          <Skeleton className="mb-6 h-8 w-48" />

          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start">
                <Skeleton className="mr-4 h-10 w-10 rounded-full" />
                <div className="w-full">
                  <Skeleton className="mb-2 h-6 w-32" />
                  <Skeleton className="mb-2 h-4 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Skeleton className="mx-auto mb-8 h-8 w-64" />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}

