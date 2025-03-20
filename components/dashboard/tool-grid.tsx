import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Check, Plus, Trash2, ArrowRight } from "lucide-react"
import type { Tool } from "@/types/tool"
import Link from "next/link"

interface ToolGridProps {
  toolsData: Tool[]
  selectedTools: number[]
  toggleToolSelection: (toolId: number) => void
  savedTools: number[]
  setSavedTools: (tools: number[]) => void
  removeSavedTool: (toolId: number) => void
  openToolDetail: (toolId: number) => void
  showRemoveButton: boolean
}

export default function ToolGrid({
  toolsData,
  selectedTools,
  toggleToolSelection,
  savedTools,
  setSavedTools,
  removeSavedTool,
  openToolDetail,
  showRemoveButton,
}: ToolGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {toolsData.map((tool) => (
        <div
          key={tool.id}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10"
        >
          <div className="absolute right-3 top-3 z-10 flex gap-1">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={savedTools.includes(tool.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{tool.category}</Badge>
            </div>

            <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
              <Image
                src={tool.image || "/placeholder.svg?height=300&width=300"}
                alt={tool.name}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <h3 className="mb-2 text-xl font-bold text-white flex justify-between">{tool.name}
              <div className="flex items-center">
                <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                <Star className="ml-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
              </div>
            </h3>
            <p className="mb-4 text-sm text-white/70 line-clamp-2">{tool.description}</p>

            <Button
              className="w-full bg-white/10 text-white hover:bg-white/20"
              variant="outline"
              onClick={() => openToolDetail(tool.id)}
            >

              <span>View Details</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

