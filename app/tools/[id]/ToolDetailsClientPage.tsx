"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  Check,
  X,
  Share2,
  Bookmark,
  ExternalLink,
  BarChart3,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
} from "lucide-react"
import { allTools } from "@/data/tools"
import { RelatedToolsSidebar } from "@/components/related-tools-sidebar"
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/json-ld"

type Props = {
  params: { id: string }
}

export default function ToolDetailsClientPage({ params }: Props) {
  const router = useRouter()
  const [tool, setTool] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const toolId = Number(params.id)
    const foundTool = allTools.find((t) => t.id === toolId)

    if (foundTool) {
      setTool(foundTool)
    }

    setIsLoading(false)
  }, [params.id])

  // Handle if tool not found
  if (!isLoading && !tool) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Tool Not Found</h1>
          <p className="mb-8 text-white/70">The tool you're looking for doesn't exist or has been removed.</p>
          <Button
            onClick={() => router.push("/tools")}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
          >
            Browse All Tools
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading || !tool) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
            <div className="h-32 w-full bg-white/10 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-96 bg-white/10 rounded mb-8"></div>
              </div>
              <div>
                <div className="h-64 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Calculate overall score
  const overallScore = Math.round(
    Object.values(tool.performance as Record<string, number>).reduce((sum, val) => sum + val, 0) /
    Object.keys(tool.performance).length,
  )

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} - ToolsHub`,
        text: `Check out ${tool.name} on ToolsHub`,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Add this inside your component after you've loaded the tool data:
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: tool.category, url: `/tools?category=${tool.category}` },
    { name: tool.name, url: `/tools/${tool.id}` },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name={tool.name}
        description={tool.description}
        image={tool.image || "/placeholder.svg"}
        url={`/tools/${tool.id}`}
        price={tool.price}
        rating={tool.rating}
        category={tool.category}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-white/50">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link href="/tools" className="hover:text-white">
            Tools
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link href={`/tools?category=${tool.category}`} className="hover:text-white">
            {tool.category}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-white">{tool.name}</span>
        </div>

        {/* Back button */}
        <Button
          variant="outline"
          size="sm"
          className="mb-6 border-white/10 hover:text-white hover:bg-white/10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main content */}
          <div className="lg:col-span-2 xl:col-span-3">
            {/* Tool header */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={tool.image || "/placeholder.svg"}
                    alt={`Logo of ${tool.name}`}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className="bg-white/10 text-white/70 hover:bg-white/20">{tool.category}</Badge>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-yellow-500">{tool.rating}</span>
                      <Star className="ml-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                    </div>
                    {tool.price.hasFree && (
                      <Badge className="bg-green-600 text-white hover:bg-green-700">Free Plan</Badge>
                    )}
                  </div>

                  <h1 className="mb-2 text-3xl font-bold text-white">{tool.name}</h1>
                  <p className="mb-4 text-white/70">{tool.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10 hover:text-white hover:bg-white/10"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-purple-500 text-purple-500" : ""}`} />
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10 hover:text-white hover:bg-white/10"
                      onClick={handleShare}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-3xl font-bold text-white">{overallScore}%</div>
                  <div className="text-sm text-white/70">Overall Score</div>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < Math.floor(tool.rating) ? "#EAB308" : "none"}
                        color={i < Math.floor(tool.rating) ? "#EAB308" : "#6b7280"}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-white/50">{tool.rating} out of 5</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-4 bg-white/5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h2 className="mb-4 text-xl font-bold text-white">About {tool.name}</h2>
                    <p className="mb-4 text-white/70">
                      {tool.name} is a powerful {tool.category.toLowerCase()} solution designed to help businesses
                      streamline their workflows and achieve better results. With its intuitive interface and robust
                      feature set, it's an excellent choice for businesses of all sizes.
                    </p>
                    <p className="text-white/70">
                      Whether you're looking to improve productivity, enhance collaboration, or gain valuable insights,{" "}
                      {tool.name} offers the tools you need to succeed in today's competitive landscape.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h2 className="mb-4 text-xl font-bold text-white">Key Performance Metrics</h2>
                    <div className="space-y-4">
                      {Object.entries(tool.performance).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-white/70">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                                style={{ width: `${Number(value)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-white">{String(value)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="mb-4 text-xl font-bold text-white">Use Cases</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Small Businesses",
                        description: `${tool.name} helps small businesses automate tasks and focus on growth.`,
                      },
                      {
                        title: "Enterprise Teams",
                        description: `Large organizations use ${tool.name} to improve collaboration and efficiency.`,
                      },
                      {
                        title: "Freelancers",
                        description: `Independent professionals rely on ${tool.name} to manage their workflow.`,
                      },
                    ].map((useCase, index) => (
                      <div key={index} className="rounded-lg border border-white/10 bg-white/10 p-4">
                        <h3 className="mb-2 text-lg font-medium text-white">{useCase.title}</h3>
                        <p className="text-sm text-white/70">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="mb-6 text-xl font-bold text-white">Features & Capabilities</h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(tool.features).map(([feature, hasFeature]) => (
                      <div key={feature} className="flex items-start gap-3">
                        {hasFeature ? (
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                            <Check className="h-3 w-3 text-green-500" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20">
                            <X className="h-3 w-3 text-red-500" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-base font-medium text-white">{feature}</h3>
                          <p className="text-sm text-white/70">
                            {hasFeature
                              ? `${tool.name} provides robust ${feature.toLowerCase()} capabilities.`
                              : `${tool.name} does not currently offer ${feature.toLowerCase()}.`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="mt-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="mb-6 text-xl font-bold text-white">Pricing Plans</h2>

                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Free Plan */}
                    {tool.price.hasFree && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/50">
                        <h3 className="mb-2 text-lg font-bold text-white">Free Plan</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-white">$0</span>
                          <span className="text-white/70">/month</span>
                        </div>
                        <p className="mb-4 text-sm text-white/70">
                          Get started with basic features for individuals or small teams.
                        </p>
                        <ul className="mb-6 space-y-2">
                          <li className="flex items-center text-sm text-white/70">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            Limited usage
                          </li>
                          <li className="flex items-center text-sm text-white/70">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            Core features
                          </li>
                          <li className="flex items-center text-sm text-white/70">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            Email support
                          </li>
                        </ul>
                        <Button className="w-full bg-white/10 text-white hover:bg-white/20">Get Started</Button>
                      </div>
                    )}

                    {/* Pro Plan */}
                    <div className="relative rounded-xl border border-purple-500/50 bg-white/5 p-6 transition-all hover:border-purple-500">
                      <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-xs font-medium text-white">
                        Popular
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-white">Pro Plan</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">${tool.price.monthly}</span>
                        <span className="text-white/70">/month</span>
                      </div>
                      <p className="mb-4 text-sm text-white/70">
                        Perfect for professionals and growing teams with advanced needs.
                      </p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Unlimited usage
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          All features
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Priority support
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Advanced analytics
                        </li>
                      </ul>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                        Get Started
                      </Button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/50">
                      <h3 className="mb-2 text-lg font-bold text-white">Enterprise</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">Custom</span>
                      </div>
                      <p className="mb-4 text-sm text-white/70">
                        Tailored solutions for large organizations with custom requirements.
                      </p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Custom deployment
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Dedicated support
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          SLA guarantees
                        </li>
                        <li className="flex items-center text-sm text-white/70">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Custom integrations
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full border-white/10 hover:text-white hover:bg-white/10">
                        Contact Sales
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg border border-white/10 bg-white/10 p-4">
                    <h3 className="mb-2 text-lg font-medium text-white">Annual Pricing</h3>
                    <p className="text-white/70">
                      Save up to 20% with annual billing. Annual plans start at ${tool.price.yearly}/year.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h2 className="text-xl font-bold text-white">User Reviews</h2>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Write a Review
                    </Button>
                  </div>

                  <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                              JD
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-white">John Doe</div>
                            <div className="text-xs text-white/50">Marketing Director</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4"
                              fill={i < 5 ? "#EAB308" : "none"}
                              color={i < 5 ? "#EAB308" : "#6b7280"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-white/70">
                        "{tool.name} has completely transformed our workflow. The interface is intuitive, and the
                        features are exactly what we needed. Highly recommended!"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/50">2 weeks ago</div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                            <ThumbsUp className="h-3 w-3" />
                            <span>12</span>
                          </button>
                          <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                            <ThumbsDown className="h-3 w-3" />
                            <span>2</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
                            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                              AS
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-white">Alex Smith</div>
                            <div className="text-xs text-white/50">Product Manager</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4"
                              fill={i < 4 ? "#EAB308" : "none"}
                              color={i < 4 ? "#EAB308" : "#6b7280"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-white/70">
                        "Great tool with powerful features. The only downside is that it took some time to get used to
                        all the functionality. Once you're past the learning curve, it's amazing."
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/50">1 month ago</div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                            <ThumbsUp className="h-3 w-3" />
                            <span>8</span>
                          </button>
                          <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                            <ThumbsDown className="h-3 w-3" />
                            <span>1</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-white/10 hover:text-white hover:bg-white/10">
                    Load More Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Comparison section */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Compare with Similar Tools</h2>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-left text-sm font-medium text-white/70">Tool</th>
                      <th className="p-3 text-left text-sm font-medium text-white/70">Rating</th>
                      <th className="p-3 text-left text-sm font-medium text-white/70">Price</th>
                      <th className="p-3 text-left text-sm font-medium text-white/70">Free Plan</th>
                      <th className="p-3 text-left text-sm font-medium text-white/70">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Current tool */}
                    <tr className="border-b border-white/10 bg-purple-500/10">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 overflow-hidden rounded-md">
                            <Image
                              src={tool.image || "/placeholder.svg"}
                              alt={`Logo of ${tool.name}`}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-white">{tool.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <span className="mr-1 text-white">{tool.rating}</span>
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        </div>
                      </td>
                      <td className="p-3 text-white">${tool.price.monthly}/mo</td>
                      <td className="p-3">
                        {tool.price.hasFree ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </td>
                      <td className="p-3">
                        <Badge className="bg-purple-600 text-white">Current</Badge>
                      </td>
                    </tr>

                    {/* Similar tools */}
                    {allTools
                      .filter((t) => t.category === tool.category && t.id !== tool.id)
                      .slice(0, 3)
                      .map((similarTool) => (
                        <tr key={similarTool.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 overflow-hidden rounded-md">
                                <Image
                                  src={similarTool.image || "/placeholder.svg"}
                                  alt={`Logo of ${similarTool.name}`}
                                  width={32}
                                  height={32}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-white">{similarTool.name}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className="mr-1 text-white">{similarTool.rating}</span>
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            </div>
                          </td>
                          <td className="p-3 text-white">${similarTool.price.monthly}/mo</td>
                          <td className="p-3">
                            {similarTool.price.hasFree ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </td>
                          <td className="p-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 hover:text-white hover:bg-white/10"
                              onClick={() => router.push(`/tools/${similarTool.id}`)}
                            >
                              Compare
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="border-white/10 hover:text-white hover:bg-white/10"
                  onClick={() => router.push(`/tools?category=${tool.category}`)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View All {tool.category} Tools
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RelatedToolsSidebar currentToolId={tool.id} category={tool.category} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

