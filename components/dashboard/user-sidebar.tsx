import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Bookmark, BarChart3, Eye, ChevronRight } from "lucide-react"
import type { Tool } from "@/types/tool"

interface UserSidebarProps {
  userData: {
    name: string
    email: string
    avatar: string
    plan: string
    joinDate: string
  }
  usageStats: {
    savedTools: number
    viewedTools: number
    comparedTools: number
    totalCategories: number
  }
  activityData: {
    action: string
    tool: string
    date: string
  }[]
  savedToolsData: Tool[]
}

export default function UserSidebar({ userData, usageStats, activityData, savedToolsData }: UserSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        {/* User Profile Card */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                <p className="text-sm text-white/70">{userData.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">{userData.plan}</Badge>
                  <span className="text-xs text-white/50">Member since {userData.joinDate}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4 bg-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/10 p-3 text-center">
                <div className="text-2xl font-bold text-white">{usageStats.savedTools}</div>
                <div className="text-xs text-white/70">Saved Tools</div>
              </div>

              <div className="rounded-lg bg-white/10 p-3 text-center">
                <div className="text-2xl font-bold text-white">{usageStats.comparedTools}</div>
                <div className="text-xs text-white/70">Comparisons</div>
              </div>

              <div className="rounded-lg bg-white/10 p-3 text-center">
                <div className="text-2xl font-bold text-white">{usageStats.viewedTools}</div>
                <div className="text-xs text-white/70">Viewed Tools</div>
              </div>

              <div className="rounded-lg bg-white/10 p-3 text-center">
                <div className="text-2xl font-bold text-white">{usageStats.totalCategories}</div>
                <div className="text-xs text-white/70">Categories</div>
              </div>
            </div>

            <Button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              Upgrade to Pro+
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <ActivityCard activityData={activityData} />

        {/* Category Distribution */}
        <CategoryDistribution savedToolsData={savedToolsData} />
      </div>
    </div>
  )
}

interface ActivityCardProps {
  activityData: {
    action: string
    tool: string
    date: string
  }[]
}

function ActivityCard({ activityData }: ActivityCardProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
        <CardDescription className="text-white/70">Your latest interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                {activity.action === "Saved" && <Bookmark className="h-3 w-3 text-purple-500" />}
                {activity.action === "Compared" && <BarChart3 className="h-3 w-3 text-blue-500" />}
                {activity.action === "Viewed" && <Eye className="h-3 w-3 text-green-500" />}
              </div>

              <div>
                <p className="text-sm text-white">
                  <span className="font-medium">{activity.action}</span> {activity.tool}
                </p>
                <p className="text-xs text-white/50">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="mt-4 w-full text-white/70 hover:text-white">
          View All Activity
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

interface CategoryDistributionProps {
  savedToolsData: Tool[]
}

function CategoryDistribution({ savedToolsData }: CategoryDistributionProps) {
  // Calculate category distribution
  const categories = savedToolsData.reduce(
    (acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalTools = savedToolsData.length

  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Category Distribution</CardTitle>
        <CardDescription className="text-white/70">Your saved tools by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-white">{category}</span>
                <span className="text-xs text-white/70">{count} tools</span>
              </div>
              <Progress value={(count / totalTools) * 100} className="h-2 bg-white/10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

