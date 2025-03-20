import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Bookmark, Check, Plus, Share2, ExternalLink, X } from "lucide-react"
import type { Tool } from "@/types/tool"

interface ToolDetailSheetProps {
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
  detailTool: Tool | null
  savedTools: number[]
  removeSavedTool: (toolId: number) => void
  setSavedTools: (tools: number[]) => void
  toggleToolSelection: (toolId: number) => void
  selectedTools: number[]
}

export default function ToolDetailSheet({
  isDetailOpen,
  setIsDetailOpen,
  detailTool,
  savedTools,
  removeSavedTool,
  setSavedTools,
  toggleToolSelection,
  selectedTools,
}: ToolDetailSheetProps) {
  if (!detailTool) return null

  return (
    <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <SheetContent className="w-full max-w-md border-white/10 bg-black p-0 sm:max-w-xl">
        <div className="flex h-full flex-col overflow-hidden">
          <SheetHeader className="border-b border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={detailTool.image || "/placeholder.svg?height=48&width=48"}
                  alt={detailTool.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <SheetTitle className="text-xl text-white">{detailTool.name}</SheetTitle>
                <SheetDescription className="text-white/70">{detailTool.category}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <span className="text-lg font-medium text-yellow-500">{detailTool.rating}</span>
                <Star className="ml-1 h-5 w-5 fill-yellow-500 text-yellow-500" />
              </div>

              <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{detailTool.category}</Badge>

              {detailTool.price.hasFree && (
                <Badge className="bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
              )}

              <span className="text-sm text-white/70">${detailTool.price.monthly}/mo</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-white">Description</h3>
              <p className="text-white/70">{detailTool.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium text-white">Key Features</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(detailTool.features).map(([feature, hasFeature]) => (
                  <div key={feature} className="flex items-center gap-2">
                    {hasFeature ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                    <span className={`text-sm ${hasFeature ? "text-white" : "text-white/50 line-through"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium text-white">Performance</h3>
              <div className="space-y-3">
                {Object.entries(detailTool.performance).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </span>
                      <span className="text-sm font-medium text-white">{value}%</span>
                    </div>
                    <Progress value={Number(value)} className="h-2 bg-white/10" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium text-white">Pricing</h3>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-white">Monthly</span>
                  <span className="text-lg font-bold text-white">${detailTool.price.monthly}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium text-white">Annual</span>
                  <div>
                    <span className="text-lg font-bold text-white">${detailTool.price.yearly}</span>
                    <span className="ml-1 text-xs text-green-500">
                      Save ${detailTool.price.monthly * 12 - detailTool.price.yearly}
                    </span>
                  </div>
                </div>
                {detailTool.price.hasFree && (
                  <div className="rounded-lg bg-green-500/10 p-2 text-center text-sm text-green-500">
                    Free plan available with limited features
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>

              <Button
                variant="outline"
                className="flex-1 border-white/10 hover:text-white hover:bg-white/10"
                onClick={() => {
                  if (savedTools.includes(detailTool.id)) {
                    removeSavedTool(detailTool.id)
                  } else {
                    setSavedTools([...savedTools, detailTool.id])
                  }
                }}
              >
                <Bookmark
                  className="mr-2 h-4 w-4"
                  fill={savedTools.includes(detailTool.id) ? "currentColor" : "none"}
                />
                {savedTools.includes(detailTool.id) ? "Saved" : "Save"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-white/10 hover:text-white hover:bg-white/10"
                onClick={() => toggleToolSelection(detailTool.id)}
              >
                {selectedTools.includes(detailTool.id) ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>

              <Button variant="outline" size="icon" className="border-white/10 hover:text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

