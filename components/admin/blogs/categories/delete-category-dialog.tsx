'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { deleteCategory } from "@/app/actions/admin/category"

interface DeleteToolDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel?: () => void
  categoryName: string
  cateId: string
}

export const DeleteCategoryDialog: React.FC<DeleteToolDialogProps> = ({
  open,
  onOpenChange,
  onCancel,
  categoryName,
  cateId
}) => {

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()


  const onDelete = async () => {
    setLoading(true)

    const res = await deleteCategory(cateId)
    if (res.error || !res.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete Category",
      })
      setLoading(false)
      return
    }

    setLoading(false)
    // Show success toast
    toast({
      variant: "default",
      title: "Success",
      description: "Your Category has been successfully deleted.",
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
            Are you sure you want to delete <strong>{categoryName}</strong>? This action cannot be undone.
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
