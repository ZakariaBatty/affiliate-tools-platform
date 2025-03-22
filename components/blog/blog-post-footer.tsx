import { Button } from "@/components/ui/button"
import { Bookmark, Facebook, Linkedin, Share2, Twitter } from "lucide-react"

interface BlogPostFooterProps {
  post: any
}

export function BlogPostFooter({ post }: BlogPostFooterProps) {
  return (
    <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
      <div>
        <h3 className="mb-2 text-lg font-medium text-white">Share this article</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/10 hover:text-white hover:bg-white/10"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
        <Bookmark className="mr-2 h-4 w-4" />
        Save for later
      </Button>
    </div>
  )
}

