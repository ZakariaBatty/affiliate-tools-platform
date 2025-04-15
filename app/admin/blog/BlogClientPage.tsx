"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Plus, Download, Filter, RefreshCw, Eye, Edit, Trash, FileText, Calendar, User, XCircle, ExternalLink } from 'lucide-react'
import { Category, Tag } from "@/types"


interface BlogClientPageProps {
  initialBlog: any[]
  categories: Category[]
  tags: Tag[]
}

export default function BlogClientPage({ initialBlog, categories, tags }: BlogClientPageProps) {
  console.log({ initialBlog })

  const [blog, setBlog] = useState<any[]>(initialBlog)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewPostSheet, setViewPostSheet] = useState(false)
  const [editPostSheet, setEditPostSheet] = useState(false)
  const [deletePostSheet, setDeletePostSheet] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null)


  // Filter tools
  useEffect(() => {
    let filteredPosts = [...initialBlog]

    // Search filter
    if (searchQuery) {
      filteredPosts = filteredPosts.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      // filteredPosts = filteredPosts.filter((blog) => blog.category === selectedCategory)
    }

    // Status filter
    // if (selectedStatus !== "all") {
    //   filteredPosts = filteredPosts.filter((blog) => blog.)
    // }

    setBlog(filteredPosts)
  }, [searchQuery, selectedCategory, selectedStatus, initialBlog])

  const handleViewPost = (post: any) => {
    setSelectedPost(post)
    setViewPostSheet(true)
  }

  const handleEditPost = (post: any) => {
    setSelectedPost(post)
    setEditPostSheet(true)
  }

  const handleDeletePost = (post: any) => {
    setSelectedPost(post)
    setDeletePostSheet(true)
  }

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog content
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
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
            placeholder="Search posts..."
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
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
              <TableHead>Post</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blog.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No posts found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              blog.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.categories.length > 1 ? `${post.categories[0].name} + ${post.categories.length}` : 'Nan'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{post.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(post.published ? "published" : "draft")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{post.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {Math.floor(Math.random() * 10000)}
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
                        <DropdownMenuItem onClick={() => handleViewPost(post)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPost(post)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View on site
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeletePost(post)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete post
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

      {/* View Post Sheet */}
      {selectedPost && (
        <Sheet open={viewPostSheet} onOpenChange={setViewPostSheet}>
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Post Details</SheetTitle>
              <SheetDescription>Detailed information about {selectedPost.title}</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedPost.author.name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedPost.date}
                    </div>
                    <div>
                      {getStatusBadge(selectedPost.published ? "published" : "draft")}
                    </div>
                  </div>
                  <div className="mt-4">
                    <img
                      src={selectedPost.image || "/placeholder.svg?height=300&width=600"}
                      alt={selectedPost.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Excerpt</h3>
                    <p>{selectedPost.excerpt}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Content</h3>
                    <div className="prose max-w-none">
                      <p>{selectedPost.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                      <h4>Key Features</h4>
                      <ul>
                        <li>Feature one explanation and details</li>
                        <li>Feature two with more information</li>
                        <li>Additional important information</li>
                      </ul>
                      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Post Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        {selectedPost.categories.length > 0 && selectedPost.categories.map((cat: any) => (
                          <Badge key={cat.category.id} variant="outline" className="text-sm">
                            {cat.category.name}
                          </Badge>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tags</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {/* {tool.tags.length > 0 && tool.tags.map((tag: any) => (
                            <Badge key={tag.tag.id} variant="outline" className="text-sm">
                              {tag.tag.name}
                            </Badge>
                          ))} */}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reading Time</p>
                        <p className="font-medium">5 min read</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="font-medium">{Math.floor(Math.random() * 10000)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">SEO Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta Title</p>
                        <p className="font-medium">{selectedPost.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Meta Description</p>
                        <p>{selectedPost.excerpt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Slug</p>
                        <p className="font-medium text-blue-600">/blog/{selectedPost.slug}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full bg-white text-black hover:bg-purple-600 hover:text-white" onClick={() => {
                      setViewPostSheet(false)
                      setTimeout(() => {
                        handleEditPost(selectedPost)
                      }, 100)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Post
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Site
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setViewPostSheet(false)}>
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Edit Post Sheet */}
      {selectedPost && (
        <Sheet open={editPostSheet} onOpenChange={setEditPostSheet}>
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Edit Post</SheetTitle>
              <SheetDescription>Make changes to {selectedPost.title}</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 mt-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right text-sm font-medium">
                  Title
                </label>
                <Input id="title" defaultValue={selectedPost.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="excerpt" className="text-right text-sm font-medium pt-2">
                  Excerpt
                </label>
                <Textarea
                  id="excerpt"
                  defaultValue={selectedPost.excerpt}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="content" className="text-right text-sm font-medium pt-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  defaultValue={selectedPost.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                  className="col-span-3 min-h-[200px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-sm font-medium">
                  Category
                </label>
                <Select defaultValue={selectedPost.category}>
                  <div className="col-span-3">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    {/* <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent> */}

                  </div>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="tags" className="text-right text-sm font-medium">
                  Tags
                </label>
                <Input
                  id="tags"
                  defaultValue={`${selectedPost.category}, Marketing, Growth`}
                  className="col-span-3"
                  placeholder="Comma separated tags"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="author" className="text-right text-sm font-medium">
                  Author
                </label>
                <Input id="author" defaultValue={selectedPost.author} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm font-medium">
                  Date
                </label>
                <Input id="date" type="date" defaultValue="2023-10-15" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="slug" className="text-right text-sm font-medium">
                  Slug
                </label>
                <Input id="slug" defaultValue={selectedPost.slug} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={selectedPost.status}>
                  <div className="col-span-3">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>

                  </div>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="featured-image" className="text-right text-sm font-medium">
                  Featured Image
                </label>
                <div className="col-span-3">
                  <div className="border rounded-md p-4 mb-2">
                    <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                      <img
                        src={selectedPost.image || "/placeholder.svg?height=160&width=300"}
                        alt="Featured"
                        className="h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Change Image
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="seo" className="text-right text-sm font-medium pt-2">
                  SEO Description
                </label>
                <Textarea
                  id="seo"
                  defaultValue={selectedPost.excerpt}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setEditPostSheet(false)}>
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Delete Post Sheet */}
      {selectedPost && (
        <Sheet open={deletePostSheet} onOpenChange={setDeletePostSheet}>
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Post</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete "{selectedPost.title}"? This action cannot be undone.
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center justify-center py-8">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setDeletePostSheet(false)}>
                Cancel
              </Button>
              <Button variant="destructive">Delete Post</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

