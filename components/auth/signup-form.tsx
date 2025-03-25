
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"
import { SocialLoginButtons } from "./social-login-buttons"
import { register } from "@/app/actions/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignupFormProps {
  switchToLogin: () => void
  csrfToken?: string | null
}

export function SignupForm({ switchToLogin, csrfToken }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("csrfToken", csrfToken || "")


    // Simulate API call
    try {
      const result = await register(formData)

      if (result.success) {
        // Sign in the user after successful registration
        await signIn("credentials", { redirect: false, email, password })
        router.refresh()

      }

    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)

    }
  }

  return (
    <>
      <form onSubmit={handleSignup} className="space-y-4">
        {/* <Input id="csrftoken" type="text" name="csrftoken" value={csrfToken || ""} /> */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              required
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <SocialLoginButtons signUp={true} />

      <div className="mt-4 text-center text-sm text-white/50">
        <p>
          Already have an account?{" "}
          <Button variant="link" className="h-auto p-0 text-purple-400 hover:text-purple-300" onClick={switchToLogin}>
            Login
          </Button>
        </p>
      </div>
    </>
  )
}

