"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Code, LayoutDashboard, Megaphone, Search } from "lucide-react"
import Link from "next/link"

const quickAccessTools = [
  {
    id: 1,
    name: "SEO Analyzer",
    description: "Analyze your website's SEO performance and get actionable insights",
    icon: Search,
    href: "/tools/seo-analyzer",
  },
  {
    id: 2,
    name: "Social Media Scheduler",
    description: "Schedule and manage your social media posts in one place",
    icon: Megaphone,
    href: "/tools/social-media-scheduler",
  },
  {
    id: 3,
    name: "Code Editor",
    description: "Write, test, and debug code online with our code editor",
    icon: Code,
    href: "/tools/code-editor",
  },
  {
    id: 4,
    name: "Dashboard Builder",
    description: "Create custom dashboards to track your business metrics",
    icon: LayoutDashboard,
    href: "/tools/dashboard-builder",
  },
]

export default function QuickAccessTools() {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Quick Access Tools</h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Access your favorite tools quickly and easily from our curated list
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessTools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="block">
              <Card className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{tool.name}</h3>
                  <p className="text-sm text-white/70 line-clamp-2">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

