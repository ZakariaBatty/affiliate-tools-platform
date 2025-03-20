import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"

export const metadata: Metadata = constructMetadata({
  title: "Home",
  description: "Discover and compare the best affiliate marketing tools to boost your business growth and revenue",
  keywords: ["affiliate marketing", "marketing tools", "tool comparison", "best tools"],
})

export default function HomePage() {
  // Your existing component code
}

