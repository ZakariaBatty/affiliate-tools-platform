import { TracingBeam } from "@/components/tracing-beam"
import { Badge } from "@/components/ui/badge"

interface BlogPostContentProps {
  post: any
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <>
      {/* Article Content with Tracing Beam */}
      <TracingBeam className="mb-12 text-white">
        <div
          className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-purple-400 prose-strong:text-white prose-li:text-white/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </TracingBeam>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="mb-3 text-lg font-medium text-white">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-white/10 text-white/70 hover:border-purple-500/50 hover:text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}

