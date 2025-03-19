"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  MoreHorizontal,
  Plus,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash,
  Star,
  ExternalLink,
  ImageIcon,
  Link,
  Tag,
  Building2,
  Calendar,
  XCircle,
} from "lucide-react"
import { allTools } from "@/data/tools"

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewToolSheet, setViewToolSheet] = useState(false)
  const [editToolSheet, setEditToolSheet] = useState(false)
  const [deleteToolSheet, setDeleteToolSheet] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addToolSheet, setAddToolSheet] = useState(false)

  // Extract unique categories from tools
  const categories = [...new Set(allTools.map((tool) => tool.category))]

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "featured" && tool.featured) ||
      (selectedStatus === "not-featured" && !tool.featured)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleViewTool = (tool) => {
    setSelectedTool(tool)
    setViewToolSheet(true)
    setSidebarOpen(true)
  }

  const handleEditTool = (tool) => {
    setSelectedTool(tool)
    setEditToolSheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteTool = (tool) => {
    setSelectedTool(tool)
    setDeleteToolSheet(true)
    setSidebarOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground">Manage AI tools and their listings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-white text-black hover:bg-purple-600 hover:text-white"
            onClick={() => {
              setAddToolSheet(true)
              setSidebarOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="not-featured">Not Featured</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tool</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No tools found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{tool.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{tool.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tool.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{tool.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{tool.company || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tool.featured ? (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewTool(tool)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTool(tool)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit tool
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit website
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteTool(tool)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete tool
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Tool Sheet */}
      {selectedTool && (
        <Sheet
          open={viewToolSheet}
          onOpenChange={(open) => {
            setViewToolSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Tool Details</SheetTitle>
              <SheetDescription>Detailed information about {selectedTool.name}</SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-1 flex flex-col p-4 border rounded-lg">
                <div className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center mb-4">
                  <ImageIcon className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold">{selectedTool.name}</h3>
                <div className="flex items-center mt-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{selectedTool.rating}</span>
                  <span className="text-muted-foreground text-sm ml-2">({selectedTool.reviews} reviews)</span>
                </div>
                <Badge className="w-fit mb-4">{selectedTool.category}</Badge>
                <div className="mt-auto">
                  <Button
                    className="w-full bg-white text-black hover:bg-purple-600 hover:text-white mb-2"
                    onClick={() => {
                      setViewToolSheet(false)
                      setTimeout(() => {
                        handleEditTool(selectedTool)
                      }, 100)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Tool
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stats">Statistics</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                        <p className="mt-1">{selectedTool.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start">
                          <Link className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                            <p className="text-blue-600 hover:underline">
                              https://{selectedTool.name.toLowerCase().replace(/\s+/g, "")}.ai
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Tags</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <Badge variant="outline">AI</Badge>
                              <Badge variant="outline">{selectedTool.category}</Badge>
                              <Badge variant="outline">Productivity</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                            <p>{selectedTool.company || "Independent"}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Added</h4>
                            <p>{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Pricing</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="border rounded-lg p-3">
                            <h5 className="font-medium">Free</h5>
                            <p className="text-sm text-muted-foreground">Limited features</p>
                          </div>
                          <div className="border rounded-lg p-3 bg-purple-50">
                            <h5 className="font-medium">Pro</h5>
                            <p className="text-sm text-muted-foreground">$19/month</p>
                          </div>
                          <div className="border rounded-lg p-3">
                            <h5 className="font-medium">Enterprise</h5>
                            <p className="text-sm text-muted-foreground">Custom pricing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="stats">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Page Views</h4>
                          <p className="text-2xl font-bold mt-1">12,483</p>
                          <p className="text-sm text-green-600 mt-1">+18.7% vs last month</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Clicks</h4>
                          <p className="text-2xl font-bold mt-1">4,329</p>
                          <p className="text-sm text-green-600 mt-1">+22.4% vs last month</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Conversion Rate</h4>
                          <p className="text-2xl font-bold mt-1">34.7%</p>
                          <p className="text-sm text-green-600 mt-1">+5.3% vs last month</p>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 mt-4">
                        <h4 className="font-medium mb-3">Traffic Sources</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Organic Search</span>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Direct</span>
                              <span className="text-sm font-medium">30%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Referral</span>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Social</span>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">User Reviews</h4>
                        <p className="text-sm text-muted-foreground">Total: {selectedTool.reviews}</p>
                      </div>

                      <div className="border rounded-lg divide-y">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                              <span className="font-medium">John Doe</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                                  fill={star <= 5 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">
                            This tool has completely transformed our content creation process. Highly recommended!
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Posted on Oct 15, 2023</p>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                              <span className="font-medium">Sarah Johnson</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                                  fill={star <= 4 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">
                            Great tool with lots of features. The interface could be more intuitive though.
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Posted on Oct 10, 2023</p>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                              <span className="font-medium">Michael Chen</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                                  fill={star <= 5 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">
                            Absolutely love this tool! It's saved me countless hours of work and the results are
                            fantastic.
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Posted on Oct 5, 2023</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        View All Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setViewToolSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Edit Tool Sheet */}
      {selectedTool && (
        <Sheet
          open={editToolSheet}
          onOpenChange={(open) => {
            setEditToolSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Edit Tool</SheetTitle>
              <SheetDescription>Make changes to {selectedTool.name}'s information</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 mt-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input id="name" defaultValue={selectedTool.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  defaultValue={selectedTool.description}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-sm font-medium">
                  Category
                </label>
                <Select defaultValue={selectedTool.category} className="col-span-3">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="website" className="text-right text-sm font-medium">
                  Website URL
                </label>
                <Input
                  id="website"
                  defaultValue={`https://${selectedTool.name.toLowerCase().replace(/\s+/g, "")}.ai`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right text-sm font-medium">
                  Company
                </label>
                <Input id="company" defaultValue={selectedTool.company || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Featured</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="featured" defaultChecked={selectedTool.featured} />
                  <Label htmlFor="featured">Mark as featured tool</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="pricing" className="text-right text-sm font-medium pt-2">
                  Pricing Tiers
                </label>
                <div className="col-span-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="free-tier" className="mb-1 block">
                        Free Tier
                      </Label>
                      <Input id="free-tier" defaultValue="Limited features" />
                    </div>
                    <div>
                      <Label htmlFor="free-price" className="mb-1 block">
                        Price
                      </Label>
                      <Input id="free-price" defaultValue="$0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="pro-tier" className="mb-1 block">
                        Pro Tier
                      </Label>
                      <Input id="pro-tier" defaultValue="All features" />
                    </div>
                    <div>
                      <Label htmlFor="pro-price" className="mb-1 block">
                        Price
                      </Label>
                      <Input id="pro-price" defaultValue="$19/month" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="enterprise-tier" className="mb-1 block">
                        Enterprise Tier
                      </Label>
                      <Input id="enterprise-tier" defaultValue="Custom solutions" />
                    </div>
                    <div>
                      <Label htmlFor="enterprise-price" className="mb-1 block">
                        Price
                      </Label>
                      <Input id="enterprise-price" defaultValue="Custom pricing" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditToolSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Delete Tool Sheet */}
      {selectedTool && (
        <Sheet
          open={deleteToolSheet}
          onOpenChange={(open) => {
            setDeleteToolSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Tool</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete {selectedTool.name}? This action cannot be undone.
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center justify-center py-8">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <SheetFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteToolSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete Tool</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add Tool Sheet */}
      <Sheet
        open={addToolSheet}
        onOpenChange={(open) => {
          setAddToolSheet(open)
          if (!open) {
            setTimeout(() => setSidebarOpen(false), 300)
          } else {
            setSidebarOpen(true)
          }
        }}
      >
        <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle>Add New Tool</SheetTitle>
            <SheetDescription>Create a new tool listing</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-tool-name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input id="new-tool-name" placeholder="Enter tool name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="new-description" className="text-right text-sm font-medium pt-2">
                Description
              </label>
              <Textarea
                id="new-description"
                placeholder="Enter tool description"
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-category" className="text-right text-sm font-medium">
                Category
              </label>
              <Select defaultValue="" className="col-span-3">
                <SelectTrigger id="new-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-website" className="text-right text-sm font-medium">
                Website URL
              </label>
              <Input id="new-website" placeholder="Enter website URL" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-company" className="text-right text-sm font-medium">
                Company
              </label>
              <Input id="new-company" placeholder="Enter company name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Featured</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="new-featured" />
                <Label htmlFor="new-featured">Mark as featured tool</Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="new-pricing" className="text-right text-sm font-medium pt-2">
                Pricing Tiers
              </label>
              <div className="col-span-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="new-free-tier" className="mb-1 block">
                      Free Tier
                    </Label>
                    <Input id="new-free-tier" placeholder="Free tier features" />
                  </div>
                  <div>
                    <Label htmlFor="new-free-price" className="mb-1 block">
                      Price
                    </Label>
                    <Input id="new-free-price" placeholder="$0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="new-pro-tier" className="mb-1 block">
                      Pro Tier
                    </Label>
                    <Input id="new-pro-tier" placeholder="Pro tier features" />
                  </div>
                  <div>
                    <Label htmlFor="new-pro-price" className="mb-1 block">
                      Price
                    </Label>
                    <Input id="new-pro-price" placeholder="$19/month" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddToolSheet(false)
                setTimeout(() => setSidebarOpen(false), 300)
              }}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Create Tool</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setViewToolSheet(false)
            setEditToolSheet(false)
            setDeleteToolSheet(false)
            setAddToolSheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}
        />
      )}
    </div>
  )
}

