'use client'
// This is a Server Component that serves as the parent
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoginSignupTabs } from "./login-signup-tabs"
import { generateClientCsrfToken } from "@/lib/csrf"
import { useEffect, useState } from "react"

export function AuthDialog() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    // Generate CSRF token on the client side
    const token = generateClientCsrfToken()
    setCsrfToken(token)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/10 hover:bg-white/10 hover:text-white bg-white text-black/70">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black border-white/10">
        <LoginSignupTabs csrfToken={csrfToken} />
      </DialogContent>
    </Dialog>
  )
}

