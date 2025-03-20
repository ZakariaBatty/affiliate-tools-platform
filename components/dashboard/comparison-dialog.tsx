import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Download, Star } from "lucide-react"
import { Tool } from "@/types/tool"

interface ComparisonDialogProps {
  isCompareOpen: boolean
  setIsCompareOpen: (open: boolean) => void
  compareTab: string
  setCompareTab: (tab: string) => void
  selectedToolsData: Tool[]
  allTools: Tool[]
}

export default function ComparisonDialog({
  isCompareOpen,
  setIsCompareOpen,
  compareTab,
  setCompareTab,
  selectedToolsData,
  allTools,
}: ComparisonDialogProps) {
  // Get all features from all tools for comparison
  const allFeatures = Array.from(new Set(allTools.flatMap((tool) => Object.keys(tool.features))))

  return (
    <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
      <DialogContent className="max-w-[90vw] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tool Comparison</DialogTitle>
          <DialogDescription className="text-white/70">
            Compare features, pricing, and performance metrics side by side.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={compareTab} onValueChange={setCompareTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-4">
            <div className="rounded-lg border border-white/10">
              <div className="max-h-[70vh] overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-left text-sm font-medium text-white/70">Feature</th>
                      {selectedToolsData.map((tool) => (
                        <th key={tool.id} className="p-3 text-center text-sm font-medium text-white/70">
                          {tool.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-3 font-medium text-white">Pricing</td>
                      {selectedToolsData.map((tool) => (
                        <td key={`${tool.id}-price`} className="p-3 text-center text-white">
                          <div className="flex flex-col items-center">
                            <span>${tool.price.monthly}/mo</span>
                            <span className="text-xs text-white/50">${tool.price.yearly}/yr</span>
                            {tool.price.hasFree && (
                              <Badge className="mt-1 bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {allFeatures.map((feature) => (
                      <tr key={feature} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-3 font-medium text-white">{feature}</td>
                        {selectedToolsData.map((tool) => (
                          <td key={`${tool.id}-${feature}`} className="p-3 text-center text-white">
                            {tool.features[feature as keyof typeof tool.features] ? (
                              <Check className="mx-auto h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-red-500" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="rounded-lg border border-white/10">
              <div className="max-h-[70vh] overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-left text-sm font-medium text-white/70">Metric</th>
                      {selectedToolsData.map((tool) => (
                        <th key={tool.id} className="p-3 text-center text-sm font-medium text-white/70">
                          {tool.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(allTools[0].performance).map((metric) => (
                      <tr key={metric} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-3 font-medium text-white">
                          {metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </td>
                        {selectedToolsData.map((tool) => (
                          <td key={`${tool.id}-${metric}`} className="p-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-white">
                                {tool.performance[metric as keyof typeof tool.performance]}%
                              </span>
                              <div className="mt-1 h-2 w-24 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                                  style={{
                                    width: `${tool.performance[metric as keyof typeof tool.performance]}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-3 font-medium text-white">Overall Rating</td>
                      {selectedToolsData.map((tool) => (
                        <td key={`${tool.id}-rating`} className="p-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-white">{tool.rating}/5</span>
                            <div className="mt-1 flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4"
                                  fill={i < Math.floor(tool.rating) ? "currentColor" : "none"}
                                  color={i < Math.floor(tool.rating) ? "currentColor" : "#6b7280"}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/10"
            onClick={() => setIsCompareOpen(false)}
          >
            Close
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

