"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Filter, X, Check, Plus, BarChart3, ArrowRight, Star, Search, ChevronDown } from "lucide-react"

// Sample data for tools
const allTools = [
  {
    id: 1,
    name: "AI Writer Pro",
    description: "Advanced AI writing assistant for content creation and optimization",
    category: "AI Tools",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    price: {
      monthly: 29,
      yearly: 290,
      hasFree: true,
    },
    features: {
      "AI Content Generation": true,
      "Grammar Checking": true,
      "Plagiarism Detection": true,
      "SEO Optimization": true,
      "Multiple Languages": true,
      "Team Collaboration": false,
      "API Access": false,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 92,
      reliability: 95,
      speedScore: 88,
      supportQuality: 85,
      valueForMoney: 90,
    },
  },
  {
    id: 2,
    name: "Analytics Master",
    description: "Comprehensive analytics platform for data-driven decisions",
    category: "Analytics",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    price: {
      monthly: 49,
      yearly: 490,
      hasFree: false,
    },
    features: {
      "Real-time Analytics": true,
      "Custom Dashboards": true,
      "User Behavior Tracking": true,
      "Conversion Tracking": true,
      "Multiple Languages": false,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 89,
      reliability: 92,
      speedScore: 94,
      supportQuality: 82,
      valueForMoney: 85,
    },
  },
  {
    id: 3,
    name: "MarketBoost",
    description: "All-in-one marketing automation platform for growth",
    category: "Marketing",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    price: {
      monthly: 59,
      yearly: 590,
      hasFree: true,
    },
    features: {
      "Email Marketing": true,
      "Social Media Scheduling": true,
      "A/B Testing": true,
      "Landing Page Builder": true,
      "Multiple Languages": true,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 95,
      reliability: 90,
      speedScore: 85,
      supportQuality: 92,
      valueForMoney: 94,
    },
  },
  {
    id: 4,
    name: "TaskFlow",
    description: "Streamline your workflow with intelligent task management",
    category: "Productivity",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    price: {
      monthly: 19,
      yearly: 190,
      hasFree: true,
    },
    features: {
      "Task Management": true,
      "Project Planning": true,
      "Time Tracking": true,
      "Team Collaboration": true,
      "Multiple Languages": true,
      "File Sharing": true,
      "API Access": false,
      "Custom Templates": false,
    },
    performance: {
      userSatisfaction: 88,
      reliability: 93,
      speedScore: 90,
      supportQuality: 85,
      valueForMoney: 92,
    },
  },
  {
    id: 5,
    name: "DesignAI",
    description: "Create stunning designs with AI-powered design tools",
    category: "Design",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    price: {
      monthly: 39,
      yearly: 390,
      hasFree: false,
    },
    features: {
      "AI Design Generation": true,
      "Template Library": true,
      "Brand Kit": true,
      "Photo Editing": true,
      "Multiple Languages": false,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 87,
      reliability: 85,
      speedScore: 82,
      supportQuality: 80,
      valueForMoney: 88,
    },
  },
  {
    id: 6,
    name: "CodeAssist",
    description: "AI-powered coding assistant for developers",
    category: "Development",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    price: {
      monthly: 25,
      yearly: 250,
      hasFree: true,
    },
    features: {
      "Code Completion": true,
      "Error Detection": true,
      "Code Refactoring": true,
      "Multiple Languages": true,
      "Team Collaboration": false,
      "API Access": true,
      "Custom Templates": false,
      "Git Integration": true,
    },
    performance: {
      userSatisfaction: 91,
      reliability: 89,
      speedScore: 95,
      supportQuality: 83,
      valueForMoney: 90,
    },
  },
  {
    id: 7,
    name: "SEO Wizard",
    description: "Boost your website rankings with advanced SEO tools",
    category: "Marketing",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    price: {
      monthly: 35,
      yearly: 350,
      hasFree: true,
    },
    features: {
      "Keyword Research": true,
      "Backlink Analysis": true,
      "Competitor Tracking": true,
      "Content Optimization": true,
      "Multiple Languages": true,
      "Team Collaboration": true,
      "API Access": false,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 89,
      reliability: 87,
      speedScore: 92,
      supportQuality: 84,
      valueForMoney: 91,
    },
  },
  {
    id: 8,
    name: "VideoMaker Pro",
    description: "Create professional videos with easy-to-use editing tools",
    category: "Design",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    price: {
      monthly: 45,
      yearly: 450,
      hasFree: false,
    },
    features: {
      "Video Editing": true,
      "Template Library": true,
      "Stock Media": true,
      "Animation Effects": true,
      "Multiple Languages": true,
      "Team Collaboration": true,
      "API Access": false,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 90,
      reliability: 88,
      speedScore: 85,
      supportQuality: 87,
      valueForMoney: 89,
    },
  },
  {
    id: 9,
    name: "CloudStorage",
    description: "Secure cloud storage solution for businesses of all sizes",
    category: "Productivity",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    price: {
      monthly: 15,
      yearly: 150,
      hasFree: true,
    },
    features: {
      "File Storage": true,
      "File Sharing": true,
      "Version Control": true,
      Encryption: true,
      "Multiple Languages": true,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": false,
    },
    performance: {
      userSatisfaction: 86,
      reliability: 94,
      speedScore: 89,
      supportQuality: 82,
      valueForMoney: 93,
    },
  },
  {
    id: 10,
    name: "DataViz",
    description: "Transform your data into beautiful, interactive visualizations",
    category: "Analytics",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    price: {
      monthly: 55,
      yearly: 550,
      hasFree: false,
    },
    features: {
      "Data Visualization": true,
      "Interactive Dashboards": true,
      "Data Integration": true,
      "Export Options": true,
      "Multiple Languages": false,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 94,
      reliability: 91,
      speedScore: 87,
      supportQuality: 89,
      valueForMoney: 92,
    },
  },
  {
    id: 11,
    name: "ChatBot Builder",
    description: "Build intelligent chatbots without coding knowledge",
    category: "AI Tools",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    price: {
      monthly: 32,
      yearly: 320,
      hasFree: true,
    },
    features: {
      "Visual Builder": true,
      "AI Responses": true,
      "Multi-channel": true,
      Analytics: true,
      "Multiple Languages": true,
      "Team Collaboration": false,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 88,
      reliability: 86,
      speedScore: 91,
      supportQuality: 85,
      valueForMoney: 89,
    },
  },
  {
    id: 12,
    name: "DevOps Pro",
    description: "Streamline your development and operations workflow",
    category: "Development",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    price: {
      monthly: 65,
      yearly: 650,
      hasFree: false,
    },
    features: {
      "CI/CD Pipeline": true,
      "Infrastructure as Code": true,
      Monitoring: true,
      Alerting: true,
      "Multiple Languages": true,
      "Team Collaboration": true,
      "API Access": true,
      "Custom Templates": true,
    },
    performance: {
      userSatisfaction: 92,
      reliability: 95,
      speedScore: 88,
      supportQuality: 86,
      valueForMoney: 87,
    },
  },
]

// Get all categories from tools
const allCategories = Array.from(new Set(allTools.map((tool) => tool.category)))

export default function ToolsPage() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedTools, setSelectedTools] = useState<number[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("features")

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState<number>(0)
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 100])

  // Function to toggle tool selection for comparison
  const toggleToolSelection = (toolId: number) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((id) => id !== toolId))
    } else {
      if (selectedTools.length <5 ) {
        setSelectedTools([...selectedTools, toolId])
      }
    }
  }

  // Get all features from all tools for comparison
  const allFeatures = Array.from(new Set(allTools.flatMap((tool) => Object.keys(tool.features))))

  // Get the selected tools data
  const selectedToolsData = allTools.filter((tool) => selectedTools.includes(tool.id))

  // Filter tools based on selected filters
  const filteredTools = allTools.filter((tool) => {
    // Search query filter
    if (
      searchQuery &&
      !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(tool.category)) {
      return false
    }

    // Price filter
    if (priceFilter.length > 0) {
      if (priceFilter.includes("free") && !tool.price.hasFree) {
        return false
      }
      if (priceFilter.includes("premium") && tool.price.hasFree) {
        return false
      }
    }

    // Rating filter
    if (ratingFilter > 0 && tool.rating < ratingFilter) {
      return false
    }

    // Price range filter
    if (tool.price.monthly < priceRangeFilter[0] || tool.price.monthly > priceRangeFilter[1]) {
      return false
    }

    return true
  })

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceFilter([])
    setRatingFilter(0)
    setPriceRangeFilter([0, 100])
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">All Tools</h1>
          <p className="text-white/70">Discover and compare the best tools for your business needs</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Filters */}
          <div className={`${showSidebar ? "block" : "hidden"} mb-6 w-full lg:mb-0 lg:w-1/4 lg:pr-6`}>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-white">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category))
                          }
                        }}
                        className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 cursor-pointer text-sm text-white/70 hover:text-white"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-white">Price</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="price-free"
                      checked={priceFilter.includes("free")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPriceFilter([...priceFilter, "free"])
                        } else {
                          setPriceFilter(priceFilter.filter((p) => p !== "free"))
                        }
                      }}
                      className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                    />
                    <label htmlFor="price-free" className="ml-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      Free Plan Available
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="price-premium"
                      checked={priceFilter.includes("premium")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPriceFilter([...priceFilter, "premium"])
                        } else {
                          setPriceFilter(priceFilter.filter((p) => p !== "premium"))
                        }
                      }}
                      className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor="price-premium"
                      className="ml-2 cursor-pointer text-sm text-white/70 hover:text-white"
                    >
                      Premium Only
                    </label>
                  </div>
                </div>
              </div>

              <Collapsible className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Advanced Filters</h3>
                  <CollapsibleTrigger className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white">
                    <ChevronDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="mt-3 space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-white/70">Minimum Rating</h4>
                    <div className="flex items-center gap-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(rating)}
                          className={`flex h-8 items-center rounded-md px-2 text-xs ${
                            ratingFilter === rating
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                        >
                          {rating > 0 ? (
                            <>
                              {rating}+ <Star className="ml-1 h-3 w-3 fill-current" />
                            </>
                          ) : (
                            "Any"
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-white/70">Price Range ($/month)</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        value={priceRangeFilter}
                        onValueChange={(value) => setPriceRangeFilter(value as [number, number])}
                        max={100}
                        step={5}
                        className="py-4"
                      />
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>${priceRangeFilter[0]}</span>
                        <span>${priceRangeFilter[1]}</span>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button
                onClick={resetFilters}
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/10"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className={`w-full ${showSidebar ? "lg:w-3/4" : "lg:w-full"}`}>
            <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                </Button>
                <span className="text-sm text-white/70">
                  Showing {filteredTools.length} of {allTools.length} tools
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedTools.length > 0 && (
                  <Button
                    onClick={() => setIsCompareOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Compare ({selectedTools.length})
                  </Button>
                )}

                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px] border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating-high">Rating (High to Low)</SelectItem>
                    <SelectItem value="rating-low">Rating (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tools Grid */}
            <div
              className={`grid gap-6 ${showSidebar ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
            >
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10"
                >
                  {/* Selection checkbox for comparison */}
                  <div className="absolute right-3 top-3 z-10">
                    <button
                      onClick={() => toggleToolSelection(tool.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        selectedTools.includes(tool.id)
                          ? "bg-purple-600 text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                      aria-label={selectedTools.includes(tool.id) ? "Remove from comparison" : "Add to comparison"}
                    >
                      {selectedTools.includes(tool.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{tool.category}</Badge>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                        <Star className="ml-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    </div>

                    <div className="mb-4 h-40 w-full overflow-hidden rounded-lg">
                      <Image
                        src={tool.image || "/placeholder.svg"}
                        alt={tool.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-white">{tool.name}</h3>

                    <p className="mb-4 text-sm text-white/70 line-clamp-2">{tool.description}</p>

                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        {tool.price.hasFree ? (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
                            <span className="text-sm text-white/70">/ ${tool.price.monthly}/mo</span>
                          </div>
                        ) : (
                          <span className="text-sm text-white/70">From ${tool.price.monthly}/mo</span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full bg-white/10 text-white hover:bg-white/20" variant="outline">
                      <span>See Details</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="mb-4 rounded-full bg-white/10 p-3">
                  <Search className="h-6 w-6 text-white/70" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">No tools found</h3>
                <p className="text-white/70">Try adjusting your filters or search query</p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-4 border-white/10 text-white hover:bg-white/10"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className="max-w-[90vw] bg-black text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tool Comparison</DialogTitle>
            <DialogDescription className="text-white/70">
              Compare features, pricing, and performance metrics side by side.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-4">
              <div className="rounded-lg border border-white/10">
                <div className="max-h-[70vh] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Feature</TableHead>
                        {selectedToolsData.map((tool) => (
                          <TableHead key={tool.id} className="text-center text-white">
                            {tool.name}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">Pricing</TableCell>
                        {selectedToolsData.map((tool) => (
                          <TableCell key={`${tool.id}-price`} className="text-center text-white">
                            <div className="flex flex-col items-center">
                              <span>${tool.price.monthly}/mo</span>
                              <span className="text-xs text-white/50">${tool.price.yearly}/yr</span>
                              {tool.price.hasFree && (
                                <Badge className="mt-1 bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      {allFeatures.map((feature) => (
                        <TableRow key={feature} className="border-white/10 hover:bg-white/5">
                          <TableCell className="font-medium text-white">{feature}</TableCell>
                          {selectedToolsData.map((tool) => (
                            <TableCell key={`${tool.id}-${feature}`} className="text-center text-white">
                              {tool.features[feature as keyof typeof tool.features] ? (
                                <Check className="mx-auto h-5 w-5 text-green-500" />
                              ) : (
                                <X className="mx-auto h-5 w-5 text-red-500" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-4">
              <div className="rounded-lg border border-white/10">
                <div className="max-h-[70vh] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Metric</TableHead>
                        {selectedToolsData.map((tool) => (
                          <TableHead key={tool.id} className="text-center text-white">
                            {tool.name}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(allTools[0].performance).map((metric) => (
                        <TableRow key={metric} className="border-white/10 hover:bg-white/5">
                          <TableCell className="font-medium text-white">
                            {metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </TableCell>
                          {selectedToolsData.map((tool) => (
                            <TableCell key={`${tool.id}-${metric}`} className="text-center">
                              <div className="flex flex-col items-center">
                                <span className="text-white">
                                  {tool.performance[metric as keyof typeof tool.performance]}%
                                </span>
                                <div className="mt-1 h-2 w-24 overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                                    style={{
                                      width: `${tool.performance[metric as keyof typeof tool.performance]}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">Overall Rating</TableCell>
                        {selectedToolsData.map((tool) => (
                          <TableCell key={`${tool.id}-rating`} className="text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-white">{tool.rating}/5</span>
                              <div className="mt-1 flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4"
                                    fill={
                                      i < Math.floor(tool.rating)
                                        ? "currentColor"
                                        : i < tool.rating
                                          ? "currentColor"
                                          : "none"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

