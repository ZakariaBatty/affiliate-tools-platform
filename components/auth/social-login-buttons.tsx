"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

interface SocialLoginButtonsProps {
  signUp?: boolean
}

export function SocialLoginButtons({ signUp = false }: SocialLoginButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(`Login with ${provider}`)
      setIsLoading(false)
      // For demo purposes, always succeed
    }, 1500)
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-black px-2 text-white/50">{signUp ? "Or sign up with" : "Or continue with"}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/10 text-white hover:bg-white/10"
          onClick={() => handleSocialLogin("GitHub")}
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/10 text-white hover:bg-white/10"
          onClick={() => handleSocialLogin("Google")}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  )
}

