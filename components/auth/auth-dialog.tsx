"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { registerUser, resetPassword, requestPasswordReset } from "@/app/actions/auth"
import { FcGoogle } from "react-icons/fc"
import { Github, Lock, Mail, User } from "lucide-react"
import { loginSchema, newPasswordSchema, registerSchema, resetSchema } from "@/lib/validation"



type AuthDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: "login" | "register" | "reset"
  redirectUrl?: string
  onSuccess?: () => void
}

export function AuthDialog({
  open,
  onOpenChange,
  defaultTab = "login",
  redirectUrl = "/",
  onSuccess,
}: AuthDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">(defaultTab)
  const [resetRequested, setResetRequested] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

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

  // Handle login
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
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
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle register
  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    try {
      const result = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      console.log({ result })
      if (!result.success) {
        toast.error(result.message || "Registration failed")
        return
      }

      toast.success("Account created successfully")

      // Auto login after registration
      const loginResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (loginResult?.error) {
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
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>Sign in to your account or create a new one</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="reset">Reset</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <div className="space-y-4 py-2 pb-4">
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
                              <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                                placeholder="email@example.com" {...field} />
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
                              <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                                type="password" placeholder="********" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          {/* <Spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                          Please wait
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>

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
              </div>
            </div>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
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
                            <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50" placeholder="John Doe" {...field} />
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
                            <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                              placeholder="email@example.com" {...field} />
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
                            <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                              type="password" placeholder="********" {...field} />
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
                            <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                              type="password" placeholder="********" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                        Please wait
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>

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
            </div>
          </TabsContent>

          {/* Reset Password Tab */}
          <TabsContent value="reset">
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
                              <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                                placeholder="email@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                          Please wait
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
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
                              <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                                type="password" placeholder="********" {...field} />
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
                              <Input className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                                type="password" placeholder="********" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                          Please wait
                        </>
                      ) : (
                        "Reset Password"
                      )}
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
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0">
          {activeTab === "login" && (
            <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab("reset")}>
              Forgot password?
            </Button>
          )}
          {activeTab === "register" && (
            <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab("login")}>
              Already have an account?
            </Button>
          )}
          {activeTab === "reset" && !resetRequested && (
            <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab("login")}>
              Remember your password?
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

