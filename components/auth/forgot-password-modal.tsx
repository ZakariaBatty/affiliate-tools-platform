"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, AlertCircle } from "lucide-react"

interface ForgotPasswordModalProps {
  onClose: () => void
  step: number
  setStep: (step: number) => void
}

export function ForgotPasswordModal({ onClose, step, setStep }: ForgotPasswordModalProps) {
  const [resetEmail, setResetEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
      setStep(2)
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
      setStep(3)
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
      setStep(0)
      onClose()
      // Show success message
      setError("") // Clear any errors
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-black p-6">
        <h3 className="mb-4 text-xl font-bold text-white">
          {step === 1 && "Reset Your Password"}
          {step === 2 && "Verify Code"}
          {step === 3 && "Set New Password"}
        </h3>

        {step === 1 && (
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
                onClick={onClose}
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

        {step === 2 && (
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
                onClick={onClose}
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

        {step === 3 && (
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
                onClick={onClose}
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
  )
}

