"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"
import { SocialLoginButtons } from "./social-login-buttons"
import { register } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

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

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("csrfToken", csrfToken || "")

      const result = await register(formData)
      console.log("Registration result:", result)

      if (result.error) {
        setError(typeof result.error === "string" ? result.error : "Registration failed")
        setIsLoading(false)
        return
      }

      if (result.success) {
        try {
          // Sign in the user after successful registration
          const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })

          console.log("Sign in result:", signInResult)

          if (signInResult?.error) {
            setError(signInResult.error || "Failed to sign in after registration")
          } else {
            // Successfully signed in
            // router.push("/") //
            // router.refresh()
          }
        } catch (signInError) {
          console.error("Sign in error:", signInError)
          setError("Registration successful, but sign-in failed. Please try logging in.")
          switchToLogin()
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSignup} className="space-y-4">
        <input type="hidden" name="csrfToken" value={csrfToken || ""} />

        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="name"
              name="name"
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
              name="email"
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
              name="password"
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

