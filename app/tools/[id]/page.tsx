import type { Metadata } from "next"
import { allTools } from "@/data/tools"
import { constructMetadata } from "@/lib/seo-config"
import ToolDetailsClientPage from "./ToolDetailsClientPage"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params?.id) {
    return constructMetadata({ title: "Tool Not Found", noIndex: true });
  }

  const toolId = Number(params?.id);
  if (isNaN(toolId)) {
    return constructMetadata({ title: "Invalid Tool", noIndex: true });
  }

  // Fetch tool data properly
  const tool = allTools.find((t) => t.id === toolId);

  if (!tool) {
    return constructMetadata({ title: "Tool Not Found", noIndex: true });
  }

  return constructMetadata({
    title: tool.name,
    description: tool.description,
    image: tool.image,
    url: `/tools/${tool.id}`,
    type: "website", // Change to "website" or add OpenGraph product properties
    keywords: [tool.category, "tool", "software", "affiliate marketing"],
  });
}



export function generateStaticParams() {
  return allTools.map((tool) => ({
    id: tool.id.toString(),
  }))
}

export default function ToolDetailsPage({ params }: Props) {
  return <ToolDetailsClientPage params={params} />
}

