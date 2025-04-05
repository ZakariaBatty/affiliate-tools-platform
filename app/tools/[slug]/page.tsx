import { notFound } from "next/navigation"
import { Suspense } from "react"
import { constructMetadata } from "@/lib/seo-config"
import { Skeleton } from "@/components/ui/skeleton"
import ToolDetailsClientPage from "@/components/tools/tool-details-client-page"
import { getToolDetail } from "@/app/actions/data-fetching"
import { Metadata } from "next"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params

  const data = await getToolDetail(resolvedParams.slug)

  if (!data) {
    return constructMetadata({ title: "Tool Not Found", noIndex: true })
  }

  const { tool } = data

  return constructMetadata({
    title: `${tool.name} | AI Tool Details`,
    description: tool.description,
    image: tool.imageUrl || '/images/og-image.jpg',
    url: `/tools/${tool.slug}`,
    type: "article",
    keywords: [...tool.categories.map((cat) => cat.category.name), "tool", "software", "affiliate marketing"],
  })
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params

  const data = await getToolDetail(resolvedParams.slug)

  if (!data) {
    notFound()
  }

  const { tool, relatedTools } = data

  return (
    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
      <ToolDetailsClientPage tool={tool} relatedTools={relatedTools} />
    </Suspense>
  )
}

