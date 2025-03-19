"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Star,
  ArrowUpDown,
  Eye,
  Pencil,
  BarChart3,
  UploadCloud,
  Bookmark,
} from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"
import { allTools } from "@/data/tools"

export default function CompanyToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddToolOpen, setIsAddToolOpen] = useState(false)

  // Filter for only the company's tools (in a real app, this would be based on the logged-in company)
  const companyTools = allTools.filter((tool) => [1, 3, 5, 7, 9].includes(tool.id))

  // Get selected tool data
  const selectedTool = selectedToolId ? companyTools.find((tool) => tool.id === selectedToolId) : null

  // Filter and sort tools
  const filteredTools = companyTools
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      // Type assertion to make TypeScript happy
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]

      // Handle different types of values
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(key)
      setSortOrder("asc")
    }
  }

  const viewToolDetails = (toolId: number) => {
    setSelectedToolId(toolId)
    setIsDetailOpen(true)
  }

  const editTool = (toolId: number) => {
    setSelectedToolId(toolId)
    setIsEditOpen(true)
  }

  const confirmDelete = (toolId: number) => {
    setSelectedToolId(toolId)
    setIsDeleteDialogOpen(true)
  }

  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tools</h1>
          <p className="text-white/70">Manage and monitor all your listed tools</p>
        </div>

        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
          onClick={() => setIsAddToolOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Tool
        </Button>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-white">Tools List</CardTitle>
              <CardDescription className="text-white/70">{filteredTools.length} tools listed</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[240px] rounded-md border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/50"
                />
              </div>

              <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th
                    className="cursor-pointer p-4 text-left text-sm font-medium text-white/70 hover:text-white"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortBy === "name" && (
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Category</th>
                  <th
                    className="cursor-pointer p-4 text-left text-sm font-medium text-white/70 hover:text-white"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center">
                      Rating
                      {sortBy === "rating" && (
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Price</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Statistics</th>
                  <th className="p-4 text-right text-sm font-medium text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.map((tool) => (
                  <tr key={tool.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={tool.image || "/placeholder.svg?height=40&width=40"}
                            alt={tool.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">{tool.name}</p>
                          <p className="text-xs text-white/50 line-clamp-1">{tool.description.substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-white/10 text-white hover:bg-white/20">{tool.category}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-white">{tool.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white">${tool.price.monthly}/mo</p>
                        <p className="text-xs text-white/50">${tool.price.yearly}/yr</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-white/70" />
                          <span className="text-sm text-white">{Math.floor(Math.random() * 5000) + 1000}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-white/70" />
                          <span className="text-sm text-white">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                          onClick={() => viewToolDetails(tool.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                          onClick={() => editTool(tool.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                          onClick={() => confirmDelete(tool.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tool Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full max-w-lg overflow-y-auto border-white/10 bg-black sm:max-w-2xl">
          {selectedTool && (
            <div className="flex h-full flex-col">
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="text-2xl text-white">{selectedTool.name}</SheetTitle>
                <SheetDescription className="text-white/70">Tool details and performance metrics</SheetDescription>
              </SheetHeader>

              <div className="flex-1 py-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedTool.image || "/placeholder.svg?height=300&width=300"}
                        alt={selectedTool.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-white/70">Category</h3>
                        <Badge className="mt-1 bg-white/10 text-white hover:bg-white/20">{selectedTool.category}</Badge>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white/70">Rating</h3>
                        <div className="mt-1 flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-white">{selectedTool.rating}/5</span>
                          <span className="ml-2 text-sm text-white/50">(142 reviews)</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white/70">Pricing</h3>
                        <div className="mt-1">
                          <p className="text-white">${selectedTool.price.monthly}/month</p>
                          <p className="text-white">${selectedTool.price.yearly}/year</p>
                          {selectedTool.price.hasFree && (
                            <Badge className="mt-1 bg-green-600 text-white">Free Plan Available</Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white/70">Status</h3>
                        <Badge className="mt-1 bg-green-600 text-white">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white">Description</h3>
                        <p className="mt-2 text-white/70">{selectedTool.description}</p>
                      </div>

                      <Separator className="bg-white/10" />

                      <div>
                        <h3 className="text-lg font-medium text-white">Features</h3>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {Object.entries(selectedTool.features).map(([feature, available]) => (
                            <div
                              key={feature}
                              className={`flex items-center gap-2 ${available ? "text-white" : "text-white/40 line-through"}`}
                            >
                              <div className={`h-2 w-2 rounded-full ${available ? "bg-green-500" : "bg-red-500"}`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div>
                        <h3 className="text-lg font-medium text-white">Performance Metrics</h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-white/70">Total Views</p>
                                  <h4 className="text-xl font-bold text-white">8,432</h4>
                                </div>
                                <Eye className="h-8 w-8 text-blue-500" />
                              </div>
                              <div className="mt-2 flex items-center text-xs text-green-500">
                                <span>+12% from last month</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-white/70">Saved By Users</p>
                                  <h4 className="text-xl font-bold text-white">1,245</h4>
                                </div>
                                <Bookmark className="h-8 w-8 text-purple-500" />
                              </div>
                              <div className="mt-2 flex items-center text-xs text-green-500">
                                <span>+8% from last month</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-white/70">Conversion Rate</p>
                                  <h4 className="text-xl font-bold text-white">3.2%</h4>
                                </div>
                                <BarChart3 className="h-8 w-8 text-amber-500" />
                              </div>
                              <div className="mt-2 flex items-center text-xs text-red-500">
                                <span>-0.5% from last month</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-white/70">Avg. Rating</p>
                                  <h4 className="text-xl font-bold text-white">4.7/5</h4>
                                </div>
                                <Star className="h-8 w-8 text-yellow-500" />
                              </div>
                              <div className="mt-2 flex items-center text-xs text-green-500">
                                <span>+0.2 from last month</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => {
                      setIsDetailOpen(false)
                      editTool(selectedTool.id)
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Full Analytics
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Tool Sheet */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen} side="right">
        <SheetContent className="w-full max-w-lg overflow-y-auto border-white/10 bg-black sm:max-w-2xl">
          {selectedTool && (
            <div className="flex h-full flex-col">
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="text-2xl text-white">Edit Tool</SheetTitle>
                <SheetDescription className="text-white/70">Make changes to your tool information</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="toolImage" className="text-white">
                      Tool Image
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={selectedTool.image || "/placeholder.svg?height=64&width=64"}
                          alt={selectedTool.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolName" className="text-white">
                      Tool Name
                    </Label>
                    <Input
                      id="toolName"
                      defaultValue={selectedTool.name}
                      className="border-white/10 bg-white/5 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="toolDescription"
                      defaultValue={selectedTool.description}
                      className="min-h-[120px] border-white/10 bg-white/5 text-white"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="toolCategory" className="text-white">
                        Category
                      </Label>
                      <Input
                        id="toolCategory"
                        defaultValue={selectedTool.category}
                        className="border-white/10 bg-white/5 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="toolRating" className="text-white">
                        Rating
                      </Label>
                      <Input
                        id="toolRating"
                        type="number"
                        defaultValue={selectedTool.rating}
                        disabled
                        className="border-white/10 bg-white/5 text-white"
                      />
                      <p className="text-xs text-white/50">Rating is calculated based on user reviews</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="toolPriceMonthly" className="text-white">
                        Monthly Price ($)
                      </Label>
                      <Input
                        id="toolPriceMonthly"
                        type="number"
                        defaultValue={selectedTool.price.monthly}
                        className="border-white/10 bg-white/5 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="toolPriceYearly" className="text-white">
                        Yearly Price ($)
                      </Label>
                      <Input
                        id="toolPriceYearly"
                        type="number"
                        defaultValue={selectedTool.price.yearly}
                        className="border-white/10 bg-white/5 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="hasFree" defaultChecked={selectedTool.price.hasFree} />
                    <Label htmlFor="hasFree" className="text-white">
                      Offer a free plan
                    </Label>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Features</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedTool.features).map(([feature, enabled]) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Switch id={`feature-${feature}`} defaultChecked={enabled} />
                          <Label htmlFor={`feature-${feature}`} className="text-white">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4 border-white/10 text-white hover:bg-white/10" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toolStatus" className="text-white">
                        Tool Status
                      </Label>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="isActive" defaultChecked={true} />
                      <Label htmlFor="isActive" className="text-white">
                        Tool is active and visible to users
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="border-white/10 bg-black text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete this tool? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex items-center gap-4">
            <Button
              variant="outline"
              className="flex-1 border-white/10 text-white hover:bg-white/10"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Tool
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tool Sheet */}
      <Sheet open={isAddToolOpen} onOpenChange={setIsAddToolOpen} side="right">
        <SheetContent className="w-full max-w-lg overflow-y-auto border-white/10 bg-black sm:max-w-2xl">
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b border-white/10 pb-4">
              <SheetTitle className="text-2xl text-white">Add New Tool</SheetTitle>
              <SheetDescription className="text-white/70">Create a new tool listing for your company</SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newToolImage" className="text-white">
                    Tool Image
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-white/20 bg-white/5">
                      <UploadCloud className="h-6 w-6 text-white/50" />
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newToolName" className="text-white">
                    Tool Name
                  </Label>
                  <Input
                    id="newToolName"
                    placeholder="Enter tool name"
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newToolDescription" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="newToolDescription"
                    placeholder="Describe your tool..."
                    className="min-h-[120px] border-white/10 bg-white/5 text-white"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newToolCategory" className="text-white">
                      Category
                    </Label>
                    <Input
                      id="newToolCategory"
                      placeholder="e.g., AI, Marketing, Analytics"
                      className="border-white/10 bg-white/5 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newToolRating" className="text-white">
                      Rating
                    </Label>
                    <Input
                      id="newToolRating"
                      type="number"
                      value="0.0"
                      disabled
                      className="border-white/10 bg-white/5 text-white"
                    />
                    <p className="text-xs text-white/50">Rating will be calculated based on user reviews</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newToolPriceMonthly" className="text-white">
                      Monthly Price ($)
                    </Label>
                    <Input
                      id="newToolPriceMonthly"
                      type="number"
                      placeholder="0.00"
                      className="border-white/10 bg-white/5 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newToolPriceYearly" className="text-white">
                      Yearly Price ($)
                    </Label>
                    <Input
                      id="newToolPriceYearly"
                      type="number"
                      placeholder="0.00"
                      className="border-white/10 bg-white/5 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="newHasFree" />
                  <Label htmlFor="newHasFree" className="text-white">
                    Offer a free plan
                  </Label>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="feature-1" defaultChecked />
                      <Label htmlFor="feature-1" className="text-white">
                        Feature 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="feature-2" defaultChecked />
                      <Label htmlFor="feature-2" className="text-white">
                        Feature 2
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="feature-3" defaultChecked />
                      <Label htmlFor="feature-3" className="text-white">
                        Feature 3
                      </Label>
                    </div>
                  </div>
                  <Button className="mt-4 border-white/10 text-white hover:bg-white/10" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newToolStatus" className="text-white">
                      Tool Status
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="isNewActive" defaultChecked />
                    <Label htmlFor="isNewActive" className="text-white">
                      Tool is active and visible to users
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => setIsAddToolOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  onClick={() => setIsAddToolOpen(false)}
                >
                  Create Tool
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </CompanyDashboardLayout>
  )
}

