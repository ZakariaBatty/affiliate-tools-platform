"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Plus, Edit, Trash, Package, Check, Users, ArrowRight } from "lucide-react"

// Sample plans data
const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 99,
    interval: "month",
    description: "Perfect for individuals and small teams just getting started with affiliate marketing.",
    features: ["Up to 10 affiliate tools", "Basic analytics", "Email support", "1 team member"],
    active: true,
    popular: false,
    subscribers: 245,
  },
  {
    id: 2,
    name: "Pro Plan",
    price: 199,
    interval: "month",
    description: "For growing businesses that need more tools and advanced features.",
    features: [
      "Up to 50 affiliate tools",
      "Advanced analytics",
      "Priority email support",
      "5 team members",
      "Custom branding",
    ],
    active: true,
    popular: true,
    subscribers: 412,
  },
  {
    id: 3,
    name: "Enterprise Plan",
    price: 299,
    interval: "month",
    description: "For large organizations that need the full suite of features and dedicated support.",
    features: [
      "Unlimited affiliate tools",
      "Enterprise analytics",
      "24/7 phone & email support",
      "Unlimited team members",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    active: true,
    popular: false,
    subscribers: 87,
  },
  {
    id: 4,
    name: "Legacy Plan",
    price: 149,
    interval: "month",
    description: "Our previous offering, no longer available for new subscribers.",
    features: ["Up to 25 affiliate tools", "Standard analytics", "Email support", "3 team members"],
    active: false,
    popular: false,
    subscribers: 56,
  },
]

export default function PlansPage() {
  const [editPlanSheet, setEditPlanSheet] = useState(false)
  const [deletePlanSheet, setDeletePlanSheet] = useState(false)
  const [addPlanSheet, setAddPlanSheet] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activeTab, setActiveTab] = useState("list")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan)
    setEditPlanSheet(true)
    setSidebarOpen(true)
  }

  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan)
    setDeletePlanSheet(true)
    setSidebarOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage your subscription plans and pricing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-white text-black hover:bg-purple-600 hover:text-white"
            onClick={() => {
              setAddPlanSheet(true)
              setSidebarOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="mt-0">
              <div className="rounded-lg border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscribers</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{plan.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${plan.price}</p>
                            <p className="text-sm text-muted-foreground">per {plan.interval}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {plan.active ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                          ) : (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                          {plan.popular && (
                            <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Popular</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{plan.subscribers}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground">{plan.features.length} features</p>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit plan
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View subscribers
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeletePlan(plan)} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete plan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`${plan.popular ? "border-purple-200 shadow-md" : ""}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription className="mt-1">{plan.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit plan
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View subscribers
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeletePlan(plan)} className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.interval}</span>
                      </div>
                      <div className="flex mt-2">
                        {plan.active ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                        {plan.popular && (
                          <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Popular</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{plan.subscribers} subscribers</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleEditPlan(plan)}>
                        Edit <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Plan Sheet */}
      {selectedPlan && (
        <Sheet
          open={editPlanSheet}
          onOpenChange={(open) => {
            setEditPlanSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Edit Plan</SheetTitle>
              <SheetDescription>Make changes to the {selectedPlan.name}</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 mt-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Plan Name
                </label>
                <Input id="name" defaultValue={selectedPlan.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  defaultValue={selectedPlan.description}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right text-sm font-medium">
                  Price
                </label>
                <div className="col-span-3 flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="price" type="number" defaultValue={selectedPlan.price} className="pl-7" />
                  </div>
                  <div className="w-32">
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="month">Monthly</option>
                      <option value="year">Yearly</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="features" className="text-right text-sm font-medium pt-2">
                  Features
                </label>
                <div className="col-span-3 space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input defaultValue={feature} className="flex-1" />
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Status</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="active" defaultChecked={selectedPlan.active} />
                  <Label htmlFor="active">Active plan</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Popular</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="popular" defaultChecked={selectedPlan.popular} />
                  <Label htmlFor="popular">Mark as popular plan</Label>
                </div>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditPlanSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Delete Plan Sheet */}
      {selectedPlan && (
        <Sheet
          open={deletePlanSheet}
          onOpenChange={(open) => {
            setDeletePlanSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Plan</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete the "{selectedPlan.name}"? This will affect {selectedPlan.subscribers}{" "}
                subscribers.
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center justify-center py-8">
              <div className="rounded-full bg-red-100 p-3">
                <Trash className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
              <p className="text-amber-800 text-sm">
                <strong>Warning:</strong> Deleting this plan will not automatically cancel subscriptions. You will need
                to manually migrate subscribers to another plan.
              </p>
            </div>
            <SheetFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeletePlanSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete Plan</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add Plan Sheet */}
      <Sheet
        open={addPlanSheet}
        onOpenChange={(open) => {
          setAddPlanSheet(open)
          if (!open) {
            setTimeout(() => setSidebarOpen(false), 300)
          } else {
            setSidebarOpen(true)
          }
        }}
      >
        <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle>Add New Plan</SheetTitle>
            <SheetDescription>Create a new subscription plan</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-plan-name" className="text-right text-sm font-medium">
                Plan Name
              </label>
              <Input id="new-plan-name" placeholder="Enter plan name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="new-plan-description" className="text-right text-sm font-medium pt-2">
                Description
              </label>
              <Textarea
                id="new-plan-description"
                placeholder="Enter plan description"
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-plan-price" className="text-right text-sm font-medium">
                Price
              </label>
              <div className="col-span-3 flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="new-plan-price" type="number" placeholder="99" className="pl-7" />
                </div>
                <div className="w-32">
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="new-plan-features" className="text-right text-sm font-medium pt-2">
                Features
              </label>
              <div className="col-span-3 space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Enter feature" className="flex-1" />
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Enter feature" className="flex-1" />
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Status</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="new-plan-active" defaultChecked />
                <Label htmlFor="new-plan-active">Active plan</Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Popular</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="new-plan-popular" />
                <Label htmlFor="new-plan-popular">Mark as popular plan</Label>
              </div>
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddPlanSheet(false)
                setTimeout(() => setSidebarOpen(false), 300)
              }}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Create Plan</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setEditPlanSheet(false)
            setDeletePlanSheet(false)
            setAddPlanSheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}
        />
      )}
    </div>
  )
}

