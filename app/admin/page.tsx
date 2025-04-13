import { StatsCard } from "@/components/admin/stats-card"
import { RecentActivityCard } from "@/components/admin/recent-activity"
import { TopPerformingTools } from "@/components/admin/top-performing-tools"
import { UserGrowthChart } from "@/components/admin/user-growth-chart"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { PlatformMetrics } from "@/components/admin/platform-metrics"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, RefreshCw } from "lucide-react"
import { getAdminStats } from "../actions/admin/data-fetching"

export default async function AdminDashboard() {

  const stats = await getAdminStats()

  if (!stats) {
    return <div>Error loading stats</div>
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your platform's performance and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value={stats.totalUsers.toString()} change="+12.3%" trend="up" description="vs. previous month" icon="users" />
        <StatsCard title="Total Companies" value={stats.totalCompanies.toString()} change="+5.7%" trend="up" description="vs. previous month" icon="buildings" />
        <StatsCard title="Total Tools" value={stats.totalCompanies.toString()} change="+18.2%" trend="up" description="vs. previous month" icon="tool" />
        <StatsCard title="Monthly Revenue" value="$48,294" change="+22.4%" trend="up" description="vs. previous month" icon="dollar-sign" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TopPerformingTools />
        </div>
        <RecentActivityCard />
      </div>

      <PlatformMetrics />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Quick Actions</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="h-auto py-4 justify-start bg-white text-black hover:bg-purple-600 hover:text-white border border-gray-200">
            <div className="flex flex-col items-start">
              <span className="font-medium">Add New Tool</span>
              <span className="text-xs text-muted-foreground">Create a new tool listing</span>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5" />
          </Button>
          <Button className="h-auto py-4 justify-start bg-white text-black hover:bg-purple-600 hover:text-white border border-gray-200">
            <div className="flex flex-col items-start">
              <span className="font-medium">Create Blog Post</span>
              <span className="text-xs text-muted-foreground">Publish new content</span>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5" />
          </Button>
          <Button className="h-auto py-4 justify-start bg-white text-black hover:bg-purple-600 hover:text-white border border-gray-200">
            <div className="flex flex-col items-start">
              <span className="font-medium">Manage Users</span>
              <span className="text-xs text-muted-foreground">View and edit users</span>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5" />
          </Button>
          <Button className="h-auto py-4 justify-start bg-white text-black hover:bg-purple-600 hover:text-white border border-gray-200">
            <div className="flex flex-col items-start">
              <span className="font-medium">Payment Settings</span>
              <span className="text-xs text-muted-foreground">Configure payment methods</span>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

