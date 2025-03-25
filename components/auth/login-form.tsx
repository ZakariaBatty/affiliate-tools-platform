"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react"
import { SocialLoginButtons } from "./social-login-buttons"

interface LoginFormProps {
  onForgotPassword: () => void
  switchToSignup: () => void
}

export function LoginForm({ onForgotPassword, switchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Login with:", { email, password })
      setIsLoading(false)
      // For demo purposes, always succeed
    }, 1500)
  }

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-purple-400 hover:text-purple-300"
              onClick={onForgotPassword}
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
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
          {isLoading ? "Logging in..." : "Login"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <SocialLoginButtons />

      <div className="mt-4 text-center text-sm text-white/50">
        <p>
          Don't have an account?{" "}
          <Button variant="link" className="h-auto p-0 text-purple-400 hover:text-purple-300" onClick={switchToSignup}>
            Sign up
          </Button>
        </p>
      </div>
    </>
  )
}

