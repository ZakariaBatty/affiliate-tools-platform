import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoadingTable() {
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-16">
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
      </main>
    </div>
  );
}
