import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanyToolsLoading() {
  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 bg-white/5" />
          <Skeleton className="mt-2 h-4 w-64 bg-white/5" />
        </div>
        
        <Skeleton className="h-10 w-36 bg-white/5" />
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Skeleton className="h-6 w-32 bg-white/5" />
              <Skeleton className="mt-1 h-4 w-24 bg-white/5" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[240px] bg-white/5" />
              <Skeleton className="h-10 w-10 bg-white/5" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-20 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-24 bg-white/5" />
                  </th>
                  <th className="p-4 text-right">
                    <Skeleton className="h-4 w-20 ml-auto bg-white/5" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-md bg-white/5" />
                        <div>
                          <Skeleton className="h-5 w-32 bg-white/5" />
                          <Skeleton className="mt-1 h-3 w-48 bg-white/5" />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-20 rounded-md bg-white/5" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-5 w-16 bg-white/5" />
                    </td>
                    <td className="p-4">
                      <div>
                        <Skeleton className="h-5 w-20 bg-white/5" />
                        <Skeleton className="mt-1 h-3 w-16 bg-white/5" />
                      </div>
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-16 rounded-md bg-white/5" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-16 bg-white/5" />
                        <Skeleton className="h-5 w-16 bg-white/5" />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-md bg-white/5" />
                        <Skeleton className="h-8 w-8 rounded-md bg-white/5" />
                        <Skeleton className="h-8 w-8 rounded-md bg-white/5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </CompanyDashboardLayout>
  )
}

