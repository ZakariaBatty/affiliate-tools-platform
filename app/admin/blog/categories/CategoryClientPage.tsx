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
import { Category } from "@/types"
import EditCategorySheet from "@/components/admin/blogs/categories/edit-category-sheet"
import AddCategorySheet from "@/components/admin/blogs/categories/add-category-sheet"

interface categories {
  initialCategories: Category[]
}

export default function CategoriesClientPage({ initialCategories }: categories) {

  const [categories, setCategories] = useState(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [editCategorySheet, setEditCategorySheet] = useState(false)
  const [deleteCategorySheet, setDeleteCategorySheet] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addCategorySheet, setAddCategorySheet] = useState(false)

  useEffect(() => {
    let filteredCategories = [...initialCategories]

    //  Searche filter
    if (searchQuery) {
      filteredCategories = filteredCategories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setCategories(filteredCategories)
  }, [initialCategories, searchQuery])



  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setEditCategorySheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteCategory = (category: Category) => {
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
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No categories found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
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
                      <span>{category._count?.blogs}</span>
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
        <EditCategorySheet
          editCategorySheet={editCategorySheet}
          setEditCategorySheet={setEditCategorySheet}
          setSidebarOpen={setSidebarOpen}
          selectedCategory={selectedCategory}
        />
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
      <AddCategorySheet
        addCategorySheet={addCategorySheet}
        setAddCategorySheet={setAddCategorySheet}
        setSidebarOpen={setSidebarOpen}
      />
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

