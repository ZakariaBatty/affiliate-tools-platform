"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Activity, Users, Clock, DollarSign, Star, RefreshCw, X, Check } from "lucide-react"

// Sample data for tools performance
const toolsPerformanceData = [
  {
    id: 1,
    name: "AI Writer Pro",
    category: "AI Tools",
    metrics: {
      userSatisfaction: 92,
      reliability: 95,
      speedScore: 88,
      supportQuality: 85,
      valueForMoney: 90,
    },
    usage: {
      activeUsers: 12500,
      avgTimeSpent: "45 min/day",
      completedTasks: 78500,
      roi: "320%",
    },
    trends: {
      monthly: [78, 82, 85, 89, 91, 92],
      quarterly: [75, 82, 88, 92],
    },
    comparison: {
      industry: 85,
      similar: 88,
    },
  },
  {
    id: 2,
    name: "Analytics Master",
    category: "Analytics",
    metrics: {
      userSatisfaction: 89,
      reliability: 92,
      speedScore: 94,
      supportQuality: 82,
      valueForMoney: 85,
    },
    usage: {
      activeUsers: 9800,
      avgTimeSpent: "60 min/day",
      completedTasks: 45600,
      roi: "280%",
    },
    trends: {
      monthly: [75, 79, 82, 85, 87, 89],
      quarterly: [72, 78, 84, 89],
    },
    comparison: {
      industry: 82,
      similar: 85,
    },
  },
  {
    id: 3,
    name: "MarketBoost",
    category: "Marketing",
    metrics: {
      userSatisfaction: 95,
      reliability: 90,
      speedScore: 85,
      supportQuality: 92,
      valueForMoney: 94,
    },
    usage: {
      activeUsers: 15200,
      avgTimeSpent: "52 min/day",
      completedTasks: 92300,
      roi: "350%",
    },
    trends: {
      monthly: [82, 85, 88, 90, 93, 95],
      quarterly: [80, 85, 90, 95],
    },
    comparison: {
      industry: 88,
      similar: 90,
    },
  },
  {
    id: 4,
    name: "TaskFlow",
    category: "Productivity",
    metrics: {
      userSatisfaction: 88,
      reliability: 93,
      speedScore: 90,
      supportQuality: 85,
      valueForMoney: 92,
    },
    usage: {
      activeUsers: 18500,
      avgTimeSpent: "38 min/day",
      completedTasks: 124500,
      roi: "290%",
    },
    trends: {
      monthly: [76, 80, 83, 85, 87, 88],
      quarterly: [74, 80, 85, 88],
    },
    comparison: {
      industry: 84,
      similar: 86,
    },
  },
  {
    id: 5,
    name: "DesignAI",
    category: "Design",
    metrics: {
      userSatisfaction: 87,
      reliability: 85,
      speedScore: 82,
      supportQuality: 80,
      valueForMoney: 88,
    },
    usage: {
      activeUsers: 7800,
      avgTimeSpent: "55 min/day",
      completedTasks: 38600,
      roi: "240%",
    },
    trends: {
      monthly: [72, 75, 79, 82, 85, 87],
      quarterly: [70, 76, 82, 87],
    },
    comparison: {
      industry: 80,
      similar: 83,
    },
  },
  {
    id: 6,
    name: "CodeAssist",
    category: "Development",
    metrics: {
      userSatisfaction: 91,
      reliability: 89,
      speedScore: 95,
      supportQuality: 83,
      valueForMoney: 90,
    },
    usage: {
      activeUsers: 11200,
      avgTimeSpent: "65 min/day",
      completedTasks: 67800,
      roi: "310%",
    },
    trends: {
      monthly: [80, 83, 86, 88, 90, 91],
      quarterly: [78, 84, 88, 91],
    },
    comparison: {
      industry: 86,
      similar: 89,
    },
  },
]

// Mock chart components
const BarChart = ({ data }: { data: any }) => (
  <div className="h-64 w-full rounded-lg bg-white/5 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-sm font-medium text-white">Performance Metrics</h4>
      <Badge variant="outline" className="text-xs text-white/70">
        Last 30 days
      </Badge>
    </div>
    <div className="flex h-[calc(100%-2rem)] items-end justify-between gap-2 pt-4">
      {Object.entries(data.metrics).map(([key, value], index) => (
        <div key={key} className="flex flex-1 flex-col items-center">
          <div
            className="w-full rounded-t-sm bg-gradient-to-t from-purple-600 to-blue-500"
            style={{ height: `${Number(value)}%` }}
          />
          <span className="mt-2 text-xs text-white/70">
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")}
          </span>
        </div>
      ))}
    </div>
  </div>
)

const LineChart = ({ data }: { data: any }) => (
  <div className="h-64 w-full rounded-lg bg-white/5 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-sm font-medium text-white">Satisfaction Trend</h4>
      <Badge variant="outline" className="text-xs text-white/70">
        Last 6 months
      </Badge>
    </div>
    <div className="relative h-[calc(100%-2rem)]">
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
          d={`M0,${100 - data.trends.monthly[0]} ${data.trends.monthly
            .map(
              (value: number, index: number) =>
                `L${(index + 1) * (100 / (data.trends.monthly.length - 1))},${100 - value}`,
            )
            .join(" ")}`}
          fill="none"
          stroke="url(#purple-gradient)"
          strokeWidth="2"
          className="text-purple-500"
        />

        <path
          d={`M0,${100 - data.trends.monthly[0]} ${data.trends.monthly
            .map(
              (value: number, index: number) =>
                `L${(index + 1) * (100 / (data.trends.monthly.length - 1))},${100 - value}`,
            )
            .join(" ")} V100 H0 Z`}
          fill="url(#lineGradient)"
          opacity="0.2"
        />

        {data.trends.monthly.map((value: number, index: number) => (
          <circle
            key={index}
            cx={`${index * (100 / (data.trends.monthly.length - 1))}`}
            cy={`${100 - value}`}
            r="2"
            className="fill-purple-500"
          />
        ))}
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/50">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  </div>
)

const PieChart = ({ data }: { data: any }) => (
  <div className="h-64 w-full rounded-lg bg-white/5 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-sm font-medium text-white">Metric Distribution</h4>
      <Badge variant="outline" className="text-xs text-white/70">
        Current
      </Badge>
    </div>
    <div className="flex h-[calc(100%-2rem)] items-center justify-center">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(147, 51, 234)" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" />
            </linearGradient>
          </defs>

          {Object.entries(data.metrics).map(([key, value], index) => {
            const total = Object.values(data.metrics).reduce((sum: any, val: any) => sum + Number(val), 0)
            const percentage = (Number(value) / total) * 100
            const startAngle =
              index === 0
                ? 0
                : Object.entries(data.metrics)
                    .slice(0, index)
                    .reduce((sum, [_, val]) => {
                      return sum + (Number(val) / total) * 360
                    }, 0)
            const endAngle = startAngle + (percentage / 100) * 360

            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

            return (
              <path
                key={key}
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={`hsl(${index * 60}, 70%, 60%)`}
                stroke="#000"
                strokeWidth="1"
              />
            )
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold text-white">
              {Math.round(Object.values(data.metrics).reduce((sum: any, val: any) => sum + Number(val), 0) / 5)}%
            </span>
            <span className="block text-xs text-white/70">Average</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const RadarChart = ({ data }: { data: any }) => (
  <div className="h-64 w-full rounded-lg bg-white/5 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-sm font-medium text-white">Performance Radar</h4>
      <Badge variant="outline" className="text-xs text-white/70">
        vs Industry
      </Badge>
    </div>
    <div className="flex h-[calc(100%-2rem)] items-center justify-center">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {/* Background circles */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.1)" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.1)" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.1)" />

          {/* Axes */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.1)" />
          <line x1="26.5" y1="26.5" x2="73.5" y2="73.5" stroke="rgba(255,255,255,0.1)" />
          <line x1="26.5" y1="73.5" x2="73.5" y2="26.5" stroke="rgba(255,255,255,0.1)" />

          {/* Data points */}
          {Object.entries(data.metrics).map(([key, value], index) => {
            const angle = index * 72 * (Math.PI / 180)
            const radius = (Number(value) / 100) * 40
            const x = 50 + radius * Math.cos(angle - Math.PI / 2)
            const y = 50 + radius * Math.sin(angle - Math.PI / 2)

            return <circle key={key} cx={x} cy={y} r="2" fill="#9333ea" />
          })}

          {/* Data polygon */}
          <polygon
            points={Object.entries(data.metrics)
              .map(([key, value], index) => {
                const angle = index * 72 * (Math.PI / 180)
                const radius = (Number(value) / 100) * 40
                const x = 50 + radius * Math.cos(angle - Math.PI / 2)
                const y = 50 + radius * Math.sin(angle - Math.PI / 2)

                return `${x},${y}`
              })
              .join(" ")}
            fill="rgba(147, 51, 234, 0.2)"
            stroke="#9333ea"
            strokeWidth="1"
          />

          {/* Industry average */}
          <polygon
            points={Object.entries(data.metrics)
              .map(([key], index) => {
                const angle = index * 72 * (Math.PI / 180)
                const radius = (data.comparison.industry / 100) * 40
                const x = 50 + radius * Math.cos(angle - Math.PI / 2)
                const y = 50 + radius * Math.sin(angle - Math.PI / 2)

                return `${x},${y}`
              })
              .join(" ")}
            fill="none"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-white/70">Tool</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-white/70">Industry Avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function TrackPerformance() {
  const [selectedTool, setSelectedTool] = useState<number>(1)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [trackedTools, setTrackedTools] = useState<number[]>([1, 3, 4])

  // Get the selected tool data
  const selectedToolData = toolsPerformanceData.find((tool) => tool.id === selectedTool)

  // Get tracked tools data
  const trackedToolsData = toolsPerformanceData.filter((tool) => trackedTools.includes(tool.id))

  // Function to add a tool to tracking
  const addToolToTracking = (toolId: number) => {
    if (!trackedTools.includes(toolId)) {
      setTrackedTools([...trackedTools, toolId])
    }
  }

  // Function to remove a tool from tracking
  const removeToolFromTracking = (toolId: number) => {
    setTrackedTools(trackedTools.filter((id) => id !== toolId))
  }

  return (
    <section className="bg-gradient-to-b from-black to-black/95 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Track Performance</h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Monitor how your tools are performing with detailed analytics and insights
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-white">Performance Dashboard</h3>
              <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                {trackedTools.length} Tools Tracked
              </Badge>
            </div>

            <div className="flex gap-2">
              <Select value={selectedTool.toString()} onValueChange={(value) => setSelectedTool(Number(value))}>
                <SelectTrigger className="w-[200px] border-white/10 bg-white/10 text-white">
                  <SelectValue placeholder="Select a tool" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  {toolsPerformanceData.map((tool) => (
                    <SelectItem key={tool.id} value={tool.id.toString()}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    <Activity className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedToolData?.name} Performance</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Detailed performance metrics and analytics for {selectedToolData?.name}.
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                    <TabsList className="grid w-full grid-cols-3 bg-white/10">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="trends">Trends</TabsTrigger>
                      <TabsTrigger value="comparison">Comparison</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Performance Metrics</CardTitle>
                            <CardDescription className="text-white/70">Key performance indicators</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {selectedToolData &&
                                Object.entries(selectedToolData.metrics).map(([key, value]) => (
                                  <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-white/70">
                                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                                        <div
                                          className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                                          style={{ width: `${value}%` }}
                                        />
                                      </div>
                                      <span className="text-sm font-medium text-white">{value}%</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Usage Statistics</CardTitle>
                            <CardDescription className="text-white/70">
                              How users are engaging with the tool
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              {selectedToolData &&
                                Object.entries(selectedToolData.usage).map(([key, value]) => (
                                  <div key={key} className="rounded-lg bg-white/10 p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                      {key === "activeUsers" && <Users className="h-4 w-4 text-purple-500" />}
                                      {key === "avgTimeSpent" && <Clock className="h-4 w-4 text-blue-500" />}
                                      {key === "completedTasks" && <Check className="h-4 w-4 text-green-500" />}
                                      {key === "roi" && <DollarSign className="h-4 w-4 text-yellow-500" />}
                                      <span className="text-xs text-white/70">
                                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                      </span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                      <span className="text-xl font-bold text-white">{value}</span>
                                      <span className="flex items-center text-xs text-green-500">
                                        <ArrowUpRight className="h-3 w-3" />
                                        +5.2%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="trends" className="mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Monthly Trends</CardTitle>
                            <CardDescription className="text-white/70">
                              Performance over the last 6 months
                            </CardDescription>
                          </CardHeader>
                          <CardContent>{selectedToolData && <LineChart data={selectedToolData} />}</CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Quarterly Performance</CardTitle>
                            <CardDescription className="text-white/70">Performance by quarter</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 w-full">
                              <div className="flex h-full flex-col justify-end">
                                <div className="flex h-[calc(100%-2rem)] items-end justify-around">
                                  {selectedToolData &&
                                    selectedToolData.trends.quarterly.map((value, index) => (
                                      <div key={index} className="flex w-16 flex-col items-center">
                                        <div
                                          className="w-12 rounded-t-sm bg-gradient-to-t from-purple-600 to-blue-500"
                                          style={{ height: `${value}%` }}
                                        />
                                        <span className="mt-2 text-xs text-white/70">Q{index + 1}</span>
                                      </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center justify-between px-4">
                                  <span className="text-xs text-white/70">
                                    Start: {selectedToolData?.trends.quarterly[0]}%
                                  </span>
                                  <span className="text-xs text-white/70">
                                    Current:{" "}
                                    {selectedToolData?.trends.quarterly[selectedToolData.trends.quarterly.length - 1]}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="comparison" className="mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Industry Comparison</CardTitle>
                            <CardDescription className="text-white/70">
                              How this tool compares to industry standards
                            </CardDescription>
                          </CardHeader>
                          <CardContent>{selectedToolData && <RadarChart data={selectedToolData} />}</CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5 text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Competitive Analysis</CardTitle>
                            <CardDescription className="text-white/70">
                              Performance against similar tools
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/70">Industry Average</span>
                                  <span className="text-sm font-medium text-white">
                                    {selectedToolData?.comparison.industry}%
                                  </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className="h-full bg-blue-500/50"
                                    style={{ width: `${selectedToolData?.comparison.industry}%` }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/70">Similar Tools Average</span>
                                  <span className="text-sm font-medium text-white">
                                    {selectedToolData?.comparison.similar}%
                                  </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className="h-full bg-green-500/50"
                                    style={{ width: `${selectedToolData?.comparison.similar}%` }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/70">{selectedToolData?.name}</span>
                                  <span className="text-sm font-medium text-white">
                                    {Math.round(
                                      Object.values(selectedToolData?.metrics || {}).reduce(
                                        (sum: any, val: any) => sum + Number(val),
                                        0,
                                      ) / 5,
                                    )}
                                    %
                                  </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                                    style={{
                                      width: `${Math.round(Object.values(selectedToolData?.metrics || {}).reduce((sum: any, val: any) => sum + Number(val), 0) / 5)}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium text-white">Performance Rating</span>
                                    <div className="flex text-yellow-500">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className="h-4 w-4"
                                          fill={
                                            i <
                                            Math.round(
                                              Object.values(selectedToolData?.metrics || {}).reduce(
                                                (sum: any, val: any) => sum + Number(val),
                                                0,
                                              ) / 100,
                                            )
                                              ? "currentColor"
                                              : "none"
                                          }
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-2xl font-bold text-white">
                                      {selectedToolData &&
                                      selectedToolData.comparison.similar <
                                        Math.round(
                                          Object.values(selectedToolData?.metrics || {}).reduce(
                                            (sum: any, val: any) => sum + Number(val),
                                            0,
                                          ) / 5,
                                        )
                                        ? "Above"
                                        : "Below"}{" "}
                                      Average
                                    </span>
                                    <span className="block text-xs text-white/70">
                                      {selectedToolData &&
                                        Math.abs(
                                          Math.round(
                                            Object.values(selectedToolData?.metrics || {}).reduce(
                                              (sum: any, val: any) => sum + Number(val),
                                              0,
                                            ) / 5,
                                          ) - selectedToolData.comparison.similar,
                                        )}
                                      %
                                      {selectedToolData &&
                                      selectedToolData.comparison.similar <
                                        Math.round(
                                          Object.values(selectedToolData?.metrics || {}).reduce(
                                            (sum: any, val: any) => sum + Number(val),
                                            0,
                                          ) / 5,
                                        )
                                        ? "better"
                                        : "worse"}{" "}
                                      than similar tools
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trackedToolsData.map((tool) => (
              <Card key={tool.id} className="border-white/10 bg-white/5 text-white">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription className="text-white/70">{tool.category}</CardDescription>
                    </div>
                    <button
                      onClick={() => removeToolFromTracking(tool.id)}
                      className="rounded-full bg-white/10 p-1 text-white/70 hover:bg-white/20 hover:text-white"
                      aria-label="Remove from tracking"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Overall Score</span>
                      <span className="text-sm font-medium text-white">
                        {Math.round(Object.values(tool.metrics).reduce((sum, val) => sum + Number(val), 0) / 5)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                        style={{
                          width: `${Math.round(Object.values(tool.metrics).reduce((sum, val) => sum + Number(val), 0) / 5)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white/10 p-2">
                      <div className="text-xs text-white/70">User Satisfaction</div>
                      <div className="text-lg font-bold text-white">{tool.metrics.userSatisfaction}%</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2">
                      <div className="text-xs text-white/70">Reliability</div>
                      <div className="text-lg font-bold text-white">{tool.metrics.reliability}%</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2">
                      <div className="text-xs text-white/70">Speed Score</div>
                      <div className="text-lg font-bold text-white">{tool.metrics.speedScore}%</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2">
                      <div className="text-xs text-white/70">Value for Money</div>
                      <div className="text-lg font-bold text-white">{tool.metrics.valueForMoney}%</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      className="w-full bg-white/10 text-white hover:bg-white/20"
                      onClick={() => {
                        setSelectedTool(tool.id)
                        setIsDetailOpen(true)
                      }}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {trackedTools.length < 4 && (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/50">
                <Select onValueChange={(value) => addToolToTracking(Number(value))}>
                  <SelectTrigger className="w-[200px] border-white/10 bg-white/10 text-white">
                    <SelectValue placeholder="Add tool to track" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    {toolsPerformanceData
                      .filter((tool) => !trackedTools.includes(tool.id))
                      .map((tool) => (
                        <SelectItem key={tool.id} value={tool.id.toString()}>
                          {tool.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription className="text-white/70">
                  Visualize key metrics for your tracked tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>{selectedToolData && <BarChart data={selectedToolData} />}</div>
                  <div>{selectedToolData && <PieChart data={selectedToolData} />}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription className="text-white/70">
                  Track how your tools are performing over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedToolData && <LineChart data={selectedToolData} />}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      <span className="text-xs text-white/70">{selectedToolData?.name}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Refresh Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

