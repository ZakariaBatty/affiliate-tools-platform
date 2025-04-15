"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { MultiSelect } from "@/components/ui/multi-select"
import { BlogFull, Category, Tag } from "@/types"

interface EditPostSheetProps {
  post: BlogFull
  categories: Category[]
  tags: Tag[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function EditPostSheet({ post, categories, tags, open, onOpenChange, onSuccess }: EditPostSheetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    published: post.published,
    featured: post.featured,
    readingTime: post.readingTime,
    categoryIds: post.categories.map((cat) => cat.id),
    tagIds: post.tags.map((tag) => tag.id),
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: post.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update post")
      }

      onSuccess()
    } catch (error) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle>Edit Post</SheetTitle>
          <SheetDescription>Make changes to {post.title}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 mt-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="excerpt" className="text-right text-sm font-medium pt-2">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ""}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              className="col-span-3 min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="content" className="text-right text-sm font-medium pt-2">
              Content
            </label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="col-span-3 min-h-[200px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categories" className="text-right text-sm font-medium">
              Categories
            </label>
            <div className="col-span-3">
              <MultiSelect
                options={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
                selected={formData.categoryIds}
                onChange={(selected) => handleChange("categoryIds", selected)}
                placeholder="Select categories"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="tags" className="text-right text-sm font-medium">
              Tags
            </label>
            <div className="col-span-3">
              <MultiSelect
                options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
                selected={formData.tagIds}
                onChange={(selected) => handleChange("tagIds", selected)}
                placeholder="Select tags"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="slug" className="text-right text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="readingTime" className="text-right text-sm font-medium">
              Reading Time (min)
            </label>
            <Input
              id="readingTime"
              type="number"
              value={formData.readingTime}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("readingTime", value === '' ? 5 : Number.parseInt(value));
              }} className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="coverImage" className="text-right text-sm font-medium">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              value={formData.coverImage || ""}
              onChange={(e) => handleChange("coverImage", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right text-sm font-medium">Status</div>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleChange("published", checked)}
              />
              <label
                htmlFor="published"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Published
              </label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right text-sm font-medium">Featured</div>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange("featured", checked)}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Post
              </label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="featured-image" className="text-right text-sm font-medium">
              Featured Image Preview
            </label>
            <div className="col-span-3">
              <div className="border rounded-md p-4 mb-2">
                <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                  <img
                    src={formData.coverImage || "/placeholder.svg?height=160&width=300"}
                    alt="Featured"
                    className="h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="bg-white text-black hover:bg-purple-600 hover:text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
