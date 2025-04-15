"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Eye, Edit, ExternalLink, FileText, MoreHorizontal, Trash, User, MessageSquare } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { BlogFull } from "@/types"
import Image from "next/image"

interface BlogPostsTableProps {
  blog: BlogFull[]
  onView: (post: BlogFull) => void
  onEdit: (post: BlogFull) => void
  onDelete: (post: BlogFull) => void
}

export default function BlogPostsTable({ blog, onView, onEdit, onDelete }: BlogPostsTableProps) {
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
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Stats</TableHead>
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
                      <Image
                        src={post.coverImage || "/placeholder.svg?height=40&width=40"}
                        alt={post.title}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">{post.excerpt}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.categories.length > 0 ? (
                      post.categories.length > 1 ? (
                        <>
                          <Badge variant="outline">{post.categories[0].name}</Badge>
                          <Badge variant="outline" className="bg-gray-100 text-black/75">
                            + {post.categories.length - 1}
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="outline">{post.categories[0].name}</Badge>
                      )
                    ) : (
                      <Badge variant="outline">None</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{post.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(post.published ? "published" : "draft")}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{post.commentCount}</span>
                    </div>
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
                      <DropdownMenuItem onClick={() => onView(post)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(post)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit post
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <a href={`/${post.slug}`} rel="noopener noreferrer">
                          View on site
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(post)} className="text-red-600">
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
  )
}
