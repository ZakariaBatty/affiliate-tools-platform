"use client"

import { useState } from "react"

import { SettingsDialog } from "@/components/dashboard/settings-dialog"
import { allTools } from "@/data/tools"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import UserSidebar from "@/components/dashboard/user-sidebar"
import ToolsSection from "@/components/dashboard/tools-section"
import UsageInsights from "@/components/dashboard/usage-insights"
import ToolDetailSheet from "@/components/dashboard/tool-detail-sheet"
import ComparisonDialog from "@/components/dashboard/comparison-dialog"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("saved")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTools, setSelectedTools] = useState<number[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [detailToolId, setDetailToolId] = useState<number | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [compareTab, setCompareTab] = useState("features")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Mock saved tools (in a real app, this would come from a database)
  const [savedTools, setSavedTools] = useState<number[]>([1, 3, 5, 11])
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([2, 4, 6])
  const [recommendations, setRecommendations] = useState<number[]>([7, 8, 9, 10, 12])

  // Get the tool data for each category
  const savedToolsData = allTools.filter((tool) => savedTools.includes(tool.id))
  const recentToolsData = allTools.filter((tool) => recentlyViewed.includes(tool.id))
  const recommendedToolsData = allTools.filter((tool) => recommendations.includes(tool.id))

  // Get the selected tool for detail view
  const detailTool = detailToolId ? allTools.find((tool) => tool.id === detailToolId) : null

  // Get the selected tools data for comparison
  const selectedToolsData = allTools.filter((tool) => selectedTools.includes(tool.id))

  // Toggle tool selection for comparison
  const toggleToolSelection = (toolId: number) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((id) => id !== toolId))
    } else {
      if (selectedTools.length < 3) {
        setSelectedTools([...selectedTools, toolId])
      }
    }
  }

  // Remove a tool from saved
  const removeSavedTool = (toolId: number) => {
    setSavedTools(savedTools.filter((id) => id !== toolId))
  }

  // Open tool detail
  const openToolDetail = (toolId: number) => {
    setDetailToolId(toolId)
    setIsDetailOpen(true)

    // Add to recently viewed if not already there
    if (!recentlyViewed.includes(toolId)) {
      setRecentlyViewed([toolId, ...recentlyViewed].slice(0, 5))
    }
  }

  // Calculate usage statistics
  const usageStats = {
    savedTools: savedTools.length,
    viewedTools: recentlyViewed.length,
    comparedTools: 8, // Mock data
    totalCategories: Array.from(
      new Set(allTools.filter((tool) => savedTools.includes(tool.id)).map((tool) => tool.category)),
    ).length,
  }

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    plan: "Pro",
    joinDate: "Jan 2023",
  }

  // Mock activity data
  const activityData = [
    { action: "Saved", tool: "DataViz", date: "2 hours ago" },
    { action: "Compared", tool: "AI Writer Pro with ChatBot Builder", date: "Yesterday" },
    { action: "Viewed", tool: "MarketBoost", date: "2 days ago" },
    { action: "Saved", tool: "CodeAssist", date: "1 week ago" },
  ]

  return (
    <DashboardLayout>
      <DashboardHeader setIsSettingsOpen={setIsSettingsOpen} />

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <UserSidebar
          userData={userData}
          usageStats={usageStats}
          activityData={activityData}
          savedToolsData={savedToolsData}
        />

        {/* Main Content */}
        <div className="lg:col-span-3">
          <ToolsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedTools={selectedTools}
            setIsCompareOpen={setIsCompareOpen}
            savedToolsData={savedToolsData}
            recentToolsData={recentToolsData}
            recommendedToolsData={recommendedToolsData}
            toggleToolSelection={toggleToolSelection}
            removeSavedTool={removeSavedTool}
            openToolDetail={openToolDetail}
            savedTools={savedTools}
            setSavedTools={setSavedTools}
          />

          <UsageInsights />
        </div>
      </div>

      {/* Tool Detail Sheet */}
      <ToolDetailSheet
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        detailTool={detailTool || null}
        savedTools={savedTools}
        removeSavedTool={removeSavedTool}
        setSavedTools={setSavedTools}
        toggleToolSelection={toggleToolSelection}
        selectedTools={selectedTools}
      />

      {/* Comparison Dialog */}
      <ComparisonDialog
        isCompareOpen={isCompareOpen}
        setIsCompareOpen={setIsCompareOpen}
        compareTab={compareTab}
        setCompareTab={setCompareTab}
        selectedToolsData={selectedToolsData}
        allTools={allTools}
      />

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </DashboardLayout>
  )
}

