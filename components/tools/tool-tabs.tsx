"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, MessageSquare, Star, ThumbsDown, ThumbsUp, X } from "lucide-react"

type ToolTabsProps = {
  tool: any
}

export function ToolTabs({ tool }: ToolTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="grid w-full grid-cols-4 bg-white/5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <OverviewTab tool={tool} />
      </TabsContent>

      <TabsContent value="features" className="mt-6">
        <FeaturesTab tool={tool} />
      </TabsContent>

      <TabsContent value="pricing" className="mt-6">
        <PricingTab tool={tool} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewsTab tool={tool} />
      </TabsContent>
    </Tabs>
  )
}

function OverviewTab({ tool }: { tool: any }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">About {tool.name}</h2>
        <p className="mb-4 text-white/70">
          {tool.name} is a powerful {tool.category.toLowerCase()} solution designed to help businesses streamline their
          workflows and achieve better results. With its intuitive interface and robust feature set, it's an excellent
          choice for businesses of all sizes.
        </p>
        <p className="text-white/70">
          Whether you're looking to improve productivity, enhance collaboration, or gain valuable insights, {tool.name}{" "}
          offers the tools you need to succeed in today's competitive landscape.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Key Performance Metrics</h2>
        <div className="space-y-4">
          {Object.entries(tool.performance).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-white/70">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                    style={{ width: `${Number(value)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-white">{String(value)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Small Businesses",
              description: `${tool.name} helps small businesses automate tasks and focus on growth.`,
            },
            {
              title: "Enterprise Teams",
              description: `Large organizations use ${tool.name} to improve collaboration and efficiency.`,
            },
            {
              title: "Freelancers",
              description: `Independent professionals rely on ${tool.name} to manage their workflow.`,
            },
          ].map((useCase, index) => (
            <div key={index} className="rounded-lg border border-white/10 bg-white/10 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">{useCase.title}</h3>
              <p className="text-sm text-white/70">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturesTab({ tool }: { tool: any }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">Features & Capabilities</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(tool.features).map(([feature, hasFeature]) => (
          <div key={feature} className="flex items-start gap-3">
            {hasFeature ? (
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-3 w-3 text-green-500" />
              </div>
            ) : (
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20">
                <X className="h-3 w-3 text-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-base font-medium text-white">{feature}</h3>
              <p className="text-sm text-white/70">
                {hasFeature
                  ? `${tool.name} provides robust ${feature.toLowerCase()} capabilities.`
                  : `${tool.name} does not currently offer ${feature.toLowerCase()}.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingTab({ tool }: { tool: any }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">Pricing Plans</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Free Plan */}
        {tool.price.hasFree && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/50">
            <h3 className="mb-2 text-lg font-bold text-white">Free Plan</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">$0</span>
              <span className="text-white/70">/month</span>
            </div>
            <p className="mb-4 text-sm text-white/70">
              Get started with basic features for individuals or small teams.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center text-sm text-white/70">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Limited usage
              </li>
              <li className="flex items-center text-sm text-white/70">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Core features
              </li>
              <li className="flex items-center text-sm text-white/70">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Email support
              </li>
            </ul>
            <Button className="w-full bg-white/10 text-white hover:bg-white/20">Get Started</Button>
          </div>
        )}

        {/* Pro Plan */}
        <div className="relative rounded-xl border border-purple-500/50 bg-white/5 p-6 transition-all hover:border-purple-500">
          <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-xs font-medium text-white">
            Popular
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">Pro Plan</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">${tool.price.monthly}</span>
            <span className="text-white/70">/month</span>
          </div>
          <p className="mb-4 text-sm text-white/70">Perfect for professionals and growing teams with advanced needs.</p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Unlimited usage
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              All features
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Priority support
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Advanced analytics
            </li>
          </ul>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
            Get Started
          </Button>
        </div>

        {/* Enterprise Plan */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/50">
          <h3 className="mb-2 text-lg font-bold text-white">Enterprise</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">Custom</span>
          </div>
          <p className="mb-4 text-sm text-white/70">
            Tailored solutions for large organizations with custom requirements.
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Custom deployment
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Dedicated support
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              SLA guarantees
            </li>
            <li className="flex items-center text-sm text-white/70">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Custom integrations
            </li>
          </ul>
          <Button variant="outline" className="w-full border-white/10 hover:text-white hover:bg-white/10">
            Contact Sales
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/10 p-4">
        <h3 className="mb-2 text-lg font-medium text-white">Annual Pricing</h3>
        <p className="text-white/70">
          Save up to 20% with annual billing. Annual plans start at ${tool.price.yearly}/year.
        </p>
      </div>
    </div>
  )
}

function ReviewsTab({ tool }: { tool: any }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-xl font-bold text-white">User Reviews</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">JD</div>
              </div>
              <div>
                <div className="font-medium text-white">John Doe</div>
                <div className="text-xs text-white/50">Marketing Director</div>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < 5 ? "#EAB308" : "none"}
                  color={i < 5 ? "#EAB308" : "#6b7280"}
                />
              ))}
            </div>
          </div>
          <p className="mb-2 text-sm text-white/70">
            "{tool.name} has completely transformed our workflow. The interface is intuitive, and the features are
            exactly what we needed. Highly recommended!"
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/50">2 weeks ago</div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                <ThumbsUp className="h-3 w-3" />
                <span>12</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                <ThumbsDown className="h-3 w-3" />
                <span>2</span>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">AS</div>
              </div>
              <div>
                <div className="font-medium text-white">Alex Smith</div>
                <div className="text-xs text-white/50">Product Manager</div>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < 4 ? "#EAB308" : "none"}
                  color={i < 4 ? "#EAB308" : "#6b7280"}
                />
              ))}
            </div>
          </div>
          <p className="mb-2 text-sm text-white/70">
            "Great tool with powerful features. The only downside is that it took some time to get used to all the
            functionality. Once you're past the learning curve, it's amazing."
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/50">1 month ago</div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                <ThumbsUp className="h-3 w-3" />
                <span>8</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
                <ThumbsDown className="h-3 w-3" />
                <span>1</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full border-white/10 hover:text-white hover:bg-white/10">
        Load More Reviews
      </Button>
    </div>
  )
}

