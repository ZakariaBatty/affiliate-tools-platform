"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, LineChart, PieChart, TrendingUp, Download, Calendar, Filter, ChevronRight } from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanyAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const [viewTab, setViewTab] = useState("overview")

  // Mock data for charts
  const viewsData = {
    "7d": [1200, 980, 1100, 1300, 1050, 1420, 1350],
    "30d": [
      950, 1050, 1000, 1200, 980, 1100, 1300, 1050, 1420, 1350, 1500, 1600, 1550, 1700, 1650, 1800, 1750, 1900, 1850,
      2000, 2100, 2050, 2200, 2150, 2300, 2250, 2400, 2350, 2500, 2450,
    ],
    "90d": Array.from({ length: 90 }, () => Math.floor(Math.random() * 1500) + 1000),
  }

  const savesData = {
    "7d": [320, 280, 350, 390, 310, 420, 380],
    "30d": Array.from({ length: 30 }, () => Math.floor(Math.random() * 400) + 250),
    "90d": Array.from({ length: 90 }, () => Math.floor(Math.random() * 500) + 200),
  }

  const conversionData = {
    "7d": [2.8, 3.1, 2.9, 3.4, 3.2, 3.6, 3.5],
    "30d": Array.from({ length: 30 }, () => Math.random() * 2 + 2),
    "90d": Array.from({ length: 90 }, () => Math.random() * 3 + 1.5),
  }

  // Mock traffic sources data
  const trafficSources = [
    { source: "Direct", percentage: 35 },
    { source: "Search", percentage: 25 },
    { source: "Referral", percentage: 20 },
    { source: "Social", percentage: 15 },
    { source: "Other", percentage: 5 },
  ]

  // Mock user demographics
  const userDemographics = [
    { country: "United States", percentage: 42 },
    { country: "United Kingdom", percentage: 15 },
    { country: "Canada", percentage: 12 },
    { country: "Australia", percentage: 8 },
    { country: "Germany", percentage: 7 },
    { country: "Other", percentage: 16 },
  ]

  // Mock device data
  const deviceData = [
    { device: "Desktop", percentage: 58 },
    { device: "Mobile", percentage: 32 },
    { device: "Tablet", percentage: 10 },
  ]

  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-white/70">Detailed insights into your tools performance</p>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "90d")} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" size="icon" className="border-white/10 hover:text-white hover:bg-white/10">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      <Tabs value={viewTab} onValueChange={setViewTab} className="mb-8">
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Views Chart */}
            <Card className="border-white/10 bg-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Views</CardTitle>
                <CardDescription className="text-white/70">Total views over time</CardDescription>
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
                      <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                      </linearGradient>

                      <path
                        d={`M0,${100 - (viewsData[timeRange][0] / 3000) * 100} ${viewsData[timeRange]
                          .map((value, index) => {
                            const x = (index / (viewsData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 3000) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />

                      <path
                        d={`M0,${100 - (viewsData[timeRange][0] / 3000) * 100} ${viewsData[timeRange]
                          .map((value, index) => {
                            const x = (index / (viewsData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 3000) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")} V100 H0 Z`}
                        fill="url(#viewsGradient)"
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
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-white/70">Views</span>
                    </div>
                  </div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>+15% from last period</span>
                  </div>
                </div>
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
            {/* Saves Chart */}
            <Card className="border-white/10 bg-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Saves</CardTitle>
                <CardDescription className="text-white/70">Number of times your tools were saved</CardDescription>
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
                      <linearGradient id="savesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0" />
                      </linearGradient>

                      <path
                        d={`M0,${100 - (savesData[timeRange][0] / 500) * 100} ${savesData[timeRange]
                          .map((value, index) => {
                            const x = (index / (savesData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 500) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")}`}
                        fill="none"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />

                      <path
                        d={`M0,${100 - (savesData[timeRange][0] / 500) * 100} ${savesData[timeRange]
                          .map((value, index) => {
                            const x = (index / (savesData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 500) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")} V100 H0 Z`}
                        fill="url(#savesGradient)"
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
                      <span className="text-white/70">Saves</span>
                    </div>
                  </div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>+8% from last period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">User Demographics</CardTitle>
                <CardDescription className="text-white/70">Geographic distribution of users</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mt-4 space-y-3">
                  {userDemographics.map((country) => (
                    <div key={country.country}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-white">{country.country}</span>
                        <span className="text-sm font-medium text-white">{country.percentage}%</span>
                      </div>
                      <Progress value={country.percentage} className="h-1.5 bg-white/10" />
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="mt-4 w-full text-white/70 hover:bg-white/10 hover:text-white">
                  View Detailed Report
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Conversion Rate Chart */}
            <Card className="border-white/10 bg-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Conversion Rate</CardTitle>
                <CardDescription className="text-white/70">Percentage of views that convert to saves</CardDescription>
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
                      <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                      </linearGradient>

                      <path
                        d={`M0,${100 - (conversionData[timeRange][0] / 5) * 100} ${conversionData[timeRange]
                          .map((value, index) => {
                            const x = (index / (conversionData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 5) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />

                      <path
                        d={`M0,${100 - (conversionData[timeRange][0] / 5) * 100} ${conversionData[timeRange]
                          .map((value, index) => {
                            const x = (index / (conversionData[timeRange].length - 1)) * 100
                            const y = 100 - (value / 5) * 100
                            return `L${x},${y}`
                          })
                          .join(" ")} V100 H0 Z`}
                        fill="url(#conversionGradient)"
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
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-white/70">Conversion Rate</span>
                    </div>
                  </div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>+2.1% from last period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Device Breakdown</CardTitle>
                <CardDescription className="text-white/70">Types of devices used by visitors</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex h-[220px] items-center justify-center">
                  <BarChart3 className="h-40 w-40 text-white/30" />
                </div>
                <div className="mt-4 space-y-3">
                  {deviceData.map((device) => (
                    <div key={device.device}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-white">{device.device}</span>
                        <span className="text-sm font-medium text-white">{device.percentage}%</span>
                      </div>
                      <Progress value={device.percentage} className="h-1.5 bg-white/10" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Traffic Analysis</CardTitle>
              <CardDescription className="text-white/70">
                Detailed breakdown of your traffic sources and patterns
              </CardDescription>
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

        <TabsContent value="demographics" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">User Demographics</CardTitle>
              <CardDescription className="text-white/70">Detailed breakdown of your user base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="relative h-full w-full flex items-center justify-center">
                  <PieChart className="h-60 w-60 text-white/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-white/50">Select a time range to view detailed data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
          <Download className="mr-2 h-4 w-4" />
          Export Analytics Report
        </Button>
      </div>
    </CompanyDashboardLayout>
  )
}

