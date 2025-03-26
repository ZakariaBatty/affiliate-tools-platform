"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Github } from "lucide-react"

type OAuthButtonsProps = {
  isLoading: boolean
  handleOAuthSignIn: (provider: "google" | "github") => Promise<void>
}

export function OAuthButtons({ isLoading, handleOAuthSignIn }: OAuthButtonsProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => handleOAuthSignIn("google")} disabled={isLoading}>
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" onClick={() => handleOAuthSignIn("github")} disabled={isLoading}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </>
  )
}

