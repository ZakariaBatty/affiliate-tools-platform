"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BlogFull } from "@/types"
import { XCircle } from "lucide-react"

interface DeletePostSheetProps {
  post: BlogFull
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => Promise<void>
  isLoading: boolean
}

export default function DeletePostSheet({ post, open, onOpenChange, onDelete, isLoading }: DeletePostSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] flex flex-col justify-between" side="right">
        <SheetHeader>
          <SheetTitle>Delete Post</SheetTitle>
          <SheetDescription>
            Are you sure you want to delete "{post.title}"? This action cannot be undone.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Post"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
