import type { Metadata } from "next"
import { allTools } from "@/data/tools"
import { constructMetadata } from "@/lib/seo-config"
import ToolDetailsClientPage from "./tool-details-client-page"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  if (!resolvedParams?.id) {
    return constructMetadata({ title: "Tool Not Found", noIndex: true })
  }

  const toolId = Number(resolvedParams.id)
  if (isNaN(toolId)) {
    return constructMetadata({ title: "Invalid Tool", noIndex: true })
  }

  // Fetch tool data properly
  const tool = allTools.find((t) => t.id === toolId)

  if (!tool) {
    return constructMetadata({ title: "Tool Not Found", noIndex: true })
  }

  return constructMetadata({
    title: tool.name,
    description: tool.description,
    image: tool.image,
    url: `/tools/${tool.id}`,
    type: "website",
    keywords: [tool.category, "tool", "software", "affiliate marketing"],
  })
}

export function generateStaticParams() {
  return allTools.map((tool) => ({
    id: tool.id.toString(),
  }))
}

export default async function ToolDetailsPage({ params }: Props) {
  const resolvedParams = await params
  return <ToolDetailsClientPage params={resolvedParams} />
}

