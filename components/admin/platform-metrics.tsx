"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const categoryData = [
  { name: "AI Writing", value: 35, color: "#8b5cf6" },
  { name: "Data Analysis", value: 25, color: "#3b82f6" },
  { name: "Image Generation", value: 20, color: "#10b981" },
  { name: "Video Creation", value: 15, color: "#f59e0b" },
  { name: "Audio Tools", value: 5, color: "#ef4444" },
]

const planData = [
  { name: "Free", value: 45, color: "#8b5cf6" },
  { name: "Basic", value: 30, color: "#3b82f6" },
  { name: "Pro", value: 15, color: "#10b981" },
  { name: "Enterprise", value: 10, color: "#f59e0b" },
]

const trafficData = [
  { name: "Direct", value: 30, color: "#8b5cf6" },
  { name: "Organic Search", value: 25, color: "#3b82f6" },
  { name: "Referral", value: 20, color: "#10b981" },
  { name: "Social Media", value: 15, color: "#f59e0b" },
  { name: "Email", value: 10, color: "#ef4444" },
]

export function PlatformMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Metrics</CardTitle>
        <CardDescription>Breakdown of key platform metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">Tool Categories</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <h4 className="text-lg font-medium mb-4">Tool Categories Distribution</h4>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium">{category.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="plans">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {planData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <h4 className="text-lg font-medium mb-4">Subscription Plans Distribution</h4>
                <div className="space-y-4">
                  {planData.map((plan) => (
                    <div key={plan.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: plan.color }} />
                          <span className="text-sm font-medium">{plan.name}</span>
                        </div>
                        <span className="text-sm font-medium">{plan.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${plan.value}%`,
                            backgroundColor: plan.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="traffic">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <h4 className="text-lg font-medium mb-4">Traffic Sources Distribution</h4>
                <div className="space-y-4">
                  {trafficData.map((source) => (
                    <div key={source.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }} />
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <span className="text-sm font-medium">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${source.value}%`,
                            backgroundColor: source.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

