"use client"

import { useEffect, useState } from "react"
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"
import { toolSchema } from "@/lib/admin-validations"
import { updateTool } from "@/app/actions/admin/tools"
import { useToast } from "@/components/ui/use-toast"

export function EditToolSheet({
  editToolSheet,
  setEditToolSheet,
  setSidebarOpen,
  categories,
  tags,
  tool
}: {
  editToolSheet: boolean
  setEditToolSheet: (open: boolean) => void
  setSidebarOpen: (open: boolean) => void
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
  tool: any
}) {
  const { toast } = useToast()
  const [features, setFeatures] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<any[]>([])
  const [free, setFree] = useState(false)
  const [freeTrial, setFreeTrial] = useState(false)
  const [pricingModel, setPricingModel] = useState("Subscription")
  const [startingPrice, setStartingPrice] = useState("")

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    website: "",
    companyId: null,
    verified: false,
    featured: false
  })

  useEffect(() => {
    if (tool) {
      setFormValues({
        name: tool.name || "",
        description: tool.description || "",
        longDescription: tool.longDescription || "",
        imageUrl: tool.imageUrl || "",
        website: tool.website || "",
        companyId: tool.companyId || null,
        verified: tool.verified || false,
        featured: tool.featured || false
      })
      setFeatures(tool.features || [""])
      setSelectedCategories(tool.categories || [])
      setSelectedTags(tool.tags || [])
      setFree(tool.pricing?.free || false)
      setFreeTrial(tool.pricing?.freeTrial || false)
      setPricingModel(tool.pricing?.pricingModel || "Subscription")
      setStartingPrice(tool.pricing?.startingPrice || "")
    }
  }, [tool])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormValues((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }))
  }


  const handleSubmit = async () => {
    const data = {
      id: tool.id,
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
        startingPrice
      },
      features
    }

    const parsed = toolSchema.safeParse(data)
    if (!parsed.success) {
      console.error("Validation failed", parsed.error.format())
      return
    }
    console.log("Parsed data:", parsed.data)
    // const result = await updateTool(tool.id, parsed.data)
    // if (result.success) {
    //   toast({
    //     variant: "default",
    //     title: "Tool updated!",
    //     description: "Your tool has been successfully updated."
    //   })
    //   setEditToolSheet(false)
    // } else {
    //   console.error("Failed to update tool:", result.error)
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request. Try again."
    //   })
    // }
  }

  return (
    <Sheet open={editToolSheet} onOpenChange={(open) => {
      setEditToolSheet(open)
      setSidebarOpen(open)
    }}>
      <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle>Update Tool</SheetTitle>
          <SheetDescription>Update tool info and save changes.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formValues.name} onChange={handleInputChange} />

          <Label htmlFor="website">Website</Label>
          <Input id="website" value={formValues.website} onChange={handleInputChange} />

          <Label htmlFor="description">Short Description</Label>
          <Textarea id="description" value={formValues.description} onChange={handleInputChange} />

          <Label htmlFor="longDescription">Long Description</Label>
          <Textarea id="longDescription" value={formValues.longDescription} onChange={handleInputChange} />

          <Label htmlFor="startingPrice">Starting Price</Label>
          <Input id="startingPrice" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} />

          <Label>Pricing Model</Label>
          <Select value={pricingModel} onValueChange={setPricingModel}>
            <SelectTrigger><SelectValue placeholder="Select pricing model" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Subscription">Subscription</SelectItem>
              <SelectItem value="One-Time">One-Time</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
            </SelectContent>
          </Select>

          <Label>Categories</Label>
          <Select onValueChange={(value) => {
            if (!selectedCategories.includes(value)) {
              setSelectedCategories([...selectedCategories, value])
            }
          }}>
            <SelectTrigger><SelectValue placeholder="Add category" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCategories.map((catId, index) => {
              const category = categories.find((c) => c.id === catId)
              return (
                <span key={index} className="bg-muted text-sm px-2 py-1 rounded-full cursor-pointer" onClick={() => setSelectedCategories(selectedCategories.filter((id) => id !== catId))}>
                  {category?.name} ✕
                </span>
              )
            })}
          </div>

          <Label>Tags</Label>
          <Select onValueChange={(value) => {
            if (!selectedTags.some((t) => t.tagId === value)) {
              const found = tags.find((t) => t.id === value)
              if (found) {
                setSelectedTags([...selectedTags, { tagId: found.id, tag: found }])
              }
            }
          }}>
            <SelectTrigger><SelectValue placeholder="Add tag" /></SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((item) => (
              <span key={item.tagId} className="bg-muted text-sm px-2 py-1 rounded-full cursor-pointer" onClick={() => setSelectedTags(selectedTags.filter((t) => t.tagId !== item.tagId))}>
                {item.tag.name} ✕
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Label>Free</Label>
            <Switch checked={free} onCheckedChange={setFree} />

            <Label>Free Trial</Label>
            <Switch checked={freeTrial} onCheckedChange={setFreeTrial} />

            <Label>Verified</Label>
            <Switch checked={formValues.verified} onCheckedChange={(val) => setFormValues((prev) => ({ ...prev, verified: val }))} />

            <Label>Featured</Label>
            <Switch checked={formValues.featured} onCheckedChange={(val) => setFormValues((prev) => ({ ...prev, featured: val }))} />
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
