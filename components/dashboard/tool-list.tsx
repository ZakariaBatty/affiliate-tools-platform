import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Check, Plus, Trash2, Bookmark } from "lucide-react"
import type { Tool } from "@/types/tool"

interface ToolListProps {
  toolsData: Tool[]
  selectedTools: number[]
  toggleToolSelection: (toolId: number) => void
  savedTools: number[]
  setSavedTools: (tools: number[]) => void
  removeSavedTool: (toolId: number) => void
  openToolDetail: (toolId: number) => void
  showRemoveButton: boolean
}

export default function ToolList({
  toolsData,
  selectedTools,
  toggleToolSelection,
  savedTools,
  setSavedTools,
  removeSavedTool,
  openToolDetail,
  showRemoveButton,
}: ToolListProps) {
  return (
    <div className="space-y-4">
      {toolsData.map((tool) => (
        <div
          key={tool.id}
          className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/50 hover:bg-white/10 sm:flex-row sm:items-center"
        >
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
            <Image
              src={tool.image || "/placeholder.svg?height=64&width=64"}
              alt={tool.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{tool.name}</h3>
              <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{tool.category}</Badge>
            </div>

            <p className="text-sm text-white/70 line-clamp-1">{tool.description}</p>

            <div className="mt-1 flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                <Star className="ml-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
              </div>

              <span className="text-sm text-white/50">
                ${tool.price.monthly}/mo
                {tool.price.hasFree && " (Free plan available)"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 hover:text-white hover:bg-white/10"
              onClick={() => openToolDetail(tool.id)}
            >
              Details
            </Button>

            <button
              onClick={() => toggleToolSelection(tool.id)}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${selectedTools.includes(tool.id)
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              aria-label={selectedTools.includes(tool.id) ? "Remove from comparison" : "Add to comparison"}
            >
              {selectedTools.includes(tool.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>

            {showRemoveButton ? (
              <button
                onClick={() => removeSavedTool(tool.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                aria-label="Remove from saved"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() =>
                  savedTools.includes(tool.id) ? removeSavedTool(tool.id) : setSavedTools([...savedTools, tool.id])
                }
                className={`flex h-8 w-8 items-center justify-center rounded-full ${savedTools.includes(tool.id)
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                aria-label={savedTools.includes(tool.id) ? "Remove from saved" : "Save tool"}
              >
                <Bookmark className="h-4 w-4" fill={savedTools.includes(tool.id) ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

