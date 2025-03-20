"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  Star,
  Eye,
  Bookmark,
  ChevronRight,
  BarChart,
  LineChart,
  PieChart,
  PlusCircle,
  Coins,
} from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"
import { allTools } from "@/data/tools"

export default function CompanyDashboardPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const [viewTab, setViewTab] = useState("overview")

  // Filter for only the company's tools (in a real app, this would be based on the logged-in company)
  const companyTools = allTools.filter((tool) => [1, 3, 5, 7, 9].includes(tool.id))

  // Mock statistics
  const stats = {
    totalTools: companyTools.length,
    totalSaves: 2457,
    totalViews: 12843,
    totalRevenue: 8750,
    growthRate: 24,
    planStatus: "Pro",
    popularTool: companyTools[0]?.name || "AI Writer Pro",
    conversionRate: 3.8,
    activePlans: {
      free: 1245,
      basic: 378,
      pro: 87,
      enterprise: 12,
    },
  }

  // Mock revenue data
  const revenueData = {
    "7d": [1200, 980, 1100, 1300, 1050, 1420, 1350],
    "30d": [
      950, 1050, 1000, 1200, 980, 1100, 1300, 1050, 1420, 1350, 1500, 1600, 1550, 1700, 1650, 1800, 1750, 1900, 1850,
      2000, 2100, 2050, 2200, 2150, 2300, 2250, 2400, 2350, 2500, 2450,
    ],
    "90d": Array.from({ length: 90 }, () => Math.floor(Math.random() * 1500) + 1000),
  }

  // Mock traffic sources data
  const trafficSources = [
    { source: "Direct", percentage: 35 },
    { source: "Search", percentage: 25 },
    { source: "Referral", percentage: 20 },
    { source: "Social", percentage: 15 },
    { source: "Other", percentage: 5 },
  ]

  // Mock recent activity
  const recentActivity = [
    { action: "Tool saved", tool: companyTools[0]?.name || "AI Writer Pro", count: 12, time: "2 hours ago" },
    { action: "New reviews", tool: companyTools[1]?.name || "DataViz", count: 3, time: "Yesterday" },
    { action: "Plan upgrades", tool: companyTools[2]?.name || "MarketBoost", count: 5, time: "2 days ago" },
    { action: "Feature requests", tool: companyTools[0]?.name || "AI Writer Pro", count: 7, time: "3 days ago" },
  ]

  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Company Dashboard</h1>
          <p className="text-white/70">Welcome back! Here's an overview of your tools performance</p>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "90d")} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Tool Saves</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalSaves.toLocaleString()}</h3>
              </div>
              <div className="rounded-full bg-purple-500/20 p-3 text-purple-500">
                <Bookmark className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+{stats.growthRate}% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Tool Views</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</h3>
              </div>
              <div className="rounded-full bg-blue-500/20 p-3 text-blue-500">
                <Eye className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+18% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Active Subscribers</p>
                <h3 className="text-2xl font-bold text-white">
                  {Object.values(stats.activePlans)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </h3>
              </div>
              <div className="rounded-full bg-green-500/20 p-3 text-green-500">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Revenue</p>
                <h3 className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="rounded-full bg-amber-500/20 p-3 text-amber-500">
                <Coins className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+12% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={viewTab} onValueChange={setViewTab} className="mb-8">
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Tools Performance */}
            <Card className="border-white/10 bg-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Tools Performance</CardTitle>
                <CardDescription className="text-white/70">Overview of your top performing tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyTools.slice(0, 4).map((tool, index) => (
                    <div key={tool.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={tool.image || "/placeholder.svg?height=40&width=40"}
                            alt={tool.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">{tool.name}</p>
                          <div className="flex items-center text-sm text-white/70">
                            <span>{tool.category}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span>{tool.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white/70">Views</p>
                          <p className="font-medium text-white">{(5000 - index * 1000).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/70">Saves</p>
                          <p className="font-medium text-white">{(1000 - index * 200).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/70">Conversion</p>
                          <p className="font-medium text-white">{(4.8 - index * 0.3).toFixed(1)}%</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="mt-4 w-full text-white/70 hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/company-dashboard/tools">
                    View All Tools
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Traffic Sources</CardTitle>
                <CardDescription className="text-white/70">Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex h-[220px] items-center justify-center">
                  <PieChart className="h-40 w-40 text-white/30" />
                </div>
                <div className="mt-4 space-y-3">
                  {trafficSources.map((source) => (
                    <div key={source.source}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-white">{source.source}</span>
                        <span className="text-sm font-medium text-white">{source.percentage}%</span>
                      </div>
                      <Progress value={source.percentage} className="h-1.5 bg-white/10" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Revenue Chart */}
            <Card className="border-white/10 bg-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Revenue Overview</CardTitle>
                <CardDescription className="text-white/70">Revenue trends for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-b border-white/10" />
                      <div className="border-b border-white/10" />
                      <div className="border-b border-white/10" />
                      <div className="border-b border-white/10" />
                    </div>

                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                      </linearGradient>

                      <path
                        d={`M0,${100 - (revenueData[timeRange][0] / 3000) * 100} ${revenueData[timeRange]
                          .map((value, index) => {
                            const x = (index / (revenueData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 3000) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")}`}
                        fill="none"
                        stroke="url(#purple-gradient)"
                        strokeWidth="2"
                        className="text-purple-500"
                      />

                      <path
                        d={`M0,${100 - (revenueData[timeRange][0] / 3000) * 100} ${revenueData[timeRange]
                          .map((value, index) => {
                            const x = (index / (revenueData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 3000) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")} V100 H0 Z`}
                        fill="url(#lineGradient)"
                        opacity="0.2"
                      />
                    </svg>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/50">
                      {timeRange === "7d" ? (
                        <>
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </>
                      ) : timeRange === "30d" ? (
                        <>
                          <span>Week 1</span>
                          <span>Week 2</span>
                          <span>Week 3</span>
                          <span>Week 4</span>
                        </>
                      ) : (
                        <>
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span className="text-white/70">Revenue</span>
                    </div>
                  </div>
                  <Link href="/company-dashboard/payments" className="text-purple-500 hover:underline">
                    View detailed report
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">Latest updates from your tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                        {activity.action.includes("saved") && <Bookmark className="h-3 w-3 text-purple-500" />}
                        {activity.action.includes("reviews") && <Star className="h-3 w-3 text-yellow-500" />}
                        {activity.action.includes("upgrades") && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {activity.action.includes("requests") && <PlusCircle className="h-3 w-3 text-blue-500" />}
                      </div>

                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">
                            {activity.count}x {activity.action}
                          </span>{" "}
                          for {activity.tool}
                        </p>
                        <p className="text-xs text-white/50">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="mt-4 w-full text-white/70 hover:bg-white/10 hover:text-white">
                  View All Activity
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Distribution */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Subscription Distribution</CardTitle>
              <CardDescription className="text-white/70">Breakdown of user subscription levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Free Plan</h3>
                    <div className="my-2 text-3xl font-bold text-white">{stats.activePlans.free.toLocaleString()}</div>
                    <p className="text-sm text-white/70">users</p>
                  </div>
                  <Progress
                    value={(stats.activePlans.free / Object.values(stats.activePlans).reduce((a, b) => a + b, 0)) * 100}
                    className="h-2 bg-white/10"
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Basic Plan</h3>
                    <div className="my-2 text-3xl font-bold text-white">{stats.activePlans.basic.toLocaleString()}</div>
                    <p className="text-sm text-white/70">subscribers</p>
                  </div>
                  <Progress
                    value={
                      (stats.activePlans.basic / Object.values(stats.activePlans).reduce((a, b) => a + b, 0)) * 100
                    }
                    className="h-2 bg-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Pro Plan</h3>
                    <div className="my-2 text-3xl font-bold text-white">{stats.activePlans.pro.toLocaleString()}</div>
                    <p className="text-sm text-white/70">subscribers</p>
                  </div>
                  <Progress
                    value={(stats.activePlans.pro / Object.values(stats.activePlans).reduce((a, b) => a + b, 0)) * 100}
                    className="h-2 bg-purple-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Enterprise</h3>
                    <div className="my-2 text-3xl font-bold text-white">
                      {stats.activePlans.enterprise.toLocaleString()}
                    </div>
                    <p className="text-sm text-white/70">subscribers</p>
                  </div>
                  <Progress
                    value={
                      (stats.activePlans.enterprise / Object.values(stats.activePlans).reduce((a, b) => a + b, 0)) * 100
                    }
                    className="h-2 bg-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analysis</CardTitle>
              <CardDescription className="text-white/70">Detailed breakdown of your revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="relative h-full w-full flex items-center justify-center">
                  <BarChart className="h-60 w-60 text-white/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-white/50">Select a time range to view detailed data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">User Engagement Metrics</CardTitle>
              <CardDescription className="text-white/70">How users interact with your tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="relative h-full w-full flex items-center justify-center">
                  <LineChart className="h-60 w-60 text-white/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-white/50">Select a time range to view detailed data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Conversion Funnel</CardTitle>
              <CardDescription className="text-white/70">User journey from view to paid subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="relative h-full w-full flex items-center justify-center">
                  <BarChart3 className="h-60 w-60 text-white/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-white/50">Select a time range to view detailed data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">User Feedback Overview</CardTitle>
              <CardDescription className="text-white/70">Ratings and reviews from your users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <Star className="mx-auto h-12 w-12 fill-yellow-500 text-yellow-500" />
                    <h3 className="mt-2 text-3xl font-bold text-white">4.7</h3>
                    <p className="text-sm text-white/70">Average rating across all tools</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </CompanyDashboardLayout>
  )
}

