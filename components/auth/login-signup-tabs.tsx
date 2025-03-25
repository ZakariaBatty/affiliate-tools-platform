"use client"

import { useState } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { ForgotPasswordModal } from "./forgot-password-modal"

interface LoginSignupTabsProps {
  csrfToken?: string | null
}

export function LoginSignupTabs({ csrfToken }: LoginSignupTabsProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0)

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
    setForgotPasswordStep(0)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl text-center text-white">Welcome to ToolsHub</DialogTitle>
        <DialogDescription className="text-center text-white/70">
          {activeTab === "login" ? "Sign in to your account to continue" : "Create an account to get started"}
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="login" >Login</TabsTrigger>
          <TabsTrigger value="signup" >Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-4">
          <LoginForm onForgotPassword={handleForgotPassword} switchToSignup={() => setActiveTab("signup")} />
        </TabsContent>

        <TabsContent value="signup" className="mt-4">
          <SignupForm csrfToken={csrfToken} switchToLogin={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>

      {showForgotPassword && (
        <ForgotPasswordModal onClose={handleBackToLogin} step={forgotPasswordStep} setStep={setForgotPasswordStep} />
      )}
    </>
  )
}

