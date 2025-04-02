"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import BlogSlider from "@/components/blog/blog-slider"
import BlogCard from "@/components/blog/blog-card"
import { BlogBasic, Category, Tag } from "@/types"
import { useState } from "react"

interface AllPostsProps {
  posts: BlogBasic[]
  featuredPosts: BlogBasic[]
  categories: Category[]
  tags: Tag[]
}

export default function BlogClientPage({ posts, featuredPosts, categories, tags }: AllPostsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  console.log(posts)
  // Filter and sort posts
  const filteredPosts = posts.filter((post) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !post.title.toLowerCase().includes(query) &&
        !post.excerpt.toLowerCase().includes(query) &&
        !post.tags.some((tag) => tag.toLowerCase().includes(query))
      ) {
        return false
      }
    }

    // Category filter
    if (activeTab !== "all") {
      console.log("all")
      if (activeTab === "ai" && !post.category.toLowerCase().includes("ai") && !post.tags.includes("AI")) {
        console.log("ai")

        return false
      }
      if (
        activeTab === "marketing" &&
        !post.category.toLowerCase().includes("marketing") &&
        !post.tags.includes("Marketing")
      ) {
        console.log("marketing")

        return false
      }
      if (
        activeTab === "productivity" &&
        !post.category.toLowerCase().includes("productivity") &&
        !post.tags.includes("Productivity")
      ) {
        console.log("Productivity")

        return false
      }
    }

    return true
  })



  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      console.log("latest", new Date(b.date), new Date(a.date))

      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (sortBy === "oldest") {
      console.log("latest", new Date(a.date), new Date(b.date))

      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
    // For "popular" sorting, we would need view counts, but for now we'll use the same as latest
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const categoryNames = categories.map((category) => category.name)
  const tagNames = tags.map((tag) => tag.name)


  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            ToolsHub Blog
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            Insights, guides, and news about the latest AI tools and technologies to help your business grow
          </p>

          <div className="mx-auto flex max-w-md flex-col items-center gap-4 sm:flex-row">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-white/5 pl-10 py-2 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            {/* <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
              Search
            </Button> */}
          </div>
        </div>

        {/* Featured Posts Slider */}
        <section className="mb-16">
          <BlogSlider title="Featured Articles" posts={featuredPosts} />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Blog Posts */}
          <div className="lg:col-span-2 xl:col-span-3">
            <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList className="bg-white/5 grid grid-cols-6 mb-7">
                  <TabsTrigger value="all" className="mr-2">All Posts</TabsTrigger>
                  {categoryNames.map((category, index) => (
                    <TabsTrigger className="mr-2 bg-white/5" key={index} value={category.toLowerCase()}>{category}</TabsTrigger>
                  ))}
                </TabsList>

                <div className="hidden md:block">
                  <select className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
              </div>

              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ai" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedPosts
                    .filter((post) => post.category === "AI Technology" || post.tags.includes("AI"))
                    .map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="marketing" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedPosts
                    .filter((post) => post.category === "Marketing" || post.tags.includes("Marketing"))
                    .map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="productivity" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedPosts
                    .filter((post) => post.category === "Productivity" || post.tags.includes("Productivity"))
                    .map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Load More Button */}
            <div className="mt-10 text-center">
              {/* <Button variant="outline" className="border-white/10 hover:text-white hover:bg-white/10">
                Load More Articles
              </Button> */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryNames.map((category) => (
                    <Badge
                      key={category}
                      className="bg-white/10 text-white/70 hover:bg-white/20 hover:text-white cursor-pointer"
                      onClick={() => {
                        if (category.toLowerCase().includes("ai")) {
                          setActiveTab("ai")
                        } else if (category.toLowerCase().includes("marketing")) {
                          setActiveTab("marketing")
                        } else if (category.toLowerCase().includes("productivity")) {
                          setActiveTab("productivity")
                        } else {
                          setActiveTab("all")
                        }
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 ">
                <h3 className="mb-4 text-xl font-bold text-white">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tagNames.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/10 text-white/70 hover:border-purple-500/50 hover:text-white cursor-pointer"
                      onClick={() => {
                        setSearchQuery(tag)
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Recent Posts</h3>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <BlogCard key={post.id} post={post} variant="sidebar" />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
                <h3 className="mb-2 text-xl font-bold text-white">Subscribe to Our Newsletter</h3>
                <p className="mb-4 text-sm text-white/70">
                  Get the latest articles and insights delivered straight to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main >

      <Footer />
    </div >
  )
}

