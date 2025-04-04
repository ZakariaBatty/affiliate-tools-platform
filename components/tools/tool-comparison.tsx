"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { allTools } from "@/data/tools"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Check, Star, X } from "lucide-react"

type ToolComparisonProps = {
  currentTool: any
  relatedTools: any[]
}

export function ToolComparison({ currentTool, relatedTools }: ToolComparisonProps) {
  const router = useRouter()

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">Compare with Similar Tools</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-3 text-left text-sm font-medium text-white/70">Tool</th>
              <th className="p-3 text-left text-sm font-medium text-white/70">Rating</th>
              <th className="p-3 text-left text-sm font-medium text-white/70">Price</th>
              <th className="p-3 text-left text-sm font-medium text-white/70">Free Plan</th>
              <th className="p-3 text-left text-sm font-medium text-white/70">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Current tool */}
            <tr className="border-b border-white/10 bg-purple-500/10">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-md">
                    <Image
                      src={currentTool.image || "/placeholder.svg"}
                      alt={`Logo of ${currentTool.name}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-white">{currentTool.name}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center">
                  <span className="mr-1 text-white">{currentTool.avgRating}</span>
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
              </td>
              <td className="p-3 text-white">${currentTool.pricing.startingPrice}/mo</td>
              <td className="p-3">
                {currentTool.pricing.free ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </td>
              <td className="p-3">
                <Badge className="bg-purple-600 text-white">Current</Badge>
              </td>
            </tr>

            {/* Similar tools */}
            {relatedTools
              .filter((t) => {
                const toolCategoryIds = t.categories?.map((c: any) => c.category?.id) || [];
                const currentCategoryIds = currentTool.categories?.map((c: any) => c.category?.id) || [];

                const hasMatchingCategory = toolCategoryIds.some((id: any) =>
                  currentCategoryIds.includes(id)
                );

                return hasMatchingCategory && t.id !== currentTool.id;
              })
              .slice(0, 3)
              .map((similarTool) => (
                <tr key={similarTool.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 overflow-hidden rounded-md">
                        <Image
                          src={similarTool.image || "/placeholder.svg"}
                          alt={`Logo of ${similarTool.name}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-white">{similarTool.name}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="mr-1 text-white">{similarTool.avgRating}</span>
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    </div>
                  </td>
                  <td className="p-3 text-white">
                    ${similarTool.pricing?.startingPrice ?? "—"}/mo
                  </td>
                  <td className="p-3">
                    {similarTool.pricing?.free ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:text-white hover:bg-white/10"
                      onClick={() => router.push(`/tools/${similarTool.slug}`)}
                    >
                      Compare
                    </Button>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="border-white/10 hover:text-white hover:bg-white/10"
          onClick={() => router.push(`/tools`)}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View All Tools
        </Button>
      </div>
    </div>
  )
}

