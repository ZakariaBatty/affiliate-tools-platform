"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = {
  daily: [
    { date: "Mon", users: 145, companies: 12 },
    { date: "Tue", users: 168, companies: 15 },
    { date: "Wed", users: 156, companies: 9 },
    { date: "Thu", users: 192, companies: 18 },
    { date: "Fri", users: 205, companies: 21 },
    { date: "Sat", users: 173, companies: 14 },
    { date: "Sun", users: 148, companies: 11 },
  ],
  weekly: [
    { date: "Week 1", users: 1245, companies: 87 },
    { date: "Week 2", users: 1380, companies: 92 },
    { date: "Week 3", users: 1520, companies: 105 },
    { date: "Week 4", users: 1680, companies: 118 },
  ],
  monthly: [
    { date: "Jan", users: 5245, companies: 342 },
    { date: "Feb", users: 5890, companies: 387 },
    { date: "Mar", users: 6420, companies: 412 },
    { date: "Apr", users: 7180, companies: 456 },
    { date: "May", users: 7840, companies: 489 },
    { date: "Jun", users: 8320, companies: 521 },
    { date: "Jul", users: 9150, companies: 567 },
    { date: "Aug", users: 9870, companies: 612 },
    { date: "Sep", users: 10540, companies: 645 },
    { date: "Oct", users: 11280, companies: 678 },
    { date: "Nov", users: 12150, companies: 712 },
    { date: "Dec", users: 13240, companies: 756 },
  ],
}

export function UserGrowthChart() {
  const [chartPeriod, setChartPeriod] = useState("monthly")
  const [chartData, setChartData] = useState("users")

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New registrations over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartData === "users" ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setChartData("users")}
            >
              Users
            </Button>
            <Button
              variant={chartData === "companies" ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setChartData("companies")}
            >
              Companies
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
              <AreaChart data={data.daily}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Area type="monotone" dataKey={chartData} stroke="#8b5cf6" fill="url(#colorUsers)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.weekly}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Area type="monotone" dataKey={chartData} stroke="#8b5cf6" fill="url(#colorUsers)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.monthly}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Area type="monotone" dataKey={chartData} stroke="#8b5cf6" fill="url(#colorUsers)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

