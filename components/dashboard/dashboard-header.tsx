"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, Settings } from "lucide-react"

interface DashboardHeaderProps {
  setIsSettingsOpen: (open: boolean) => void
}

export default function DashboardHeader({ setIsSettingsOpen }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <p className="text-white/70">Manage your saved tools and preferences</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search your tools..."
            className="w-full rounded-md border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <Button variant="outline" size="icon" className="border-white/10 hover:text-white hover:bg-white/10">
          <Bell className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="border-white/10  hover:bg-white/10 hover:text-white"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

