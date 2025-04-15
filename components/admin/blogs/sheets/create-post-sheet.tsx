"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { MultiSelect } from "@/components/ui/multi-select"
import { Category, Tag } from "@/types"
import { ImageUpload } from "@/components/image-upload"

interface CreatePostSheetProps {
  categories: Category[]
  tags: Tag[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function CreatePostSheet({ categories, tags, open, onOpenChange, onSuccess }: CreatePostSheetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    published: false,
    featured: false,
    readingTime: 5,
    categoryIds: [] as string[],
    tagIds: [] as string[],
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    handleChange("slug", slug)
  }

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    if (!formData.slug) {
      generateSlug()
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          author: {
            name: "Admin User",
            image: "/placeholder.svg?height=100&width=100",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false,
        featured: false,
        readingTime: 5,
        categoryIds: [],
        tagIds: [],
      })

      onSuccess()
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post",
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
          <SheetTitle>Create New Post</SheetTitle>
          <SheetDescription>Add a new blog post to your website</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 mt-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right text-sm font-medium">
              Title *
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="col-span-3"
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="excerpt" className="text-right text-sm font-medium pt-2">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              className="col-span-3 min-h-[100px]"
              placeholder="Brief summary of the post"
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
              placeholder="Full content of the post"
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
            <div className="col-span-3 flex gap-2">
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="flex-1"
                placeholder="post-url-slug"
              />
              <Button type="button" variant="outline" onClick={generateSlug} disabled={!formData.title}>
                Generate
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="readingTime" className="text-right text-sm font-medium">
              Reading Time (min)
            </label>
            <Input
              id="readingTime"
              type="number"
              value={formData.readingTime}
              onChange={(e) => handleChange("readingTime", Number.parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="coverImage" className="text-right text-sm font-medium pt-2">
              Cover Image
            </label>
            <div className="col-span-3">
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => handleChange("coverImage", url)}
                type="blogs"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right text-sm font-medium">Status</div>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleChange("published", checked === true)}
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
                onCheckedChange={(checked) => handleChange("featured", checked === true)}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Post
              </label>
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
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
