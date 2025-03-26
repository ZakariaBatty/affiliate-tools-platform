"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { AuthDialog } from "./auth-dialog"
import { useAuthDialog } from "@/hooks/use-auth-dialog"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, defaultTab, redirectUrl, onSuccess, open, close } = useAuthDialog()
  const pathname = usePathname()

  // Close dialog when navigating
  useEffect(() => {
    close()
  }, [pathname, close])

  return (
    <>
      {children}
      <AuthDialog
        open={isOpen}
        onOpenChange={close}
        defaultTab={defaultTab}
        redirectUrl={redirectUrl}
        onSuccess={onSuccess}
      />
    </>
  )
}

