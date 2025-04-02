import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import ToolsClientPage from "./ToolsClientPage"
import { getAllCategories, getAllTools } from "../actions/data-fetching"
import { Suspense } from "react"
import ToolsLoading from "./loading"

export const metadata: Metadata = constructMetadata({
  title: "Tools Directory",
  description: "Browse and compare the best affiliate marketing tools to boost your business performance",
  keywords: ["affiliate tools", "marketing tools", "tool directory", "software comparison"],
})

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([getAllTools(), getAllCategories()])

  return (
    <Suspense fallback={<ToolsLoading />}>
      <ToolsClientPage initialTools={tools} categories={categories} />
    </Suspense>
  )

}

