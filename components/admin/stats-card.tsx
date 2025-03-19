import {
  Users,
  Building,
  PenToolIcon as Tool,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Eye,
  ThumbsUp,
  Clock,
  FileText,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
  icon: string
}

export function StatsCard({ title, value, change, trend, description, icon }: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-5 w-5 text-purple-500" />
      case "buildings":
        return <Building className="h-5 w-5 text-blue-500" />
      case "tool":
        return <Tool className="h-5 w-5 text-green-500" />
      case "dollar-sign":
        return <DollarSign className="h-5 w-5 text-amber-500" />
      case "chart":
        return <BarChart2 className="h-5 w-5 text-indigo-500" />
      case "views":
        return <Eye className="h-5 w-5 text-cyan-500" />
      case "likes":
        return <ThumbsUp className="h-5 w-5 text-pink-500" />
      case "time":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "posts":
        return <FileText className="h-5 w-5 text-violet-500" />
      case "tags":
        return <Tag className="h-5 w-5 text-rose-500" />
      default:
        return <BarChart2 className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-muted p-2">{getIcon()}</div>
        <div
          className={cn(
            "flex items-center text-xs font-medium",
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500",
          )}
        >
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : trend === "down" ? (
            <TrendingDown className="mr-1 h-3 w-3" />
          ) : null}
          {change}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

