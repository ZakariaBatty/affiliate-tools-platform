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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Sample user data
const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    status: "active",
    role: "user",
    plan: "Pro",
    joinDate: "2023-05-12",
    lastActive: "2023-10-25",
    tools: 12,
    favorites: 28,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    status: "active",
    role: "user",
    plan: "Basic",
    joinDate: "2023-06-18",
    lastActive: "2023-10-24",
    tools: 5,
    favorites: 14,
  },
  {
    id: 3,
    name: "Emily Wong",
    email: "emily.wong@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    status: "inactive",
    role: "user",
    plan: "Free",
    joinDate: "2023-04-02",
    lastActive: "2023-09-15",
    tools: 0,
    favorites: 7,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JW",
    status: "active",
    role: "admin",
    plan: "Enterprise",
    joinDate: "2022-11-30",
    lastActive: "2023-10-25",
    tools: 32,
    favorites: 45,
  },
  {
    id: 5,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "OM",
    status: "active",
    role: "user",
    plan: "Pro",
    joinDate: "2023-02-14",
    lastActive: "2023-10-23",
    tools: 8,
    favorites: 19,
  },
  {
    id: 6,
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    status: "pending",
    role: "user",
    plan: "Free",
    joinDate: "2023-10-01",
    lastActive: "2023-10-20",
    tools: 0,
    favorites: 3,
  },
  {
    id: 7,
    name: "Sophia Patel",
    email: "sophia.patel@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SP",
    status: "active",
    role: "user",
    plan: "Basic",
    joinDate: "2023-07-22",
    lastActive: "2023-10-24",
    tools: 4,
    favorites: 12,
  },
  {
    id: 8,
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    status: "suspended",
    role: "user",
    plan: "Pro",
    joinDate: "2023-03-15",
    lastActive: "2023-09-05",
    tools: 7,
    favorites: 22,
  },
  {
    id: 9,
    name: "Ava Rodriguez",
    email: "ava.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AR",
    status: "active",
    role: "user",
    plan: "Enterprise",
    joinDate: "2022-12-10",
    lastActive: "2023-10-25",
    tools: 18,
    favorites: 34,
  },
  {
    id: 10,
    name: "Noah Garcia",
    email: "noah.garcia@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NG",
    status: "active",
    role: "user",
    plan: "Basic",
    joinDate: "2023-08-05",
    lastActive: "2023-10-22",
    tools: 2,
    favorites: 9,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [viewUserSheet, setViewUserSheet] = useState(false)
  const [editUserSheet, setEditUserSheet] = useState(false)
  const [deleteUserSheet, setDeleteUserSheet] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addUserSheet, setAddUserSheet] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesPlan = selectedPlan === "all" || user.plan === selectedPlan

    return matchesSearch && matchesStatus && matchesRole && matchesPlan
  })

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setViewUserSheet(true)
    setSidebarOpen(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setEditUserSheet(true)
    setSidebarOpen(true)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setDeleteUserSheet(true)
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
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-white text-black hover:bg-purple-600 hover:text-white"
            onClick={() => {
              setAddUserSheet(true)
              setSidebarOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
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
            placeholder="Search users..."
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
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
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
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No users found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>
                      {user.role === "admin" ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.plan}</TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete user
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

      {selectedUser && (
        <Sheet
          open={viewUserSheet}
          onOpenChange={(open) => {
            setViewUserSheet(open)
            if (!open) {
              // Small delay to ensure smooth transition
              setTimeout(() => setSidebarOpen(false), 300)
            } else {
              setSidebarOpen(true)
            }
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
              <SheetDescription>Detailed information about {selectedUser.name}</SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center p-4 border rounded-lg">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="text-2xl">{selectedUser.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedUser.email}</p>
                {getStatusBadge(selectedUser.status)}
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
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                          <p>{selectedUser.role === "admin" ? "Administrator" : "Regular User"}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Plan</h4>
                          <p>{selectedUser.plan}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Joined</h4>
                          <p>{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Last Active</h4>
                          <p>{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Tools Added</h4>
                          <p>{selectedUser.tools}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Favorites</h4>
                          <p>{selectedUser.favorites}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Recent activity for this user</p>
                      <div className="border rounded-lg divide-y">
                        <div className="p-3 flex items-start">
                          <div className="mr-3 mt-0.5">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Logged in</p>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="p-3 flex items-start">
                          <div className="mr-3 mt-0.5">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Added tool to favorites</p>
                            <p className="text-sm text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                        <div className="p-3 flex items-start">
                          <div className="mr-3 mt-0.5">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Updated profile information</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="security">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Badge variant="outline">Not Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-muted-foreground">Last changed 45 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Reset
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Active Sessions</h4>
                          <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setViewUserSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {selectedUser && (
        <Sheet
          open={editUserSheet}
          onOpenChange={(open) => {
            setEditUserSheet(open)
            if (!open) {
              setTimeout(() => setSidebarOpen(false), 300)
            } else {
              setSidebarOpen(true)
            }
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%]" side="right">
            <SheetHeader>
              <SheetTitle>Edit User</SheetTitle>
              <SheetDescription>Make changes to {selectedUser.name}'s profile</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input id="name" defaultValue={selectedUser.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input id="email" defaultValue={selectedUser.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={selectedUser.status} className="col-span-3">
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
                <label htmlFor="role" className="text-right text-sm font-medium">
                  Role
                </label>
                <Select defaultValue={selectedUser.role} className="col-span-3">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="plan" className="text-right text-sm font-medium">
                  Plan
                </label>
                <Select defaultValue={selectedUser.plan} className="col-span-3">
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
                  setEditUserSheet(false)
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

      {selectedUser && (
        <Sheet
          open={deleteUserSheet}
          onOpenChange={(open) => {
            setDeleteUserSheet(open)
            if (!open) {
              setTimeout(() => setSidebarOpen(false), 300)
            } else {
              setSidebarOpen(true)
            }
          }}
        >
          <SheetContent className="sm:max-w-[500px]" side="right">
            <SheetHeader>
              <SheetTitle>Delete User</SheetTitle>
              <SheetDescription>
                Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
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
                  setDeleteUserSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete User</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add User Sheet */}
      <Sheet
        open={addUserSheet}
        onOpenChange={(open) => {
          setAddUserSheet(open)
          if (!open) {
            setTimeout(() => setSidebarOpen(false), 300)
          } else {
            setSidebarOpen(true)
          }
        }}
      >
        <SheetContent className="w-[70%] sm:max-w-[70%]" side="right">
          <SheetHeader>
            <SheetTitle>Add New User</SheetTitle>
            <SheetDescription>Create a new user account</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input id="new-name" placeholder="Enter full name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input id="new-email" type="email" placeholder="Enter email address" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-status" className="text-right text-sm font-medium">
                Status
              </label>
              <Select defaultValue="active" className="col-span-3">
                <SelectTrigger id="new-status">
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
              <label htmlFor="new-role" className="text-right text-sm font-medium">
                Role
              </label>
              <Select defaultValue="user" className="col-span-3">
                <SelectTrigger id="new-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-plan" className="text-right text-sm font-medium">
                Plan
              </label>
              <Select defaultValue="Basic" className="col-span-3">
                <SelectTrigger id="new-plan">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-password" className="text-right text-sm font-medium">
                Password
              </label>
              <Input id="new-password" type="password" placeholder="Enter password" className="col-span-3" />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddUserSheet(false)
                setTimeout(() => setSidebarOpen(false), 300)
              }}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white">Create User</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setViewUserSheet(false)
            setEditUserSheet(false)
            setDeleteUserSheet(false)
            setAddUserSheet(false)
            setTimeout(() => setSidebarOpen(false), 300)
          }}
        />
      )}
    </div>
  )
}

