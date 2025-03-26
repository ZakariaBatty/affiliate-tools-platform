"use client"

import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Lock, Mail } from "lucide-react"
import { newPasswordSchema, resetSchema } from "@/lib/validation"
import { requestPasswordReset, resetPassword } from "@/app/actions/auth"

type ResetPasswordFormProps = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  resetRequested: boolean
  setResetRequested: (requested: boolean) => void
  resetToken: string | null
  setResetToken: (token: string | null) => void
  setActiveTab: (tab: "login" | "register" | "reset") => void
}

export function ResetPasswordForm({
  isLoading,
  setIsLoading,
  resetRequested,
  setResetRequested,
  resetToken,
  setResetToken,
  setActiveTab,
}: ResetPasswordFormProps) {
  // Reset password form
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  })

  // New password form
  const newPasswordForm = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Handle reset password request
  async function onResetSubmit(values: z.infer<typeof resetSchema>) {
    setIsLoading(true)

    try {
      const result = await requestPasswordReset(values.email)

      if (!result.success) {
        toast.error(result.message || "Failed to send reset email")
        return
      }

      setResetRequested(true)
      toast.success("Password reset email sent")
    } catch (error) {
      console.error("Reset request error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle new password submission
  async function onNewPasswordSubmit(values: z.infer<typeof newPasswordSchema>) {
    if (!resetToken) {
      toast.error("Reset token is missing")
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPassword({
        token: resetToken,
        password: values.password,
      })

      if (!result.success) {
        toast.error(result.message || "Failed to reset password")
        return
      }

      toast.success("Password reset successfully")
      setActiveTab("login")
      setResetToken(null)
    } catch (error) {
      console.error("Password reset error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      {!resetRequested ? (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
            <FormField
              control={resetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <Input
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Please wait" : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      ) : resetToken ? (
        <Form {...newPasswordForm}>
          <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-4">
            <FormField
              control={newPasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <Input
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newPasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <Input
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Please wait" : "Reset Password"}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center space-y-4">
          <p>Check your email for a password reset link.</p>
          <Button variant="outline" onClick={() => setResetRequested(false)} className="w-full">
            Try Again
          </Button>
          <Button variant="link" onClick={() => setActiveTab("login")} className="w-full">
            Back to Login
          </Button>
        </div>
      )}
    </div>
  )
}
