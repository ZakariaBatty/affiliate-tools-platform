'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { deleteTag } from "@/app/actions/admin/tag"

interface DeleteTagDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel?: () => void
  tagName: string
  tagId: string
}

export const DeleteTagDialog: React.FC<DeleteTagDialogProps> = ({
  open,
  onOpenChange,
  onCancel,
  tagName,
  tagId
}) => {

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()


  const onDelete = async () => {
    setLoading(true)

    const res = await deleteTag(tagId)
    if (res.error || !res.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the tag. Please try again.",
      })
      setLoading(false)
      return
    }

    setLoading(false)
    // Show success toast
    toast({
      variant: "default",
      title: "Success",
      description: "Your Tag has been successfully deleted.",
    })
    // Close the dialog after deletion
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete Tool</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{tagName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              onCancel?.()
            }}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            {loading ? "deleting soon ..." : "Delete Tool"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
