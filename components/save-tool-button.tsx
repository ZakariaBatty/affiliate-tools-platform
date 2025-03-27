"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { useToast } from "./ui/use-toast"
import { useAuthDialog } from "@/hooks/use-auth-dialog"

interface SaveToolButtonProps {
  toolId: string
  isSaved?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function SaveToolButton({
  toolId,
  isSaved = false,
  variant = "outline",
  size = "default",
  className = "",
}: SaveToolButtonProps) {
  const { data: session } = useSession()
  const { open: openAuthDialog } = useAuthDialog()

  const { toast } = useToast()
  const [saved, setSaved] = useState(isSaved)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleSave = async () => {
    if (!session) {
      setShowLoginDialog(true)
      return
    }

    setIsLoading(true)

    try {
      if (saved) {
        console.log("saved", saved)
        // const result = await removeSavedTool(toolId)
        // if (result.success) {
        //   setSaved(false)
        //   toast({
        //     title: "Tool removed",
        //     description: "The tool has been removed from your saved tools.",
        //   })
        // } else {
        //   toast({
        //     title: "Error",
        //     description: result.error || "Failed to remove tool. Please try again.",
        //     variant: "destructive",
        //   })
        // }
      } else {
        console.log("not saved", saved)
        // const result = await saveTool(toolId)
        // if (result.success) {
        //   setSaved(true)
        //   toast({
        //     title: "Tool saved",
        //     description: "The tool has been added to your saved tools.",
        //   })
        // } else {
        //   toast({
        //     title: "Error",
        //     description: result.error || "Failed to save tool. Please try again.",
        //     variant: "destructive",
        //   })
        // }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginDialog(false)
    // After successful login, try to save the tool
    handleSave()
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleSave}
        disabled={isLoading}
        className={className}
        aria-label={saved ? "Remove from saved tools" : "Save tool"}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {size !== "icon" && <span className="ml-2">{saved ? "Saved" : "Save"}</span>}
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to save tools</DialogTitle>
            <DialogDescription>
              You need to be logged in to save tools. Please login or create an account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" className="w-full" onClick={() => { openAuthDialog({ defaultTab: "login" }) }}>
              Log in
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => openAuthDialog({ defaultTab: "register" })}>
              Register
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

