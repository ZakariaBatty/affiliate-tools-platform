"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Check, Upload, AlertCircle, Globe, Mail, MapPin, Phone } from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanySettingsPage() {
  const [activeTab, setActiveTab] = useState("company")
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Mock company data
  const [companyData, setCompanyData] = useState({
    name: "Acme Corporation",
    website: "https://acmecorp.com",
    description: "Leading provider of innovative software solutions for businesses of all sizes.",
    logo: "/placeholder.svg?height=100&width=100",
    address: "123 Tech Avenue, San Francisco, CA 94103",
    phone: "+1 (555) 123-4567",
    email: "contact@acmecorp.com",
    socialLinks: {
      twitter: "https://twitter.com/acmecorp",
      linkedin: "https://linkedin.com/company/acmecorp",
      facebook: "https://facebook.com/acmecorp",
    },
    notifications: {
      email: true,
      browser: true,
      marketing: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setCompanyData((prev) => ({
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
      console.log("Saved company profile:", companyData)
      setIsSaving(false)
      setIsSuccess(true)

      // Reset success message after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    }, 1000)
  }

  return (
    <CompanyDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Company Settings</h1>
        <p className="text-white/70">Manage your company profile and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Company Information</CardTitle>
              <CardDescription className="text-white/70">
                Update your company details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={companyData.logo} alt={companyData.name} />
                  <AvatarFallback className="bg-purple-600 text-white text-xl">AC</AvatarFallback>
                </Avatar>

                <div>
                  <Button variant="outline" size="sm" className="border-white/10 hover:text-white hover:bg-white/10">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Logo
                  </Button>
                  <p className="mt-1 text-xs text-white/50">Recommended: 512x512px PNG or JPG file</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">
                    Website
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/10 bg-white/5 px-3 text-white/50">
                      <Globe className="h-4 w-4" />
                    </div>
                    <Input
                      id="website"
                      name="website"
                      value={companyData.website}
                      onChange={handleInputChange}
                      className="rounded-l-none border-white/10 bg-white/5 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Company Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={companyData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px] border-white/10 bg-white/5 text-white"
                />
                <p className="text-xs text-white/50">This will be displayed on your public profile</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">
                    Address
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/10 bg-white/5 px-3 text-white/50">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <Input
                      id="address"
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                      className="rounded-l-none border-white/10 bg-white/5 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/10 bg-white/5 px-3 text-white/50">
                      <Phone className="h-4 w-4" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      value={companyData.phone}
                      onChange={handleInputChange}
                      className="rounded-l-none border-white/10 bg-white/5 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Contact Email
                </Label>
                <div className="flex">
                  <div className="flex items-center rounded-l-md border border-r-0 border-white/10 bg-white/5 px-3 text-white/50">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={companyData.email}
                    onChange={handleInputChange}
                    className="rounded-l-none border-white/10 bg-white/5 text-white"
                  />
                </div>
              </div>

              {isSuccess && (
                <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-green-500">
                  <Check className="h-4 w-4" />
                  <span>Company profile updated successfully!</span>
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
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Social Media Links</CardTitle>
              <CardDescription className="text-white/70">Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-white">
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={companyData.socialLinks.twitter}
                    onChange={handleSocialLinkChange}
                    className="border-white/10 bg-white/5 text-white"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-white">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={companyData.socialLinks.linkedin}
                    onChange={handleSocialLinkChange}
                    className="border-white/10 bg-white/5 text-white"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-white">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={companyData.socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                  className="border-white/10 bg-white/5 text-white"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  onClick={handleSaveProfile}
                >
                  Save Social Links
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Brand Settings</CardTitle>
              <CardDescription className="text-white/70">
                Customize how your brand appears on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white">Brand Colors</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="primaryColor" className="text-sm text-white/70">
                        Primary Color
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-md bg-purple-600" />
                        <Input
                          id="primaryColor"
                          defaultValue="#9333ea"
                          className="border-white/10 bg-white/5 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor" className="text-sm text-white/70">
                        Secondary Color
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-md bg-blue-500" />
                        <Input
                          id="secondaryColor"
                          defaultValue="#3b82f6"
                          className="border-white/10 bg-white/5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2">
                  <Label className="text-white">Brand Assets</Label>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-sm text-white/70">
                        Logo
                      </Label>
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-white/5 p-6">
                        <Avatar className="mb-4 h-16 w-16">
                          <AvatarImage src={companyData.logo} alt={companyData.name} />
                          <AvatarFallback className="bg-purple-600 text-white">AC</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="border-white/10 hover:text-white hover:bg-white/10">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                        <p className="mt-2 text-xs text-center text-white/50">512x512px recommended</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="banner" className="text-sm text-white/70">
                        Banner Image
                      </Label>
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-white/5 p-6">
                        <div className="mb-4 h-16 w-full rounded-md bg-gradient-to-r from-purple-600 to-blue-500" />
                        <Button variant="outline" size="sm" className="border-white/10 hover:text-white hover:bg-white/10">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Banner
                        </Button>
                        <p className="mt-2 text-xs text-center text-white/50">1200x300px recommended</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    Save Branding
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-white/70">Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                      <p className="text-xs text-white/70">Receive notifications about your account via email</p>
                    </div>
                    <Switch
                      checked={companyData.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Browser Notifications</h4>
                      <p className="text-xs text-white/70">Receive notifications in your browser</p>
                    </div>
                    <Switch
                      checked={companyData.notifications.browser}
                      onCheckedChange={(checked) => handleNotificationChange("browser", checked)}
                    />
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Marketing Emails</h4>
                      <p className="text-xs text-white/70">Receive emails about new features and promotions</p>
                    </div>
                    <Switch
                      checked={companyData.notifications.marketing}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-white/70">Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 text-sm font-medium text-white">Two-Factor Authentication</h4>
                  <p className="mb-4 text-sm text-white/70">Add an extra layer of security to your account</p>
                  <Button variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
                    Enable 2FA
                  </Button>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 text-sm font-medium text-white">Password</h4>
                  <p className="mb-4 text-sm text-white/70">Update your account password</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-white">
                        Current Password
                      </Label>
                      <Input id="current-password" type="password" className="border-white/10 bg-white/5 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-white">
                        New Password
                      </Label>
                      <Input id="new-password" type="password" className="border-white/10 bg-white/5 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" className="border-white/10 bg-white/5 text-white" />
                    </div>

                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      Update Password
                    </Button>
                  </div>
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
                      <Button size="sm" variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-0 space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">API Access</CardTitle>
              <CardDescription className="text-white/70">Manage API keys and access to your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">API Keys</h4>
                      <p className="text-xs text-white/70">Create and manage API keys for accessing your data</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      Generate New Key
                    </Button>
                  </div>

                  <div className="mt-4">
                    <div className="rounded-md border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Production API Key</p>
                          <p className="text-xs text-white/70">Created on Mar 10, 2025</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10 hover:text-white hover:bg-white/10">
                          Revoke
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Input
                          value="sk_live_••••••••••••••••••••••••••••••"
                          readOnly
                          className="border-white/10 bg-white/5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 text-sm font-medium text-white">Webhooks</h4>
                  <p className="mb-4 text-sm text-white/70">Configure webhooks to receive real-time updates</p>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-url" className="text-white">
                      Webhook URL
                    </Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-domain.com/webhook"
                      className="border-white/10 bg-white/5 text-white"
                    />
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <Switch id="webhook-enabled" />
                    <Label htmlFor="webhook-enabled" className="text-white">
                      Enable webhooks
                    </Label>
                  </div>

                  <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    Save Webhook Settings
                  </Button>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 text-sm font-medium text-white">API Documentation</h4>
                  <p className="mb-4 text-sm text-white/70">
                    Learn how to integrate with our API and access your data programmatically
                  </p>
                  <Button variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
                    View Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </CompanyDashboardLayout>
  )
}

