import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calendar, Edit, ExternalLink, ImageIcon, Link, Star, Tag } from "lucide-react";
import React from "react";

export function OverViewToolSheet({
  viewToolSheet,
  setViewToolSheet,
  setSidebarOpen,
  tool,
  handleEditTool
}: {
  viewToolSheet: boolean;
  setViewToolSheet: (ope: boolean) => void;
  setSidebarOpen: (ope: boolean) => void;
  tool: any;
  handleEditTool: (tool: any) => void;
}) {

  console.log("Tool in ViewToolSheet", tool);

  return (
    <Sheet
      open={viewToolSheet}
      onOpenChange={(open) => {
        setViewToolSheet(open)
        setSidebarOpen(open)
      }}
    >
      <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle>Tool Details</SheetTitle>
          <SheetDescription>Detailed information about {tool.name}</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-1 flex flex-col p-4 border rounded-lg">
            <div className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center mb-4">
              <ImageIcon className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold">{tool.name}</h3>
            <div className="flex items-center mt-1 mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{tool.avgRating}</span>
              <span className="text-muted-foreground text-sm ml-2">({tool._count?.ratings} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1 mb-2">
              {tool.categories.length > 0 && tool.categories.map((cat: any) => (
                <Badge key={cat.category.id} variant="outline" className="text-sm">
                  {cat.category.name}
                </Badge>
              ))}
            </div>

            <div className="mt-auto">
              <Button
                className="w-full bg-white text-black hover:bg-purple-600 hover:text-white mb-2"
                onClick={() => {
                  setViewToolSheet(false)
                  setTimeout(() => {
                    handleEditTool(tool)
                  }, 100)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Tool
              </Button>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                    <p className="mt-1">{tool.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start">
                      <Link className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                        <p className="text-blue-600 hover:underline">{tool.website}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Tags</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tool.tags.length > 0 && tool.tags.map((tag: any) => (
                            <Badge key={tag.tag.id} variant="outline" className="text-sm">
                              {tag.tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                        <p>{tool.company?.name || "Independent"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Added</h4>
                        <p>{new Date(tool.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {/* <div className="border rounded-lg p-3"> */}
                      {/* Free plan */}
                      {tool.pricing?.free && (
                        <div className="flex items-center mb-2">
                          <span className="h-4 w-4 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-sm">Free Plan</span>
                        </div>
                      )}
                      {/* Paid plan */}
                      {tool.pricing?.startingPrice && (
                        <div className="flex items-center mb-2">
                          <span className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></span>
                          <span className="text-sm">Free Trial Plan</span>
                        </div>
                      )}

                      {/* Custom plan */}
                      {tool.pricing?.startingPrice && (
                        <div className="flex items-center mb-2">
                          <span className="h-4 w-4 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-sm">{tool.pricing.startingPrice}$ /{tool.pricing.priceModel}</span>
                        </div>
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stats">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Page Views</h4>
                      <p className="text-2xl font-bold mt-1">{tool._count?.views}</p>
                      <p className="text-sm text-green-600 mt-1">+18.7% vs last month</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Clicks</h4>
                      <p className="text-2xl font-bold mt-1">4,329</p>
                      <p className="text-sm text-green-600 mt-1">+22.4% vs last month</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">saved</h4>
                      <p className="text-2xl font-bold mt-1">{tool._count?.savedBy}</p>
                      <p className="text-sm text-green-600 mt-1">+5.3% vs last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 mt-4">
                    <h4 className="font-medium mb-3">Traffic Sources</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Organic Search</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Direct</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Referral</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Social</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">User Reviews</h4>
                    <p className="text-sm text-muted-foreground">Total: {tool._count?.ratings}</p>
                  </div>

                  <div className="border rounded-lg divide-y">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                          <span className="font-medium">John Doe</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                              fill={star <= 5 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        This tool has completely transformed our content creation process. Highly recommended!
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Posted on Oct 15, 2023</p>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                          <span className="font-medium">Sarah Johnson</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                              fill={star <= 4 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        Great tool with lots of features. The interface could be more intuitive though.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Posted on Oct 10, 2023</p>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                          <span className="font-medium">Michael Chen</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                              fill={star <= 5 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        Absolutely love this tool! It's saved me countless hours of work and the results are
                        fantastic.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Posted on Oct 5, 2023</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View All Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <SheetFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setViewToolSheet(false)
              setSidebarOpen(false)
            }}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

