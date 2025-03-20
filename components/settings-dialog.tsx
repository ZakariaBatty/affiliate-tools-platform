"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check, Upload, AlertCircle, User, Mail, Bell, CreditCard, Shield, LogOut } from "lucide-react"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Product manager and tech enthusiast. Always looking for new tools to improve workflow.",
    avatar: "/placeholder.svg?height=100&width=100",
    currentPlan: "Pro",
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }))
  }

  const handleSaveProfile = () => {
    setError("")
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Saved profile:", userData)
      setIsSaving(false)
      setIsSuccess(true)

      // Reset success message after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    }, 1000)
  }

  // Mock plans data
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic access to the platform",
      features: ["Save up to 5 tools", "Basic comparison", "Limited tool details"],
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Enhanced features for power users",
      features: [
        "Save unlimited tools",
        "Advanced comparison",
        "Full tool details",
        "Performance tracking",
        "Email support",
      ],
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      period: "per month",
      description: "Complete solution for teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom reports",
        "Dedicated support",
        "White-label options",
      ],
      current: false,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange} side="right">
      <SheetContent className="w-full max-w-md border-white/10 bg-black p-0 sm:max-w-xl md:max-w-[80%]">
        <div className="flex h-full flex-col overflow-hidden">
          <SheetHeader className="border-b border-white/10 bg-white/5 p-6">
            <SheetTitle className="text-xl text-white">Settings</SheetTitle>
            <SheetDescription className="text-white/70">Manage your account settings and preferences</SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/4 border-r border-white/10 bg-white/5">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "profile" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "account" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
                      onClick={() => setActiveTab("account")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "plans" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
                      onClick={() => setActiveTab("plans")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Plans
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "notifications" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "security" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                  </li>
                </ul>

                <Separator className="my-4 bg-white/10" />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </div>

            <div className="w-3/4 flex-1 overflow-y-auto p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="profile" className="mt-0 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="bg-purple-600 text-white">JD</AvatarFallback>
                    </Avatar>

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white border-white/10 text-black hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      className="min-h-[100px] bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  {isSuccess && (
                    <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-green-500">
                      <Check className="h-4 w-4" />
                      <span>Profile updated successfully!</span>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      className="bg-white text-black hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white transition-colors"
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="mt-0 space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">Current Plan</h3>
                        <p className="text-sm text-white/70">
                          You are currently on the{" "}
                          <span className="font-medium text-purple-500">{userData.currentPlan}</span> plan
                        </p>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                        {userData.currentPlan}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-white">
                      Current Password
                    </Label>
                    <Input id="current-password" type="password" className="bg-white/5 border-white/10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white">
                      New Password
                    </Label>
                    <Input id="new-password" type="password" className="bg-white/5 border-white/10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" className="bg-white/5 border-white/10 text-white" />
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      Update Password
                    </Button>
                  </div>

                  <Separator className="my-4 bg-white/10" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Danger Zone</h3>
                    <p className="text-sm text-white/70">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700">
                      Delete Account
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="plans" className="mt-0 space-y-4">
                  <h3 className="text-lg font-medium text-white">Available Plans</h3>
                  <p className="text-sm text-white/70">Choose the plan that best fits your needs</p>

                  <div className="grid gap-4 md:grid-cols-3">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`border-white/10 ${
                          plan.current
                            ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/50"
                            : "bg-white/5"
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-white">{plan.name}</CardTitle>
                          <CardDescription className="text-white/70">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <span className="text-3xl font-bold text-white">{plan.price}</span>
                            <span className="text-white/70"> {plan.period}</span>
                          </div>

                          <ul className="mb-6 space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-white/70">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <Button
                            className={
                              plan.current
                                ? "w-full bg-purple-600 text-white hover:bg-purple-700"
                                : "w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                            }
                            disabled={plan.current}
                          >
                            {plan.current ? "Current Plan" : "Upgrade"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 mt-4">
                    <h4 className="mb-2 text-sm font-medium text-white">Need a custom plan?</h4>
                    <p className="text-sm text-white/70">
                      Contact our sales team for custom enterprise solutions tailored to your needs.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2 bg-white border-white/10 text-black hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Preferences</h3>
                  <p className="text-sm text-white/70">Manage how you receive notifications</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                        <p className="text-xs text-white/70">Receive notifications about your account via email</p>
                      </div>
                      <Switch
                        checked={userData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                        <p className="text-xs text-white/70">Receive notifications in your browser</p>
                      </div>
                      <Switch
                        checked={userData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Marketing Emails</h4>
                        <p className="text-xs text-white/70">Receive emails about new features and promotions</p>
                      </div>
                      <Switch
                        checked={userData.notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                      onClick={handleSaveProfile}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-4">
                  <h3 className="text-lg font-medium text-white">Security Settings</h3>
                  <p className="text-sm text-white/70">Manage your account security settings</p>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-2 text-sm font-medium text-white">Two-Factor Authentication</h4>
                    <p className="mb-4 text-sm text-white/70">Add an extra layer of security to your account</p>
                    <Button
                      variant="outline"
                      className="bg-white border-white/10 text-black hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-2 text-sm font-medium text-white">Active Sessions</h4>
                    <p className="mb-4 text-sm text-white/70">
                      Manage your active sessions and sign out from other devices
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Current Session</p>
                          <p className="text-xs text-white/70">Windows • Chrome • New York, USA</p>
                        </div>
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Mobile App</p>
                          <p className="text-xs text-white/70">iOS • iPhone • Last active 2 days ago</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-white/10 text-black hover:bg-purple-600 hover:text-white transition-colors"
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

