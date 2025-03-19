"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Plus, Upload, Check, AlertCircle } from "lucide-react"

interface AddToolDialogProps {
  children?: React.ReactNode
  trigger?: React.ReactNode
}

export function AddToolDialog({ children, trigger }: AddToolDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    website: "",
    logo: null as File | null,
    hasFreeVersion: false,
    monthlyPrice: "",
    yearlyPrice: "",
    features: [] as string[],
    additionalInfo: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.description || !formData.category) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Submitted tool:", formData)
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 2 seconds and close dialog
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          name: "",
          description: "",
          category: "",
          website: "",
          logo: null,
          hasFreeVersion: false,
          monthlyPrice: "",
          yearlyPrice: "",
          features: [],
          additionalInfo: "",
        })
        setIsOpen(false)
      }, 2000)
    }, 1500)
  }

  const categories = [
    "AI Tools",
    "Analytics",
    "Marketing",
    "Productivity",
    "Design",
    "Development",
    "Security",
    "HR & Team",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || children || (
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Your Tool
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add Your Tool</DialogTitle>
          <DialogDescription className="text-white/70">
            Submit your tool to be featured on our platform
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Submission Successful!</h3>
            <p className="text-center text-white/70">
              Thank you for submitting your tool. Our team will review it shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Tool Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., AI Writer Pro"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe what your tool does"
                    className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">
                    Website URL
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourtool.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-white">
                    Logo
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/10"
                      onClick={() => document.getElementById("logo")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <Input id="logo" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    {formData.logo && <span className="text-sm text-white/70">{formData.logo.name}</span>}
                  </div>
                  <p className="text-xs text-white/50">Recommended size: 300x300px, Max size: 2MB</p>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                    onClick={() => setActiveTab("pricing")}
                  >
                    Next: Pricing
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasFreeVersion"
                      checked={formData.hasFreeVersion}
                      onCheckedChange={(checked) => handleSwitchChange("hasFreeVersion", checked)}
                    />
                    <Label htmlFor="hasFreeVersion" className="text-white">
                      Free Version Available
                    </Label>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2">
                  <Label htmlFor="monthlyPrice" className="text-white">
                    Monthly Price (USD)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                    <Input
                      id="monthlyPrice"
                      name="monthlyPrice"
                      value={formData.monthlyPrice}
                      onChange={handleInputChange}
                      placeholder="29"
                      className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearlyPrice" className="text-white">
                    Yearly Price (USD)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                    <Input
                      id="yearlyPrice"
                      name="yearlyPrice"
                      value={formData.yearlyPrice}
                      onChange={handleInputChange}
                      placeholder="290"
                      className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => setActiveTab("basic")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                    onClick={() => setActiveTab("features")}
                  >
                    Next: Features
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Key Features</Label>
                  <div className="space-y-2">
                    {[
                      "AI Content Generation",
                      "Grammar Checking",
                      "Plagiarism Detection",
                      "SEO Optimization",
                      "Multiple Languages",
                      "Team Collaboration",
                      "API Access",
                      "Custom Templates",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Switch
                          id={`feature-${feature}`}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData((prev) => ({
                                ...prev,
                                features: [...prev.features, feature],
                              }))
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                features: prev.features.filter((f) => f !== feature),
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={`feature-${feature}`} className="text-white">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-white">
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any other details you'd like to share about your tool"
                    className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => setActiveTab("pricing")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Tool"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

