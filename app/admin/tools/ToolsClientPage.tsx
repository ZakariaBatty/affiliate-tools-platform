"use client"

import { useEffect, useState } from "react"
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
  Building2,
  XCircle,
} from "lucide-react"
import { Category, Tag } from "@/types"
import { AddToolSheet } from "@/components/admin/tools/add-tool-sheet"
import { DeleteToolDialog } from "@/components/admin/tools/delete-tool-dialog"
import { EditToolSheet } from "@/components/admin/tools/edit-tool-sheet"

interface ALLToolsProps {
  initialTools: any[]
  categories: Category[]
  tags: Tag[]
}

export default function ToolsClientPageAdmin({ initialTools, categories, tags }: ALLToolsProps) {
  const [tools, setTools] = useState(initialTools)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewToolSheet, setViewToolSheet] = useState(false)
  const [editToolSheet, setEditToolSheet] = useState(false)
  const [deleteToolSheet, setDeleteToolSheet] = useState(false)
  const [selectedTool, setSelectedTool] = useState<any | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addToolSheet, setAddToolSheet] = useState(false)
  // Filter tools
  useEffect(() => {
    let filteredTools = [...initialTools]

    // Search filter
    if (searchQuery) {
      filteredTools = filteredTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filteredTools = filteredTools.filter((tool) =>
        tool.categories.some((cat: any) => cat.category.name === selectedCategory),
      )
    }

    // Status filter
    if (selectedStatus !== "all") {
      filteredTools = filteredTools.filter((tool) => (selectedStatus === "featured" ? tool.featured : !tool.featured))
    }

    setTools(filteredTools)
  }, [searchQuery, selectedCategory, selectedStatus, initialTools])

  const handleViewTool = (tool: any) => {
    setSelectedTool(tool)
    setViewToolSheet(true)
    setSidebarOpen(true)
  }

  const handleEditTool = (tool: any) => {
    setSelectedTool(tool)
    setEditToolSheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteTool = (tool: any) => {
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
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
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
            {tools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No tools found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              tools.map((tool) => (
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
                    <Badge variant="outline">
                      {tool.categories.length > 0
                        ? `${tool.categories[0].category.name} + ${tool.categories.length}`
                        : tool.categories[0].category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{tool.avgRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{tool.companyId ? tool.company?.name : "N/A"}</span>
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
        <EditToolSheet
          editToolSheet={editToolSheet}
          setEditToolSheet={setEditToolSheet}
          setSidebarOpen={setSidebarOpen}
          categories={categories}
          tags={tags}
          tool={selectedTool}
        />
      )}

      {/* Delete Tool Sheet */}
      {selectedTool && (

        <DeleteToolDialog
          open={deleteToolSheet}
          onOpenChange={(open: any) => {
            setDeleteToolSheet(open)
            setSidebarOpen(open)
          }}
          onCancel={() => {
            setDeleteToolSheet(false)
            setSidebarOpen(false)
          }}
          toolName={selectedTool.name}
          toolId={selectedTool.id}
        />
      )}

      {/* Add Tool Sheet */}
      <AddToolSheet
        addToolSheet={addToolSheet}
        setAddToolSheet={setAddToolSheet}
        setSidebarOpen={setSidebarOpen}
        categories={categories}
        tags={tags}
      />
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