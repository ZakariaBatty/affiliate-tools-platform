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
import { blogPosts } from "@/data/blog-data"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editCategorySheet, setEditCategorySheet] = useState(false)
  const [deleteCategorySheet, setDeleteCategorySheet] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addCategorySheet, setAddCategorySheet] = useState(false)

  // Extract unique categories and count posts in each
  const categoriesWithCount = [...new Set(blogPosts.map((post) => post.category))].map((category) => {
    return {
      name: category,
      count: blogPosts.filter((post) => post.category === category).length,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
    }
  })

  const filteredCategories = categoriesWithCount.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setEditCategorySheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category)
    setDeleteCategorySheet(true)
    setSidebarOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Categories</h1>
          <p className="text-muted-foreground">Manage categories for your blog posts</p>
        </div>
        <Button
          className="bg-white text-black hover:bg-purple-600 hover:text-white"
          onClick={() => {
            setAddCategorySheet(true)
            setSidebarOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
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
              <TableHead>Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No categories found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{category.count}</span>
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
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteCategory(category)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete category
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

      {/* Edit Category Sheet */}
      {selectedCategory && (
        <Sheet
          open={editCategorySheet}
          onOpenChange={(open) => {
            setEditCategorySheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Edit Category</SheetTitle>
              <SheetDescription>Make changes to the category</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 mt-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Category Name
                </label>
                <Input id="name" defaultValue={selectedCategory.name} />
              </div>
              <div>
                <label htmlFor="slug" className="text-sm font-medium mb-2 block">
                  Slug
                </label>
                <Input id="slug" defaultValue={selectedCategory.slug} />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea id="description" placeholder="Enter category description" className="min-h-[100px]" />
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditCategorySheet(false)
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

      {/* Delete Category Sheet */}
      {selectedCategory && (
        <Sheet
          open={deleteCategorySheet}
          onOpenChange={(open) => {
            setDeleteCategorySheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Category</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete the "{selectedCategory.name}" category? This will not delete the
                associated posts, but they will no longer have this category assigned.
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
                  setDeleteCategorySheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete Category</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add Category Sheet */}
      <Sheet
        open={addCategorySheet}
        onOpenChange={(open) => {
          setAddCategorySheet(open)
          if (!open) {
            setTimeout(() => setSidebarOpen(false), 300)
          } else {
            setSidebarOpen(true)
          }
        }}
      >
        <SheetContent className="sm:max-w-[500px]" side="right">
          <SheetHeader>
            <SheetTitle>Add New Category</SheetTitle>
            <SheetDescription>Create a new blog category</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-6">
            <div>
              <label htmlFor="new-category-name" className="text-sm font-medium mb-2 block">
                Category Name
              </label>
              <Input id="new-category-name" placeholder="Enter category name" />
            </div>
            <div>
              <label htmlFor="new-category-slug" className="text-sm font-medium mb-2 block">
                Slug
              </label>
              <Input id="new-category-slug" placeholder="Enter category slug" />
            </div>
            <div>
              <label htmlFor="new-category-description" className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                id="new-category-description"
                placeholder="Enter category description"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddCategorySheet(false)
                setTimeout(() => setSidebarOpen(false), 300)
              }}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Create Category</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setEditCategorySheet(false)
            setDeleteCategorySheet(false)
            setAddCategorySheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}
        />
      )}
    </div>
  )
}

