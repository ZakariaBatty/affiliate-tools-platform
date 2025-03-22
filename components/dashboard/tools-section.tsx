import type React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Grid, List, Filter, BarChart3, Bookmark } from "lucide-react"
import type { Tool } from "@/types/tool"
import ToolGrid from "./tool-grid"
import ToolList from "./tool-list"

interface ToolsSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  selectedTools: number[]
  setIsCompareOpen: (open: boolean) => void
  savedToolsData: Tool[]
  recentToolsData: Tool[]
  recommendedToolsData: Tool[]
  toggleToolSelection: (toolId: number) => void
  removeSavedTool: (toolId: number) => void
  openToolDetail: (toolId: number) => void
  savedTools: number[]
  setSavedTools: (tools: number[]) => void
}

export default function ToolsSection({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  selectedTools,
  setIsCompareOpen,
  savedToolsData,
  recentToolsData,
  recommendedToolsData,
  toggleToolSelection,
  removeSavedTool,
  openToolDetail,
  savedTools,
  setSavedTools,
}: ToolsSectionProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-xl text-white">My Tools</CardTitle>
            <CardDescription className="text-white/70">Manage your saved tools and recent views</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border border-white/10 bg-white/5">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" className="border-white/10 hover:text-white hover:bg-white/10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>

            {selectedTools.length > 0 && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                onClick={() => setIsCompareOpen(true)}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Compare ({selectedTools.length})
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="saved">Saved Tools</TabsTrigger>
            <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          <TabsContent value="saved" className="mt-0">
            {savedToolsData.length === 0 ? (
              <EmptyState
                icon={<Bookmark className="mb-2 h-10 w-10 text-white/30" />}
                title="No saved tools yet"
                description="Start exploring and save tools that interest you"
                buttonText="Explore Tools"
                buttonLink="/tools"
              />
            ) : viewMode === "grid" ? (
              <ToolGrid
                toolsData={savedToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={true}
              />
            ) : (
              <ToolList
                toolsData={savedToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={true}
              />
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            {recentToolsData.length === 0 ? (
              <EmptyState
                icon={<Bookmark className="mb-2 h-10 w-10 text-white/30" />}
                title="No recently viewed tools"
                description="Tools you view will appear here"
                buttonText="Explore Tools"
                buttonLink="/tools"
              />
            ) : viewMode === "grid" ? (
              <ToolGrid
                toolsData={recentToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={false}
              />
            ) : (
              <ToolList
                toolsData={recentToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={false}
              />
            )}
          </TabsContent>

          <TabsContent value="recommended" className="mt-0">
            {viewMode === "grid" ? (
              <ToolGrid
                toolsData={recommendedToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={false}
              />
            ) : (
              <ToolList
                toolsData={recommendedToolsData}
                selectedTools={selectedTools}
                toggleToolSelection={toggleToolSelection}
                savedTools={savedTools}
                setSavedTools={setSavedTools}
                removeSavedTool={removeSavedTool}
                openToolDetail={openToolDetail}
                showRemoveButton={false}
              />
            )}

            <div className="mt-6 flex justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                View More Recommendations
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

function EmptyState({ icon, title, description, buttonText, buttonLink }: EmptyStateProps) {
  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-6 text-center">
      {icon}
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-1 text-white/70">{description}</p>
      <Link href={buttonLink}>
        <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}

