import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCategory() {
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-12 w-3/4 bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-6 w-2/3 bg-white/10" />
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-6 py-4 text-left">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[...Array(8)].map((_, rowIndex) => (
                <tr key={rowIndex} className="bg-white/5">
                  {[...Array(5)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <Skeleton className="h-4 w-full max-w-[100px] bg-white/10" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="mx-auto h-10 w-40 bg-white/10" />
        </div>
      </main>
    </div>
  );
}
