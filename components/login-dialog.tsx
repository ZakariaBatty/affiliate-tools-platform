"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

interface LoginDialogProps {
  children?: React.ReactNode
  trigger?: React.ReactNode
}

export function LoginDialog({ children, trigger }: LoginDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Add these states after the existing useState declarations
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0) // 0: initial, 1: email sent, 2: verify code, 3: set new password
  const [resetEmail, setResetEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

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
      // setIsOpen(false)
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Signup with:", { name, email, password })
      setIsLoading(false)
      // For demo purposes, always succeed
      // setIsOpen(false)
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(`Login with ${provider}`)
      setIsLoading(false)
      // For demo purposes, always succeed
      // setIsOpen(false)
    }, 1500)
  }

  // Add these handlers after the existing handler functions
  const handleForgotPassword = () => {
    setForgotPasswordStep(1)
  }

  const handleSendResetCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!resetEmail) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Sending reset code to:", resetEmail)
      setIsLoading(false)
      setForgotPasswordStep(2)
    }, 1500)
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!verificationCode) {
      setError("Please enter the verification code")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Verifying code:", verificationCode)
      setIsLoading(false)
      setForgotPasswordStep(3)
    }, 1500)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword || !confirmNewPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Resetting password")
      setIsLoading(false)
      setForgotPasswordStep(0)
      setActiveTab("login")
      // Show success message
      setError("") // Clear any errors
    }, 1500)
  }

  const handleBackToLogin = () => {
    setForgotPasswordStep(0)
    setResetEmail("")
    setVerificationCode("")
    setNewPassword("")
    setConfirmNewPassword("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || children || (
          <Button variant="outline" className="border-white/10  hover:bg-white/10 hover:text-white">
            Login
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-white">Welcome to ToolsHub</DialogTitle>
          <DialogDescription className="text-center text-white/70">
            {activeTab === "login" ? "Sign in to your account to continue" : "Create an account to get started"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
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
                    onClick={handleForgotPassword}
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

            {/* Forgot Password Flow */}
            {forgotPasswordStep > 0 && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div className="w-full max-w-md rounded-lg border border-white/10 bg-black p-6">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    {forgotPasswordStep === 1 && "Reset Your Password"}
                    {forgotPasswordStep === 2 && "Verify Code"}
                    {forgotPasswordStep === 3 && "Set New Password"}
                  </h3>

                  {forgotPasswordStep === 1 && (
                    <form onSubmit={handleSendResetCode} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email" className="text-white">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="name@example.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                          />
                        </div>
                        <p className="text-xs text-white/70">We'll send a verification code to this email address</p>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-white/10 text-white hover:bg-white/10"
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-white text-black hover:bg-purple-600 hover:text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Send Code"}
                        </Button>
                      </div>
                    </form>
                  )}

                  {forgotPasswordStep === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="verification-code" className="text-white">
                          Verification Code
                        </Label>
                        <Input
                          id="verification-code"
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        />
                        <p className="text-xs text-white/70">Enter the 6-digit code we sent to {resetEmail}</p>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-white/10 text-white hover:bg-white/10"
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-white text-black hover:bg-purple-600 hover:text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying..." : "Verify Code"}
                        </Button>
                      </div>
                    </form>
                  )}

                  {forgotPasswordStep === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-white">
                          New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-new-password" className="text-white">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                          <Input
                            id="confirm-new-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
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

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-white/10 text-white hover:bg-white/10"
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-white text-black hover:bg-purple-600 hover:text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Updating..." : "Reset Password"}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-black px-2 text-white/50">Or continue with</span>
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
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignup} className="space-y-4">
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

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-black px-2 text-white/50">Or sign up with</span>
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
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-sm text-white/50">
          {activeTab === "login" ? (
            <p>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="h-auto p-0 text-purple-400 hover:text-purple-300"
                onClick={() => setActiveTab("signup")}
              >
                Sign up
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button
                variant="link"
                className="h-auto p-0 text-purple-400 hover:text-purple-300"
                onClick={() => setActiveTab("login")}
              >
                Login
              </Button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

