import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanyPaymentsLoading() {
  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 bg-white/5" />
          <Skeleton className="mt-2 h-4 w-96 bg-white/5" />
        </div>
        
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-48 bg-white/5" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5 md:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/5" />
            <Skeleton className="h-4 w-64 bg-white/5" />
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-7 w-32 bg-white/5" />
                  <Skeleton className="mt-1 h-6 w-20 bg-white/5" />
                </div>
                <Skeleton className="h-10 w-32 bg-white/5" />
              </div>

              <Skeleton className="my-6 h-px w-full bg-white/5" />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Skeleton className="h-4 w-32 bg-white/5" />
                  <Skeleton className="mt-2 h-6 w-24 bg-white/5" />
                </div>
                <div>
                  <Skeleton className="h-4 w-36 bg-white/5" />
                  <Skeleton className="mt-2 h-6 w-48 bg-white/5" />
                </div>
              </div>

              <Skeleton className="my-6 h-px w-full bg-white/5" />

              <div>
                <Skeleton className="h-4 w-36 bg-white/5" />
                <div className="mt-2 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md bg-white/5" />
                  <div>
                    <Skeleton className="h-5 w-48 bg-white/5" />
                    <Skeleton className="mt-1 h-4 w-32 bg-white/5" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Skeleton className="h-10 w-32 bg-white/5" />
                <Skeleton className="h-10 w-48 bg-white/5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <Skeleton className="h-6 w-36 bg-white/5" />
            <Skeleton className="h-4 w-48 bg-white/5" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Skeleton className="h-4 w-32 bg-white/5" />
                <Skeleton className="mt-2 h-6 w-48 bg-white/5" />
              </div>

              <div>
                <Skeleton className="h-4 w-36 bg-white/5" />
                <Skeleton className="mt-2 h-6 w-24 bg-white/5" />
              </div>

              <div>
                <Skeleton className="h-4 w-32 bg-white/5" />
                <div className="mt-2 flex items-center">
                  <Skeleton className="h-5 w-5 rounded-full mr-2 bg-white/5" />
                  <Skeleton className="h-5 w-24 bg-white/5" />
                </div>
              </div>
            </div>

            <Skeleton className="mt-6 h-10 w-full bg-white/5" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-white/10 bg-white/5">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Skeleton className="h-6 w-36 bg-white/5" />
              <Skeleton className="mt-1 h-4 w-48 bg-white/5" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[200px] bg-white/5" />
              <Skeleton className="h-10 w-[200px] bg-white/5" />
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
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-16 bg-white/5" />
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
                      <Skeleton className="h-5 w-24 bg-white/5" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-5 w-24 bg-white/5" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-5 w-24 bg-white/5" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-16 rounded-md bg-white/5" />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-16 rounded-md bg-white/5" />
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

