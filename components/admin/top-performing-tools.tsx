import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, Eye, ThumbsUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export function TopPerformingTools() {
  const tools = [
    {
      id: 1,
      name: "AI Content Generator Pro",
      category: "Content Creation",
      views: 12483,
      viewsChange: 18.7,
      clicks: 4329,
      clicksChange: 22.4,
      conversions: 876,
      conversionRate: 20.2,
      conversionChange: 5.3,
    },
    {
      id: 2,
      name: "DataViz AI",
      category: "Data Visualization",
      views: 9872,
      viewsChange: 12.3,
      clicks: 3218,
      clicksChange: 8.9,
      conversions: 643,
      conversionRate: 19.9,
      conversionChange: -2.1,
    },
    {
      id: 3,
      name: "SmartWrite",
      category: "Writing Assistant",
      views: 8754,
      viewsChange: 9.5,
      clicks: 2987,
      clicksChange: 11.2,
      conversions: 597,
      conversionRate: 19.9,
      conversionChange: 3.7,
    },
    {
      id: 4,
      name: "CodeAssist AI",
      category: "Development",
      views: 7632,
      viewsChange: 15.8,
      clicks: 2543,
      clicksChange: 13.6,
      conversions: 508,
      conversionRate: 19.9,
      conversionChange: 0.2,
    },
    {
      id: 5,
      name: "VideoGen AI",
      category: "Video Creation",
      views: 6921,
      viewsChange: -2.3,
      clicks: 2187,
      clicksChange: -4.1,
      conversions: 437,
      conversionRate: 19.9,
      conversionChange: -5.8,
    },
  ]

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Top Performing Tools</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            View all tools
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Tool</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Views</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Clicks</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Conv. Rate</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div>
                      <p className="text-sm font-medium">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{tool.category}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{tool.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {tool.viewsChange > 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : tool.viewsChange < 0 ? (
                          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                        ) : (
                          <Minus className="mr-1 h-3 w-3 text-gray-500" />
                        )}
                        <span
                          className={cn(
                            tool.viewsChange > 0
                              ? "text-green-500"
                              : tool.viewsChange < 0
                                ? "text-red-500"
                                : "text-gray-500",
                          )}
                        >
                          {tool.viewsChange > 0 ? "+" : ""}
                          {tool.viewsChange}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <div className="flex items-center">
                        <ThumbsUp className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{tool.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {tool.clicksChange > 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : tool.clicksChange < 0 ? (
                          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                        ) : (
                          <Minus className="mr-1 h-3 w-3 text-gray-500" />
                        )}
                        <span
                          className={cn(
                            tool.clicksChange > 0
                              ? "text-green-500"
                              : tool.clicksChange < 0
                                ? "text-red-500"
                                : "text-gray-500",
                          )}
                        >
                          {tool.clicksChange > 0 ? "+" : ""}
                          {tool.clicksChange}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="text-sm">{tool.conversionRate}%</p>
                      <div className="flex items-center text-xs mt-1">
                        {tool.conversionChange > 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : tool.conversionChange < 0 ? (
                          <TrendingDown />
                        ) : tool.conversionChange < 0 ? (
                          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                        ) : (
                          <Minus className="mr-1 h-3 w-3 text-gray-500" />
                        )}
                        <span
                          className={cn(
                            tool.conversionChange > 0
                              ? "text-green-500"
                              : tool.conversionChange < 0
                                ? "text-red-500"
                                : "text-gray-500",
                          )}
                        >
                          {tool.conversionChange > 0 ? "+" : ""}
                          {tool.conversionChange}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View tool</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

