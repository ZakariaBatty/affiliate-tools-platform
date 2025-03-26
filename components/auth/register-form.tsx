"use client"

import { signIn } from "next-auth/react"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertCircle, Lock, Mail, User } from "lucide-react"
import { registerSchema } from "@/lib/validation"
import { registerUser } from "@/app/actions/auth"
import { OAuthButtons } from "./oauth-buttons"

type RegisterFormProps = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  redirectUrl: string
  onSuccess?: () => void
  onOpenChange: (open: boolean) => void
  router: any
  setActiveTab: (tab: "login" | "register" | "reset") => void
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
}

export function RegisterForm({
  isLoading,
  setIsLoading,
  redirectUrl,
  onSuccess,
  onOpenChange,
  router,
  setActiveTab,
  error,
  setError,
}: RegisterFormProps) {
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Handle register
  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    try {
      const result = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if (!result.success) {
        setError(result.message || "Registration failed")
        return
      }

      console.log("Account created successfully")

      // Auto login after registration
      const loginResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (loginResult?.error) {
        setError(result.message || "Registration failed")
        setActiveTab("login")
        return
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(redirectUrl)
        router.refresh()
      }

      onOpenChange(false)
    } catch (error) {
      console.error("Registration error:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OAuth sign in
  async function handleOAuthSignIn(provider: "google" | "github") {
    setIsLoading(true)

    try {
      await signIn(provider, { callbackUrl: redirectUrl })
    } catch (error) {
      console.error(`${provider} sign in error:`, error)
      toast.error("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <Input
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      placeholder="John Doe"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
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
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {/* {isLoading ? "Signing in..." : "Sign In"} */}
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      <OAuthButtons isLoading={isLoading} handleOAuthSignIn={handleOAuthSignIn} />
    </div>
  )
}

