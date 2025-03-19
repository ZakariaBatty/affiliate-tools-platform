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
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Plus, Edit, Trash, Tag, FileText } from "lucide-react"

// Sample tags data
const tags = [
  { id: 1, name: "Marketing", slug: "marketing", count: 12 },
  { id: 2, name: "AI Tools", slug: "ai-tools", count: 8 },
  { id: 3, name: "Growth", slug: "growth", count: 15 },
  { id: 4, name: "Productivity", slug: "productivity", count: 7 },
  { id: 5, name: "Affiliate", slug: "affiliate", count: 10 },
  { id: 6, name: "SEO", slug: "seo", count: 9 },
  { id: 7, name: "Content Creation", slug: "content-creation", count: 6 },
  { id: 8, name: "Social Media", slug: "social-media", count: 11 },
]

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editTagSheet, setEditTagSheet] = useState(false)
  const [deleteTagSheet, setDeleteTagSheet] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleEditTag = (tag) => {
    setSelectedTag(tag)
    setEditTagSheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteTag = (tag) => {
    setSelectedTag(tag)
    setDeleteTagSheet(true)
    setSidebarOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Tags</h1>
          <p className="text-muted-foreground">Manage tags for your blog posts</p>
        </div>
        <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tag</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No tags found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="font-medium">{tag.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {tag.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{tag.count}</span>
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditTag(tag)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit tag
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteTag(tag)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete tag
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

      {/* Edit Tag Sheet */}
      {selectedTag && (
        <Sheet
          open={editTagSheet}
          onOpenChange={(open) => {
            setEditTagSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Edit Tag</SheetTitle>
              <SheetDescription>Make changes to the tag</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 mt-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Tag Name
                </label>
                <Input id="name" defaultValue={selectedTag.name} />
              </div>
              <div>
                <label htmlFor="slug" className="text-sm font-medium mb-2 block">
                  Slug
                </label>
                <Input id="slug" defaultValue={selectedTag.slug} />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea id="description" placeholder="Enter tag description" className="min-h-[100px]" />
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditTagSheet(false)
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

      {/* Delete Tag Sheet */}
      {selectedTag && (
        <Sheet
          open={deleteTagSheet}
          onOpenChange={(open) => {
            setDeleteTagSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Tag</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete the "{selectedTag.name}" tag? This will not delete the associated posts,
                but they will no longer have this tag assigned.
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center justify-center py-8">
              <div className="rounded-full bg-red-100 p-3">
                <Trash className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <SheetFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteTagSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete Tag</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" style={{ pointerEvents: "all", cursor: "not-allowed" }} />
      )}
    </div>
  )
}

