"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = {
  daily: [
    { date: "Mon", revenue: 2145, subscriptions: 12 },
    { date: "Tue", revenue: 1968, subscriptions: 15 },
    { date: "Wed", revenue: 2356, subscriptions: 9 },
    { date: "Thu", revenue: 2592, subscriptions: 18 },
    { date: "Fri", revenue: 3105, subscriptions: 21 },
    { date: "Sat", revenue: 2873, subscriptions: 14 },
    { date: "Sun", revenue: 2148, subscriptions: 11 },
  ],
  weekly: [
    { date: "Week 1", revenue: 12450, subscriptions: 87 },
    { date: "Week 2", revenue: 13800, subscriptions: 92 },
    { date: "Week 3", revenue: 15200, subscriptions: 105 },
    { date: "Week 4", revenue: 16800, subscriptions: 118 },
  ],
  monthly: [
    { date: "Jan", revenue: 42450, subscriptions: 342 },
    { date: "Feb", revenue: 45890, subscriptions: 387 },
    { date: "Mar", revenue: 48420, subscriptions: 412 },
    { date: "Apr", revenue: 52180, subscriptions: 456 },
    { date: "May", revenue: 54840, subscriptions: 489 },
    { date: "Jun", revenue: 58320, subscriptions: 521 },
    { date: "Jul", revenue: 62150, subscriptions: 567 },
    { date: "Aug", revenue: 65870, subscriptions: 612 },
    { date: "Sep", revenue: 69540, subscriptions: 645 },
    { date: "Oct", revenue: 72280, subscriptions: 678 },
    { date: "Nov", revenue: 76150, subscriptions: 712 },
    { date: "Dec", revenue: 82240, subscriptions: 756 },
  ],
}

export function RevenueChart() {
  const [chartPeriod, setChartPeriod] = useState("monthly")
  const [chartData, setChartData] = useState("revenue")

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Revenue and subscriptions over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartData === "revenue" ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setChartData("revenue")}
            >
              Revenue
            </Button>
            <Button
              variant={chartData === "subscriptions" ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setChartData("subscriptions")}
            >
              Subscriptions
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" value={chartPeriod} onValueChange={setChartPeriod}>
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.daily}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => (chartData === "revenue" ? `$${value}` : `${value}`)}
                />
                <Tooltip
                  formatter={(value) => (chartData === "revenue" ? [`$${value}`, "Revenue"] : [value, "Subscriptions"])}
                />
                <Bar dataKey={chartData} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.weekly}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => (chartData === "revenue" ? `$${value}` : `${value}`)}
                />
                <Tooltip
                  formatter={(value) => (chartData === "revenue" ? [`$${value}`, "Revenue"] : [value, "Subscriptions"])}
                />
                <Bar dataKey={chartData} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.monthly}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => (chartData === "revenue" ? `$${value}` : `${value}`)}
                />
                <Tooltip
                  formatter={(value) => (chartData === "revenue" ? [`$${value}`, "Revenue"] : [value, "Subscriptions"])}
                />
                <Bar dataKey={chartData} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

