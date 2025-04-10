"use client"

import { useState } from "react"
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toolSchema } from "@/lib/admin-validations"
import { createTool } from "@/app/actions/admin/tools"
import { useToast } from "@/components/ui/use-toast"

export function AddToolSheet({
  addToolSheet,
  setAddToolSheet,
  setSidebarOpen,
  categories,
  tags
}: {
  addToolSheet: boolean
  setAddToolSheet: (open: boolean) => void
  setSidebarOpen: (open: boolean) => void
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
}) {
  const [features, setFeatures] = useState<string[]>([""])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [free, setFree] = useState(false)
  const [freeTrial, setFreeTrial] = useState(false)
  const [pricingModel, setPricingModel] = useState("Subscription")
  const [startingPrice, setStartingPrice] = useState("")

  const { toast } = useToast()

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    website: "",
    companyId: null,
    verified: false,
    featured: false,
  })

  const handleAddFeature = () => setFeatures([...features, ""])

  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features]
    updated[index] = value
    setFeatures(updated)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormValues((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    const data = {
      name: formValues.name,
      description: formValues.description,
      longDescription: formValues.longDescription,
      website: formValues.website,
      companyId: formValues.companyId,
      categories: selectedCategories,
      tags: selectedTags,
      verified: formValues.verified,
      featured: formValues.featured,
      pricing: {
        free,
        freeTrial,
        pricingModel,
        startingPrice,
      },
      features,
    }

    const parsed = toolSchema.safeParse(data)
    if (!parsed.success) {
      console.error("Validation failed", parsed.error.format())
      return
    }

    const result = await createTool(parsed.data)
    if (result.success) {
      console.log("Tool created:", result.tool)
      toast({
        variant: "default",
        title: "Tool created!",
        description: "Your tool has been successfully created.",
      })
      setAddToolSheet(false)
    } else {
      console.error("Failed to create tool:", result.error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Try again.",
      })
    }
  }

  return (
    <Sheet open={addToolSheet} onOpenChange={(open) => {
      setAddToolSheet(open)
      if (!open) setTimeout(() => setSidebarOpen(false), 300)
      else setSidebarOpen(true)
    }}>
      <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">

        <SheetHeader>
          <SheetTitle>Add New Tool</SheetTitle>
          <SheetDescription>Create a new tool listing</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 mt-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formValues.name} onChange={handleInputChange} className="col-span-3" placeholder="Enter tool name" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">Short Description</Label>
            <Textarea id="description" value={formValues.description} onChange={handleInputChange} className="col-span-3 min-h-[100px]" placeholder="Enter tool short description" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="longDescription" className="text-right pt-2">Long Description</Label>
            <Textarea id="longDescription" value={formValues.longDescription} onChange={handleInputChange} className="col-span-3 min-h-[100px]" placeholder="Enter tool long description" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Categories</Label>
            <div className="col-span-3">
              <Select onValueChange={(value) => {
                if (!selectedCategories.includes(value)) {
                  setSelectedCategories([...selectedCategories, value])
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 text-sm text-muted-foreground">
                Selected: {selectedCategories.length || "None"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Tags</Label>
            <div className="col-span-3">
              <Select onValueChange={(value) => {
                if (!selectedTags.includes(value)) {
                  setSelectedTags([...selectedTags, value])
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tags" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 text-sm text-muted-foreground">
                Selected: {selectedTags.length || "None"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">Website URL</Label>
            <Input id="website" value={formValues.website} onChange={handleInputChange} className="col-span-3" placeholder="Enter website URL" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Featured</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch id="featured" checked={formValues.featured} onCheckedChange={(val) => setFormValues(prev => ({ ...prev, featured: val }))} />
              <Label htmlFor="featured">Mark as featured</Label>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Verified</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch id="verified" checked={formValues.verified} onCheckedChange={(val) => setFormValues(prev => ({ ...prev, verified: val }))} />
              <Label htmlFor="verified">Mark as verified</Label>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Features</Label>
            <div className="col-span-3 space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {features.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveFeature(index)}>Delete</Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={handleAddFeature} variant="outline" size="sm">
                + Add Feature
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Pricing Options</Label>
            <div className="col-span-3 space-y-3">
              <div className="flex items-center space-x-4">
                <input type="checkbox" id="free" checked={free} onChange={() => setFree(!free)} />
                <Label htmlFor="free">Free</Label>
                <input type="checkbox" id="trial" checked={freeTrial} onChange={() => setFreeTrial(!freeTrial)} />
                <Label htmlFor="trial">Free Trial</Label>
              </div>

              <div className="space-y-1">
                <Label>Pricing Model</Label>
                <Select value={pricingModel} onValueChange={setPricingModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Subscription">Subscription</SelectItem>
                    <SelectItem value="One-time">One-time</SelectItem>
                    <SelectItem value="Freemium">Freemium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Starting Price</Label>
                <Input value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} placeholder="e.g., $9.99" />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => {
            setAddToolSheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-white text-black hover:bg-purple-600 hover:text-white">
            Create Tool
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
