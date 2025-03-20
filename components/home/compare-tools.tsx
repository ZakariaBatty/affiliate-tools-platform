"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X, BarChart3 } from "lucide-react"
import { allTools } from "@/data/tools"


export default function CompareTools() {
  const [selectedTools, setSelectedTools] = useState<number[]>([1, 2]) // Default selected tools
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("features")

  // Get all features from all tools for comparison
  const allFeatures = Array.from(new Set(allTools.flatMap((tool) => Object.keys(tool.features))))

  // Function to add a tool to comparison
  const addToolToCompare = (toolId: number) => {
    if (selectedTools.length < 3 && !selectedTools.includes(toolId)) {
      setSelectedTools([...selectedTools, toolId])
    }
  }

  // Function to remove a tool from comparison
  const removeToolFromCompare = (toolId: number) => {
    setSelectedTools(selectedTools.filter((id) => id !== toolId))
  }

  // Get the selected tools data
  const selectedToolsData = allTools.filter((tool) => selectedTools.includes(tool.id))

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Compare Tools</h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Compare features, pricing, and performance metrics side by side to find the perfect tool for your needs
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h3 className="text-xl font-bold text-white">Selected Tools for Comparison</h3>
            <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Compare Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] bg-black text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Tool Comparison</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Compare features, pricing, and performance metrics side by side.
                  </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="features" className="mt-4">
                    <div className="rounded-lg border border-white/10">
                     <div className="max-h-[65vh] overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                              <TableHead className="text-white">Feature</TableHead>
                              {selectedToolsData.map((tool) => (
                                <TableHead key={tool.id} className="text-center text-white">
                                  {tool.name}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-white/10 hover:bg-white/5">
                              <TableCell className="font-medium text-white">Pricing</TableCell>
                              {selectedToolsData.map((tool) => (
                                <TableCell key={`${tool.id}-price`} className="text-center text-white">
                                  <div className="flex flex-col items-center">
                                    <span>${tool.price.monthly}/mo</span>
                                    <span className="text-xs text-white/50">${tool.price.yearly}/yr</span>
                                    {tool.price.hasFree && (
                                      <Badge className="mt-1 bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>

                            {allFeatures.map((feature) => (
                              <TableRow key={feature} className="border-white/10 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{feature}</TableCell>
                                {selectedToolsData.map((tool) => (
                                  <TableCell key={`${tool.id}-${feature}`} className="text-center text-white">
                                    {tool.features[feature as keyof typeof tool.features] ? (
                                      <Check className="mx-auto h-5 w-5 text-green-500" />
                                    ) : (
                                      <X className="mx-auto h-5 w-5 text-red-500" />
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="mt-4">
                    <div className="rounded-lg border border-white/10">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-white">Metric</TableHead>
                            {selectedToolsData.map((tool) => (
                              <TableHead key={tool.id} className="text-center text-white">
                                {tool.name}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.keys(allTools[0].performance).map((metric) => (
                            <TableRow key={metric} className="border-white/10 hover:bg-white/5">
                              <TableCell className="font-medium text-white">
                                {metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </TableCell>
                              {selectedToolsData.map((tool) => (
                                <TableCell key={`${tool.id}-${metric}`} className="text-center">
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
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium text-white">Overall Rating</TableCell>
                            {selectedToolsData.map((tool) => (
                              <TableCell key={`${tool.id}-rating`} className="text-center">
                                <div className="flex flex-col items-center">
                                  <span className="text-white">{tool.rating}/5</span>
                                  <div className="mt-1 flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i}>
                                        {i < Math.floor(tool.rating) ? "★" : i < tool.rating ? "★" : "☆"}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedToolsData.map((tool, index) => (
              <div
                key={tool.id}
                className="relative rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/50 hover:bg-white/10"
              >
                <button
                  onClick={() => removeToolFromCompare(tool.id)}
                  className="absolute right-2 top-2 rounded-full bg-white/10 p-1 text-white/70 hover:bg-white/20 hover:text-white"
                  aria-label="Remove from comparison"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mb-3 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={tool.image || "/placeholder.svg"}
                      alt={tool.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{tool.name}</h4>
                    <span className="text-sm text-white/70">{tool.category}</span>
                  </div>
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                    <span className="ml-1 text-yellow-500">★</span>
                  </div>
                  <span className="text-sm text-white/70">${tool.price.monthly}/mo</span>
                </div>

                <p className="mb-4 text-sm text-white/70 line-clamp-2">{tool.description}</p>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-white">Key Features:</h5>
                  <ul className="space-y-1">
                    {Object.entries(tool.features)
                      .filter(([_, hasFeature]) => hasFeature)
                      .slice(0, 3)
                      .map(([feature]) => (
                        <li key={feature} className="flex items-center text-xs text-white/70">
                          <Check className="mr-2 h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    <li className="text-xs text-white/50">
                      {Object.values(tool.features).filter(Boolean).length - 3}+ more features
                    </li>
                  </ul>
                </div>
              </div>
            ))}

            {selectedTools.length < 3 && (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/50">
                <Select onValueChange={(value) => addToolToCompare(Number(value))}>
                  <SelectTrigger className="w-[200px] border-white/10 bg-white/10 text-white">
                    <SelectValue placeholder="Add tool to compare" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    {allTools
                      .filter((tool) => !selectedTools.includes(tool.id))
                      .map((tool) => (
                        <SelectItem key={tool.id} value={tool.id.toString()}>
                          {tool.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Select up to 3 tools to compare their features, pricing, and performance metrics.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => setIsCompareOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Compare Selected Tools
          </Button>
        </div>
      </div>
    </section>
  )
}

