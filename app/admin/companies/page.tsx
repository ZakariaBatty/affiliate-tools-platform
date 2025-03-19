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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Plus,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash,
  XCircle,
  Building2,
  PenToolIcon as Tool,
  Calendar,
  Globe,
  Mail,
  Phone,
} from "lucide-react"

// Sample company data
const companies = [
  {
    id: 1,
    name: "TechNova Inc.",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "TN",
    website: "technova.com",
    email: "contact@technova.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    plan: "Enterprise",
    tools: 28,
    users: 15,
    joinDate: "2022-08-15",
    lastActive: "2023-10-25",
    location: "San Francisco, CA",
    industry: "Software Development",
  },
  {
    id: 2,
    name: "DataViz Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "DV",
    website: "dataviz.io",
    email: "info@dataviz.io",
    phone: "+1 (555) 234-5678",
    status: "active",
    plan: "Pro",
    tools: 12,
    users: 8,
    joinDate: "2023-01-10",
    lastActive: "2023-10-24",
    location: "Boston, MA",
    industry: "Data Analytics",
  },
  {
    id: 3,
    name: "CreativeMinds Agency",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "CM",
    website: "creativeminds.co",
    email: "hello@creativeminds.co",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    plan: "Basic",
    tools: 5,
    users: 4,
    joinDate: "2023-03-22",
    lastActive: "2023-09-15",
    location: "Austin, TX",
    industry: "Creative Design",
  },
  {
    id: 4,
    name: "Global AI Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "GA",
    website: "globalai.tech",
    email: "contact@globalai.tech",
    phone: "+1 (555) 456-7890",
    status: "active",
    plan: "Enterprise",
    tools: 32,
    users: 25,
    joinDate: "2022-05-18",
    lastActive: "2023-10-25",
    location: "Seattle, WA",
    industry: "Artificial Intelligence",
  },
  {
    id: 5,
    name: "SmartWrite Technologies",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "SW",
    website: "smartwrite.ai",
    email: "info@smartwrite.ai",
    phone: "+1 (555) 567-8901",
    status: "active",
    plan: "Pro",
    tools: 18,
    users: 12,
    joinDate: "2022-11-30",
    lastActive: "2023-10-23",
    location: "New York, NY",
    industry: "Natural Language Processing",
  },
  {
    id: 6,
    name: "VideoGen Studios",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VG",
    website: "videogen.co",
    email: "hello@videogen.co",
    phone: "+1 (555) 678-9012",
    status: "pending",
    plan: "Basic",
    tools: 7,
    users: 5,
    joinDate: "2023-09-05",
    lastActive: "2023-10-20",
    location: "Los Angeles, CA",
    industry: "Video Production",
  },
  {
    id: 7,
    name: "CodeAssist Labs",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "CA",
    website: "codeassist.dev",
    email: "support@codeassist.dev",
    phone: "+1 (555) 789-0123",
    status: "active",
    plan: "Pro",
    tools: 15,
    users: 10,
    joinDate: "2023-02-14",
    lastActive: "2023-10-24",
    location: "Chicago, IL",
    industry: "Developer Tools",
  },
  {
    id: 8,
    name: "MarketAI Group",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "MA",
    website: "marketai.com",
    email: "info@marketai.com",
    phone: "+1 (555) 890-1234",
    status: "suspended",
    plan: "Enterprise",
    tools: 22,
    users: 18,
    joinDate: "2022-10-12",
    lastActive: "2023-09-05",
    location: "Miami, FL",
    industry: "Marketing Technology",
  },
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [viewCompanySheet, setViewCompanySheet] = useState(false)
  const [editCompanySheet, setEditCompanySheet] = useState(false)
  const [deleteCompanySheet, setDeleteCompanySheet] = useState(false)
  const [addCompanySheet, setAddCompanySheet] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || company.status === selectedStatus
    const matchesPlan = selectedPlan === "all" || company.plan === selectedPlan

    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleViewCompany = (company) => {
    setSelectedCompany(company)
    setViewCompanySheet(true)
    setSidebarOpen(true)
  }

  const handleEditCompany = (company) => {
    setSelectedCompany(company)
    setEditCompanySheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteCompany = (company) => {
    setSelectedCompany(company)
    setDeleteCompanySheet(true)
    setSidebarOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage company accounts and their tools</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-white text-black hover:bg-purple-600 hover:text-white"
            onClick={() => {
              setAddCompanySheet(true)
              setSidebarOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Tools</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No companies found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback>{company.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell>{company.plan}</TableCell>
                  <TableCell>{company.tools}</TableCell>
                  <TableCell>{company.users}</TableCell>
                  <TableCell>{new Date(company.joinDate).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewCompany(company)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCompany(company)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit company
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteCompany(company)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete company
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Company Sheet */}
      {selectedCompany && (
        <Sheet
          open={viewCompanySheet}
          onOpenChange={(open) => {
            setViewCompanySheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Company Details</SheetTitle>
              <SheetDescription>Detailed information about {selectedCompany.name}</SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center p-4 border rounded-lg">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                  <AvatarFallback className="text-2xl">{selectedCompany.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedCompany.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedCompany.industry}</p>
                {getStatusBadge(selectedCompany.status)}
                <div className="mt-4 w-full">
                  <Button className="w-full bg-white text-black hover:bg-purple-600 hover:text-white">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                            <p>{selectedCompany.website}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                            <p>{selectedCompany.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                            <p>{selectedCompany.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                            <p>{selectedCompany.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Joined</h4>
                            <p>{new Date(selectedCompany.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Last Active</h4>
                            <p>{new Date(selectedCompany.lastActive).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-3">Subscription Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium">Current Plan</h5>
                            <p className="text-2xl font-bold mt-1">{selectedCompany.plan}</p>
                            <p className="text-sm text-muted-foreground mt-1">Renews on Nov 15, 2023</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium">Billing Cycle</h5>
                            <p className="text-2xl font-bold mt-1">Monthly</p>
                            <p className="text-sm text-muted-foreground mt-1">Next payment: $199.00</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium">Payment Method</h5>
                            <p className="text-lg font-medium mt-1">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground mt-1">Expires 05/2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tools">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">Company Tools</h4>
                        <p className="text-sm text-muted-foreground">Total: {selectedCompany.tools}</p>
                      </div>
                      <div className="border rounded-lg divide-y">
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Tool className="h-5 w-5 mr-3 text-purple-500" />
                            <div>
                              <p className="font-medium">AI Content Generator Pro</p>
                              <p className="text-xs text-muted-foreground">Content Creation</p>
                            </div>
                          </div>
                          <Badge>Popular</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Tool className="h-5 w-5 mr-3 text-blue-500" />
                            <div>
                              <p className="font-medium">DataViz AI</p>
                              <p className="text-xs text-muted-foreground">Data Visualization</p>
                            </div>
                          </div>
                          <Badge variant="outline">New</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Tool className="h-5 w-5 mr-3 text-green-500" />
                            <div>
                              <p className="font-medium">SmartWrite</p>
                              <p className="text-xs text-muted-foreground">Writing Assistant</p>
                            </div>
                          </div>
                          <Badge>Popular</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Tool className="h-5 w-5 mr-3 text-amber-500" />
                            <div>
                              <p className="font-medium">CodeAssist AI</p>
                              <p className="text-xs text-muted-foreground">Development</p>
                            </div>
                          </div>
                          <Badge variant="outline">Featured</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View All Tools
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="users">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">Company Users</h4>
                        <p className="text-sm text-muted-foreground">Total: {selectedCompany.users}</p>
                      </div>
                      <div className="border rounded-lg divide-y">
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                            </div>
                          </div>
                          <Badge>Admin</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Jane Smith</p>
                              <p className="text-xs text-muted-foreground">jane.smith@example.com</p>
                            </div>
                          </div>
                          <Badge variant="outline">Member</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>RJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Robert Johnson</p>
                              <p className="text-xs text-muted-foreground">robert.j@example.com</p>
                            </div>
                          </div>
                          <Badge variant="outline">Member</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>AL</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Amanda Lee</p>
                              <p className="text-xs text-muted-foreground">amanda.l@example.com</p>
                            </div>
                          </div>
                          <Badge>Admin</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View All Users
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
                  setViewCompanySheet(false)
                  setSidebarOpen(false)
                }}
              >
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Edit Company Sheet */}
      {selectedCompany && (
        <Sheet
          open={editCompanySheet}
          onOpenChange={(open) => {
            setEditCompanySheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%]" side="right">
            <SheetHeader>
              <SheetTitle>Edit Company</SheetTitle>
              <SheetDescription>Make changes to {selectedCompany.name}'s profile</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input id="name" defaultValue={selectedCompany.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="website" className="text-right text-sm font-medium">
                  Website
                </label>
                <Input id="website" defaultValue={selectedCompany.website} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input id="email" defaultValue={selectedCompany.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" defaultValue={selectedCompany.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="industry" className="text-right text-sm font-medium">
                  Industry
                </label>
                <Input id="industry" defaultValue={selectedCompany.industry} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right text-sm font-medium">
                  Location
                </label>
                <Input id="location" defaultValue={selectedCompany.location} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={selectedCompany.status} className="col-span-3">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="plan" className="text-right text-sm font-medium">
                  Plan
                </label>
                <Select defaultValue={selectedCompany.plan} className="col-span-3">
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditCompanySheet(false)
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

      {/* Delete Company Sheet */}
      {selectedCompany && (
        <Sheet
          open={deleteCompanySheet}
          onOpenChange={(open) => {
            setDeleteCompanySheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete Company</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete {selectedCompany.name}? This action cannot be undone and will remove all
                associated tools and data.
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center justify-center py-4">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <SheetFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteCompanySheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete Company</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add Company Sheet */}
      <Sheet
        open={addCompanySheet}
        onOpenChange={(open) => {
          setAddCompanySheet(open)
          if (!open) {
            setTimeout(() => setSidebarOpen(false), 300)
          } else {
            setSidebarOpen(true)
          }
        }}
      >
        <SheetContent className="w-[70%] sm:max-w-[70%]" side="right">
          <SheetHeader>
            <SheetTitle>Add New Company</SheetTitle>
            <SheetDescription>Create a new company account</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-company-name" className="text-right text-sm font-medium">
                Company Name
              </label>
              <Input id="new-company-name" placeholder="Enter company name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-website" className="text-right text-sm font-medium">
                Website
              </label>
              <Input id="new-website" placeholder="Enter website URL" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-company-email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input id="new-company-email" type="email" placeholder="Enter contact email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-phone" className="text-right text-sm font-medium">
                Phone
              </label>
              <Input id="new-phone" placeholder="Enter phone number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-industry" className="text-right text-sm font-medium">
                Industry
              </label>
              <Input id="new-industry" placeholder="Enter industry" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-location" className="text-right text-sm font-medium">
                Location
              </label>
              <Input id="new-location" placeholder="Enter location" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-company-status" className="text-right text-sm font-medium">
                Status
              </label>
              <Select defaultValue="active" className="col-span-3">
                <SelectTrigger id="new-company-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-company-plan" className="text-right text-sm font-medium">
                Plan
              </label>
              <Select defaultValue="Basic" className="col-span-3">
                <SelectTrigger id="new-company-plan">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddCompanySheet(false)
                setTimeout(() => setSidebarOpen(false), 300)
              }}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Create Company</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setViewCompanySheet(false)
            setEditCompanySheet(false)
            setDeleteCompanySheet(false)
            setAddCompanySheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}
        />
      )}
    </div>
  )
}

