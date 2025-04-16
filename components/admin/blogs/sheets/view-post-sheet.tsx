"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Calendar, Edit, ExternalLink, User, Eye, MessageSquare } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { BlogFull } from "@/types"

interface ViewPostSheetProps {
  post: BlogFull
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: () => void
}

export default function ViewPostSheet({ post, open, onOpenChange, onEdit }: ViewPostSheetProps) {
  const getStatusBadge = (status: string) => {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle>Post Details</SheetTitle>
          <SheetDescription>Detailed information about {post.title}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.createdAt)}
                </div>
                <div>{getStatusBadge(post.published ? "published" : "draft")}</div>
              </div>
              <div className="mt-4">
                <img
                  src={post.coverImage || "/placeholder.svg?height=300&width=600"}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Excerpt</h3>
                <p>{post.excerpt}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Content</h3>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>

              {post.comments.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Recent Comments</h3>
                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={comment.user.image || "/placeholder.svg?height=32&width=32"}
                              alt={comment.user.name || "User"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{comment.user.name}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                          </div>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/3 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Post Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.categories.length > 0 &&
                        post.categories.map((cat) => (
                          <Badge key={cat.id} variant="outline" className="text-sm">
                            {cat.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.length > 0 &&
                        post.tags.map((tag) => (
                          <Badge key={tag.id} variant="outline" className="text-sm">
                            {tag.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reading Time</p>
                    <p className="font-medium">{post.readingTime} min read</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Views</p>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p className="font-medium">{post.viewCount}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Comments</p>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p className="font-medium">{post.commentCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">SEO Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Meta Title</p>
                    <p className="font-medium">{post.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meta Description</p>
                    <p>{post.excerpt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Slug</p>
                    <p className="font-medium text-blue-600">/blog/{post.slug}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full bg-white text-black hover:bg-purple-600 hover:text-white" onClick={onEdit}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
