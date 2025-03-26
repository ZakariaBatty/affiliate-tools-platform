"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ResetPasswordForm } from "./reset-password-form"

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
  const [error, setError] = useState<string>("")

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
            <LoginForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              redirectUrl={redirectUrl}
              onSuccess={onSuccess}
              onOpenChange={onOpenChange}
              router={router}
            />
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <RegisterForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              redirectUrl={redirectUrl}
              onSuccess={onSuccess}
              onOpenChange={onOpenChange}
              router={router}
              setActiveTab={setActiveTab}
              error={error}
              setError={setError}
            />
          </TabsContent>

          {/* Reset Password Tab */}
          <TabsContent value="reset">
            <ResetPasswordForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              resetRequested={resetRequested}
              setResetRequested={setResetRequested}
              resetToken={resetToken}
              setResetToken={setResetToken}
              setActiveTab={setActiveTab}
            />
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

