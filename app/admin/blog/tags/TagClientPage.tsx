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
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Plus, Edit, Trash, Tag, FileText } from "lucide-react"
import { TagFull } from "@/types"
import { EditTagSheet } from "@/components/admin/blogs/tags/edit-tag-sheet"
import { DeleteTagDialog } from "@/components/admin/blogs/tags/delete-tag-dialog"
import { AddTagSheet } from "@/components/admin/blogs/tags/add-tag-sheet"

interface Props {
  initialTags: TagFull[]
}

export default function TagsClientPage({ initialTags }: Props) {

  const [tags, setTags] = useState(initialTags)
  const [searchQuery, setSearchQuery] = useState("")
  const [editTagSheet, setEditTagSheet] = useState(false)
  const [addTagSheet, setAddTagSheet] = useState(false)
  const [deleteTagSheet, setDeleteTagSheet] = useState(false)
  const [selectedTag, setSelectedTag] = useState<TagFull | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleEditTag = (tag: TagFull) => {
    setSelectedTag(tag)
    setEditTagSheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteTag = (tag: TagFull) => {
    setSelectedTag(tag)
    setDeleteTagSheet(true)
    setSidebarOpen(true)
  }

  useEffect(() => {
    let filteredTags = [...initialTags]

    if (searchQuery) {
      filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setTags(filteredTags)
  }, [initialTags, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Tags</h1>
          <p className="text-muted-foreground">Manage tags for your blog posts</p>
        </div>
        <Button className="bg-white text-black hover:bg-purple-600 hover:text-white"
          onClick={() => {
            setAddTagSheet(true)
            setSidebarOpen(true)
          }}
        >
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
                      <span>{tag._count?.blogs}</span>
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
        <EditTagSheet
          editTagSheet={editTagSheet}
          setEditTagSheet={setEditTagSheet}
          setSidebarOpen={setSidebarOpen}
          selectedTag={selectedTag}
        />
      )}

      {/* Delete Tag Sheet */}
      {selectedTag && (
        <DeleteTagDialog
          open={deleteTagSheet}
          onOpenChange={setDeleteTagSheet}
          onCancel={() => setSidebarOpen(false)}
          tagName={selectedTag.name}
          tagId={selectedTag.id}
        />
      )}

      {/* Add Tag Sheet */}
      <AddTagSheet
        addTagSheet={addTagSheet}
        setAddTagSheet={setAddTagSheet}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" style={{ pointerEvents: "all", cursor: "not-allowed" }} />
      )}
    </div>
  )
}

