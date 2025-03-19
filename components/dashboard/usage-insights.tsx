import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

export default function UsageInsights() {
  return (
    <Card className="mt-8 border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-xl text-white">Usage Insights</CardTitle>
        <CardDescription className="text-white/70">Analytics and insights about your tool usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Tool Usage Chart */}
          <ToolUsageChart />

          {/* Performance Metrics */}
          <PerformanceMetrics />
        </div>
      </CardContent>
    </Card>
  )
}

function ToolUsageChart() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="mb-4 text-lg font-medium text-white">Tool Usage Trends</h3>
      <div className="h-64 w-full">
        {/* Mock chart - in a real app, use a chart library */}
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
              d="M0,70 L10,65 L20,68 L30,60 L40,55 L50,45 L60,40 L70,30 L80,25 L90,20 L100,15"
              fill="none"
              stroke="url(#purple-gradient)"
              strokeWidth="2"
              className="text-purple-500"
            />

            <path
              d="M0,70 L10,65 L20,68 L30,60 L40,55 L50,45 L60,40 L70,30 L80,25 L90,20 L100,15 V100 H0 Z"
              fill="url(#lineGradient)"
              opacity="0.2"
            />
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

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-xs text-white/70">Tool Views</span>
          </div>
        </div>
        <span className="text-xs text-green-500">+24% from last month</span>
      </div>
    </div>
  )
}

function PerformanceMetrics() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="mb-4 text-lg font-medium text-white">Performance Metrics</h3>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-white/70">Tools Saved</span>
            <span className="text-sm font-medium text-white">4</span>
          </div>
          <Progress value={(4 / 20) * 100} className="h-2 bg-white/10" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-white/70">Tools Compared</span>
            <span className="text-sm font-medium text-white">8</span>
          </div>
          <Progress value={(8 / 20) * 100} className="h-2 bg-white/10" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-white/70">Categories Explored</span>
            <span className="text-sm font-medium text-white">3</span>
          </div>
          <Progress value={(3 / 8) * 100} className="h-2 bg-white/10" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-white/70">Profile Completion</span>
            <span className="text-sm font-medium text-white">75%</span>
          </div>
          <Progress value={75} className="h-2 bg-white/10" />
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-white/10 p-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm text-white">Your tool usage is growing!</span>
        </div>
        <p className="mt-1 text-xs text-white/70">You're in the top 20% of active users on our platform.</p>
      </div>
    </div>
  )
}

