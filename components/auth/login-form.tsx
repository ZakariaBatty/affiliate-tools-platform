"use client"
import { signIn } from "next-auth/react"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Lock, Mail } from "lucide-react"
import { loginSchema } from "@/lib/validation"
import { OAuthButtons } from "./oauth-buttons"
import { AlertAuth } from "../alert/alert-destructive"

type LoginFormProps = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  redirectUrl: string
  onSuccess?: () => void
  onOpenChange: (open: boolean) => void
  router: any,
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
}

export function LoginForm({ isLoading, setIsLoading, redirectUrl, onSuccess, onOpenChange, router, error, setError }: LoginFormProps) {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Handle login
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      console.log(result)

      if (result?.error) {
        // Handle specific error types from NextAuth
        switch (result.error) {
          case "CredentialsSignin":
            setError("Invalid email or password")
            break
          case "EmailSignInError":
            setError("Email sign-in failed. Please check your email address.")
            break
          case "AccessDenied":
            setError("Access denied. You don't have permission to sign in.")
            break
          case "OAuthSignin":
          case "OAuthCallback":
          case "OAuthCreateAccount":
          case "OAuthAccountNotLinked":
            setError("There was a problem with the OAuth sign-in. Please try again.")
            break
          case "SessionRequired":
            setError("You must be signed in to access this page.")
            break
          default:
            // Check if the error message contains specific information
            if (result.error.includes("user") && result.error.includes("not found")) {
              setError("User not found. Please check your email or register a new account.")
            } else if (result.error.includes("password") && result.error.includes("incorrect")) {
              setError("Incorrect password or email. Please try again.")
            } else {
              setError(`Authentication failed: ${result.error}`)
            }
        }
        return
      }

      if (!result?.ok) {
        setError("Sign-in failed. Please try again.")
        return
      }

      toast.success("Logged in successfully")

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(redirectUrl)
        router.refresh()
      }

      onOpenChange(false)
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle network errors or unexpected exceptions
      if (error.message?.includes("fetch")) {
        setError("Network error. Please check your internet connection.")
      } else if (error.message?.includes("timeout")) {
        setError("Request timed out. Please try again.")
      } else {
        setError("Something went wrong. Please try again later.")
      }
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
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      {error && (
        <AlertAuth message={error} success={false} />
      )}
      <div className="space-y-2">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Please wait" : "Sign In"}
            </Button>
          </form>
        </Form>

        <OAuthButtons isLoading={isLoading} handleOAuthSignIn={handleOAuthSignIn} />
      </div>
    </div>
  )
}

