"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, RefreshCw, Filter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { BlogFull, Category, Tag } from "@/types"
import BlogPostsTable from "./blog-posts-table"
import ViewPostSheet from "./sheets/view-post-sheet"
import CreatePostSheet from "./sheets/create-post-sheet"
import EditPostSheet from "./sheets/edit-post-sheet"
import DeletePostSheet from "./sheets/delete-post-sheet"
import CategoryFilter from "./filters/category-filter"
import StatusFilter from "./filters/status-filter"


interface BlogClientPageProps {
  initialBlog: BlogFull[]
  categories: Category[]
  tags: Tag[]
}

export default function BlogClientPage({ initialBlog, categories, tags }: BlogClientPageProps) {
  const router = useRouter()
  const [blog, setBlog] = useState<BlogFull[]>(initialBlog)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewPostSheet, setViewPostSheet] = useState(false)
  const [editPostSheet, setEditPostSheet] = useState(false)
  const [deletePostSheet, setDeletePostSheet] = useState(false)
  const [createPostSheet, setCreatePostSheet] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogFull | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter tools
  useEffect(() => {
    let filteredPosts = [...initialBlog]

    // Search filter
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filteredPosts = filteredPosts.filter((blog) => blog.categories.some((cat) => cat.name === selectedCategory))
    }

    // Status filter
    if (selectedStatus !== "all") {
      filteredPosts = filteredPosts.filter((blog) => (blog.published ? "published" : "draft") === selectedStatus)
    }

    setBlog(filteredPosts)
  }, [searchQuery, selectedCategory, selectedStatus, initialBlog])

  const handleViewPost = (post: BlogFull) => {
    setSelectedPost(post)
    setViewPostSheet(true)
  }

  const handleEditPost = (post: BlogFull) => {
    setSelectedPost(post)
    setEditPostSheet(true)
  }

  const handleDeletePost = (post: BlogFull) => {
    setSelectedPost(post)
    setDeletePostSheet(true)
  }

  const handleCreatePost = () => {
    setCreatePostSheet(true)
  }

  const handleRefresh = () => {
    router.refresh()
    toast({
      title: "Refreshed",
      description: "Blog posts have been refreshed",
    })
  }

  const handlePostCreated = () => {
    setCreatePostSheet(false)
    handleRefresh()
    toast({
      title: "Success",
      description: "Blog post created successfully",
    })
  }

  const handlePostUpdated = () => {
    setEditPostSheet(false)
    handleRefresh()
    toast({
      title: "Success",
      description: "Blog post updated successfully",
    })
  }

  const handlePostDeleted = async () => {
    if (!selectedPost) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/blog?id=${selectedPost.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      setDeletePostSheet(false)
      handleRefresh()
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-white text-black hover:bg-purple-600 hover:text-white" onClick={handleCreatePost}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleRefresh}>
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
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <BlogPostsTable blog={blog} onView={handleViewPost} onEdit={handleEditPost} onDelete={handleDeletePost} />

      {selectedPost && (
        <>
          <ViewPostSheet
            post={selectedPost}
            open={viewPostSheet}
            onOpenChange={setViewPostSheet}
            onEdit={() => {
              setViewPostSheet(false)
              setTimeout(() => handleEditPost(selectedPost), 100)
            }}
          />

          <EditPostSheet
            post={selectedPost}
            categories={categories}
            tags={tags}
            open={editPostSheet}
            onOpenChange={setEditPostSheet}
            onSuccess={handlePostUpdated}
          />

          <DeletePostSheet
            post={selectedPost}
            open={deletePostSheet}
            onOpenChange={setDeletePostSheet}
            onDelete={handlePostDeleted}
            isLoading={isLoading}
          />
        </>
      )}

      <CreatePostSheet
        categories={categories}
        tags={tags}
        open={createPostSheet}
        onOpenChange={setCreatePostSheet}
        onSuccess={handlePostCreated}
      />
    </div>
  )
}
