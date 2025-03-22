"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Building, Save, Upload, AlertTriangle, CheckCircle, Key, CreditCardIcon, DollarSign, Eye } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [stripeConnected, setStripeConnected] = useState(true)
  const [paypalConnected, setPaypalConnected] = useState(false)
  const [confirmDisconnectSheet, setConfirmDisconnectSheet] = useState(false)
  const [paymentProvider, setPaymentProvider] = useState(null)

  const handleDisconnectProvider = (provider: any) => {
    setPaymentProvider(provider)
    setConfirmDisconnectSheet(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage your platform settings and configurations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Affiliate Tools Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email Address</Label>
                  <Input id="company-email" type="email" defaultValue="contact@affiliatetools.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" type="url" defaultValue="https://affiliatetools.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Textarea id="company-address" defaultValue="123 Marketing Street, San Francisco, CA 94103, USA" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  defaultValue="Affiliate Tools Platform is the leading solution for managing and optimizing affiliate marketing campaigns."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo & Branding</CardTitle>
              <CardDescription>Customize your platform's visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Logo</Label>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Favicon</Label>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" defaultValue="#6D28D9" className="flex-1" />
                  <div className="w-10 h-10 rounded-md bg-purple-600 border"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Providers</CardTitle>
              <CardDescription>Connect and manage your payment processing services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#6772E5] flex items-center justify-center">
                      <CreditCardIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-muted-foreground">Process credit card payments securely</p>
                      {stripeConnected ? (
                        <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1">
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    {stripeConnected ? (
                      <Button variant="outline" onClick={() => handleDisconnectProvider("stripe")}>
                        Disconnect
                      </Button>
                    ) : (
                      <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Connect</Button>
                    )}
                  </div>
                </div>

                {stripeConnected && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Account ID</p>
                        <p className="font-mono text-sm">acct_1a2b3c4d5e6f7g8h9i</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stripe-mode">Test Mode</Label>
                        <Switch id="stripe-mode" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        When enabled, all transactions will use the Stripe test environment
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#0070BA] flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                      {paypalConnected ? (
                        <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1">
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    {paypalConnected ? (
                      <Button variant="outline" onClick={() => handleDisconnectProvider("paypal")}>
                        Disconnect
                      </Button>
                    ) : (
                      <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Connect</Button>
                    )}
                  </div>
                </div>

                {paypalConnected && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Merchant ID</p>
                        <p className="font-mono text-sm">MRCNT123456789</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="paypal-mode">Sandbox Mode</Label>
                        <Switch id="paypal-mode" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        When enabled, all transactions will use the PayPal sandbox environment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure how payments are processed on your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                    <SelectItem value="aud">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-invoice">Automatic Invoicing</Label>
                  <Switch id="auto-invoice" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically generate and send invoices for subscription renewals
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-reminders">Payment Reminders</Label>
                  <Switch id="payment-reminders" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Send email reminders before subscription renewal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-days">Reminder Days Before Renewal</Label>
                <Select defaultValue="7">
                  <SelectTrigger id="reminder-days">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Require administrators to use 2FA when logging in</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-expiry">Password Expiry</Label>
                  <Switch id="password-expiry" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Force password reset after a certain period</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry-days">Password Expiry Period</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="password-expiry-days">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout-minutes">Timeout Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="timeout-minutes">
                    <SelectValue placeholder="Select minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-enabled">Enable API Access</Label>
                  <Switch id="api-enabled" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow external applications to access your platform via API
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    value="sk_live_51Abcdefghijklmnopqrstuvwxyz"
                    readOnly
                    className="font-mono flex-1"
                  />
                  <Button variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Key className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep this key secret. Do not share it in public repositories or client-side code.
                </p>
              </div>

              <div className="space-y-2">
                <Label>API Rate Limiting</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate-limit" className="text-sm">
                      Requests per minute
                    </Label>
                    <Input id="rate-limit" type="number" defaultValue="60" />
                  </div>
                  <div>
                    <Label htmlFor="rate-burst" className="text-sm">
                      Burst limit
                    </Label>
                    <Input id="rate-burst" type="number" defaultValue="100" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications are sent to administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-user">New User Registration</Label>
                  <Switch id="notify-new-user" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receive notifications when new users register</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-company">New Company Registration</Label>
                  <Switch id="notify-new-company" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receive notifications when new companies register</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-tool">New Tool Submission</Label>
                  <Switch id="notify-new-tool" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receive notifications when new tools are submitted</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-payment">Payment Notifications</Label>
                  <Switch id="notify-payment" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for successful and failed payments
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-subscription">Subscription Changes</Label>
                  <Switch id="notify-subscription" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when users upgrade, downgrade, or cancel subscriptions
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Recipients</CardTitle>
              <CardDescription>Configure who receives administrative notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-email">Primary Admin Email</Label>
                <Input id="primary-email" type="email" defaultValue="admin@affiliatetools.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-emails">Additional Recipients</Label>
                <Textarea
                  id="additional-emails"
                  placeholder="Enter email addresses, one per line"
                  defaultValue="support@affiliatetools.com&#10;tech@affiliatetools.com"
                />
                <p className="text-sm text-muted-foreground">Enter one email address per line</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="digest-mode">Daily Digest Mode</Label>
                  <Switch id="digest-mode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Combine all daily notifications into a single email digest
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your admin dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" defaultValue="#6D28D9" className="flex-1" />
                  <div className="w-10 h-10 rounded-md bg-purple-600 border"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input id="secondary-color" defaultValue="#8B5CF6" className="flex-1" />
                  <div className="w-10 h-10 rounded-md bg-purple-500 border"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rounded-corners">Rounded Corners</Label>
                  <Switch id="rounded-corners" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Use rounded corners for UI elements</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>Configure the layout of your admin dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sidebar-position">Sidebar Position</Label>
                <Select defaultValue="left">
                  <SelectTrigger id="sidebar-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <Switch id="compact-mode" />
                </div>
                <p className="text-sm text-muted-foreground">Use a more compact layout with less whitespace</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sticky-header">Sticky Header</Label>
                  <Switch id="sticky-header" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Keep the header visible when scrolling</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-width">Content Width</Label>
                <Select defaultValue="full">
                  <SelectTrigger id="content-width">
                    <SelectValue placeholder="Select width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contained">Contained</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirm Disconnect Sheet */}
      <Sheet open={confirmDisconnectSheet} onOpenChange={setConfirmDisconnectSheet}>
        <SheetContent className="sm:max-w-[500px]" side="right">
          <SheetHeader>
            <SheetTitle>Disconnect Payment Provider</SheetTitle>
            <SheetDescription>
              Are you sure you want to disconnect {paymentProvider === "stripe" ? "Stripe" : "PayPal"}? This will affect
              payment processing on your platform.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center py-8">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Warning:</strong> Disconnecting this payment provider will prevent new payments from being
              processed through this method. Existing subscriptions may be affected.
            </p>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setConfirmDisconnectSheet(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (paymentProvider === "stripe") setStripeConnected(false)
                if (paymentProvider === "paypal") setPaypalConnected(false)
                setConfirmDisconnectSheet(false)
              }}
            >
              Disconnect
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

