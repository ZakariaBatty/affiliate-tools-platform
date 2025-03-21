"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { allTools } from "@/data/tools"
import { RelatedToolsSidebar } from "@/components/related-tools-sidebar"
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/json-ld"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ToolNotFound } from "@/components/tools/tool-not-found"
import { ToolLoading } from "@/components/tools/tool-loading"
import { ToolHeader } from "@/components/tools/tool-header"
import { ToolTabs } from "@/components/tools/tool-tabs"
import { ToolComparison } from "@/components/tools/tool-comparison"

type Props = {
  params: { id: string }
}

export default function ToolDetailsClientPage({ params }: Props) {
  const router = useRouter()
  const [tool, setTool] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    return <ToolNotFound />
  }

  if (isLoading || !tool) {
    return <ToolLoading />
  }

  // Calculate overall score
  const overallScore = Math.round(
    Object.values(tool.performance as Record<string, number>).reduce((sum, val) => sum + val, 0) /
    Object.keys(tool.performance).length,
  )

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
            <ToolHeader tool={tool} overallScore={overallScore} />
            <ToolTabs tool={tool} />
            <ToolComparison currentTool={tool} />
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

