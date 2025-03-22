import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import ToolsClientPage from "./ToolsClientPage"

export const metadata: Metadata = constructMetadata({
  title: "Tools Directory",
  description: "Browse and compare the best affiliate marketing tools to boost your business performance",
  keywords: ["affiliate tools", "marketing tools", "tool directory", "software comparison"],
})

export default function ToolsPage() {
  return <ToolsClientPage />
}

