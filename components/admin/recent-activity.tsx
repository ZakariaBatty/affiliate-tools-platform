import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, UserPlus, PenToolIcon as Tool, CreditCard, MessageSquare, FileText, Building2 } from "lucide-react"

export function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      type: "user_signup",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      time: "10 minutes ago",
      description: "New user registered",
      icon: <UserPlus className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      type: "tool_added",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      time: "32 minutes ago",
      description: "Added new AI tool: 'SmartWrite Pro'",
      icon: <Tool className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      type: "payment",
      user: {
        name: "Alex Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AR",
      },
      time: "1 hour ago",
      description: "Subscription payment received: $49.99",
      icon: <CreditCard className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: "comment",
      user: {
        name: "Emily Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      time: "2 hours ago",
      description: "Left a review on 'DataViz AI'",
      icon: <MessageSquare className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 5,
      type: "blog_post",
      user: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JW",
      },
      time: "3 hours ago",
      description: "Published new blog post: 'Top 10 AI Tools for 2025'",
      icon: <FileText className="h-4 w-4 text-pink-500" />,
    },
    {
      id: 6,
      type: "company_signup",
      user: {
        name: "TechNova Inc.",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TN",
      },
      time: "5 hours ago",
      description: "New company registered",
      icon: <Building2 className="h-4 w-4 text-indigo-500" />,
    },
  ]

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            View all
          </Button>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.user.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">{activity.icon}</span>
                  <span>{activity.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

