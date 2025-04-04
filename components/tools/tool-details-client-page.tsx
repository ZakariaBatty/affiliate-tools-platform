"use client"
import { useRouter } from "next/navigation"
import { RelatedToolsSidebar } from "@/components/related-tools-sidebar"
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/json-ld"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ToolHeader } from "@/components/tools/tool-header"
import { ToolTabs } from "@/components/tools/tool-tabs"
import { ToolComparison } from "@/components/tools/tool-comparison"

type Props = {
  tool: any
  relatedTools: any[]
}

export default function ToolDetailsClientPage({ tool, relatedTools }: Props) {
  const router = useRouter()
  console.log("Tool Details Page", { tool, relatedTools })
  // Calculate overall score
  const overallScore = Math.round((tool.ratings.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / tool.ratings.length || 0) * 20)
  // Add this inside your component after you've loaded the tool data:
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: tool.categories[0].name, url: `/tools?category=${tool.categories[0].name}` },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name={tool.name}
        description={tool.description}
        image={tool.imageUrl || "/placeholder.svg"}
        url={`/tools/${tool.slug}`}
        price={tool.pricing.startingPrice}
        rating={tool.rating}
        category={tool.categories[0].name}
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
          {/* <ChevronRight className="mx-2 h-4 w-4" />
          <Link href={`/tools?category=${tool.categories[0]}`} className="hover:text-white">
            {tool.categories[0].name}
          </Link> */}
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
            {/* <ToolTabs tool={tool} />
            <ToolComparison currentTool={tool} /> */}
          </div>

          {/* Sidebar */}
          {/* <div className="lg:col-span-1">
            <RelatedToolsSidebar currentToolId={tool.id} category={tool.categories[0].name} />
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}

