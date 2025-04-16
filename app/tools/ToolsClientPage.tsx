"use client"

import { useEffect, useState } from "react"
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
import { ChevronLeft, Filter, X, Check, Plus, BarChart3, ArrowRight, Star, Search, ChevronDown, Grid3X3, List, ArrowUpDown } from "lucide-react"
import { allTools } from "@/data/tools"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Category, ToolFull } from "@/types"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SaveToolButton } from "@/components/save-tool-button"
import Footer from "@/components/footer"

// Get all categories from tools
const allCategories = Array.from(new Set(allTools.map((tool) => tool.category)))

interface AllToolsProps {
  initialTools: ToolFull[],
  categories: Category[],
}

export default function ToolsClientPage({ initialTools, categories }: AllToolsProps) {

  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedTools, setSelectedTools] = useState<number[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("features")

  const [tools, setTools] = useState(initialTools)
  const [view, setView] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState<number>(0)
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 100])


  // Filter and sort tools
  useEffect(() => {
    let filteredTools = [...initialTools]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredTools = filteredTools.filter(
        (tool) => tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filteredTools = filteredTools.filter((tool) =>
        tool.categories.some((cat) => selectedCategories.includes(cat.category.id)),
      )
    }

    // Price filter
    if (showFreeOnly) {
      filteredTools = filteredTools.filter((tool) => tool.pricing?.free)
    } else {
      filteredTools = filteredTools.filter(
        (tool) =>
          (tool.pricing?.startingPrice >= priceRange[0] && tool.pricing?.startingPrice <= priceRange[1]) || tool.pricing?.freeTrial === true,
      )
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filteredTools.sort((a, b) => (b._count?.savedBy || 0) - (a._count?.savedBy || 0))
        break
      case "newest":
        filteredTools.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "name":
        filteredTools.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filteredTools.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
        break
    }

    setTools(filteredTools)
  }, [initialTools, searchQuery, selectedCategories, priceRange, showFreeOnly, sortBy])

  console.log("Tools:", tools)


  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        {/* header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            AI Tools Directory
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Discover and compare the best AI tools for your business needs
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className={view === "grid" ? "bg-white/10" : ""}
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={view === "list" ? "bg-white/10" : ""}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
              <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <select
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular" className="text-black/70">Most Popular</option>
                  <option value="newest" className="text-black/70">Newest</option>
                  <option value="name" className="text-black/70">Name (A-Z)</option>
                  <option value="rating" className="text-black/70">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile sort */}
          <div className="mt-4 md:hidden">
            <select
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular" className="text-black/70">Most Popular</option>
              <option value="newest" className="text-black/70">Newest</option>
              <option value="name" className="text-black/70">Name (A-Z)</option>
              <option value="rating" className="text-black/70">Highest Rated</option>
            </select>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Categories */}
                <div>
                  <h4 className="mb-2 font-medium text-white">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        className={`cursor-pointer ${selectedCategories.includes(category.id)
                          ? "bg-purple-600 hover:bg-purple-700 text-white/70"
                          : "bg-white/70 hover:bg-white/20"
                          }`}
                        onClick={() => {
                          if (selectedCategories.includes(category.id)) {
                            setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                          } else {
                            setSelectedCategories([...selectedCategories, category.id])
                          }
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                {/* Price range */}
                <div>
                  <h4 className="mb-2 font-medium text-white">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      disabled={showFreeOnly}
                    />
                    <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Switch id="free-only" checked={showFreeOnly} onCheckedChange={setShowFreeOnly} />
                    <Label htmlFor="free-only">Free tools only</Label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, 1000])
                      setShowFreeOnly(false)
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/70">
            Showing <span className="font-medium text-white">{tools.length}</span> tools
          </p>
          <div className="flex items-center text-white/70">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Sort by:</span>
            <select
              className="ml-2 rounded bg-transparent text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular" className="text-black">Most Popular</option>
              <option value="newest" className="text-black">Newest</option>
              <option value="name" className="text-black">Name (A-Z)</option>
              <option value="rating" className="text-black">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Tools grid/list */}
        {tools.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 p-8">
            <p className="text-center text-lg text-white/70">No tools found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 1000])
                setShowFreeOnly(false)
                setSearchQuery("")
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tool.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={tool.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/20 text-white">{tool.categories[0]?.category.name || "General"}</Badge>
                  </div>
                  {/* <div className="absolute right-4 top-4">
                    <SaveToolButton
                      toolId={tool.id}
                      isSaved={tool.savedByCurrentUser}
                      variant="ghost"
                      size="sm"
                      className="bg-black/50 hover:bg-black/70 text-white"
                    />
                  </div> */}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      <Link href={`/tools/${tool.slug}`} className="hover:text-purple-300">
                        {tool.name}
                      </Link>
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium text-yellow-500">{tool.avgRating || 4.5}</span>
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-white/70 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-white/10 text-white/70">
                      {tool.pricing?.free === true ? "Free" : `From $${tool.pricing?.startingPrice || 0}/mo`}
                    </Badge>
                    <span className="text-xs text-white/50">{tool._count?.savedBy || 0} saves</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10 sm:flex-row"
              >
                <div className="relative h-48 w-full sm:h-auto sm:w-48">
                  <Image
                    src={tool.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={tool.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      <Link href={`/tools/${tool.slug}`} className="hover:text-purple-300">
                        {tool.name}
                      </Link>
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium text-yellow-500">{tool.avgRating || 4.5}</span>
                    </div>
                  </div>
                  <p className="mb-4 flex-1 text-sm text-white/70">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/20 text-white">{tool.categories[0]?.category.name || "General"}</Badge>
                      <Badge variant="outline" className="border-white/10 text-white/70">
                        {tool.pricing?.free === true ? "Free" : `From $${tool.pricing?.startingPrice || 0}/mo`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/50">{tool._count?.savedBy || 0} saves</span>
                      <SaveToolButton toolId={tool.id} isSaved={tool.savedByCurrentUser} variant="outline" size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more button */}
        {/* {tools.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-white/10 hover:bg-white/10 hover:text-white">
              Load More
            </Button>
          </div>
        )} */}
      </main>

      <Footer />

    </div>
  )
}

