"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, UserPlus, Trash2, Edit2 } from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanyTeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      status: "active",
      lastActive: "Just now",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RJ",
      status: "active",
      lastActive: "Yesterday",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      status: "inactive",
      lastActive: "2 weeks ago",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "Viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MW",
      status: "active",
      lastActive: "3 days ago",
    },
  ]

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-white/70">Manage your team members and their access permissions</p>
        </div>

        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
          onClick={() => setIsAddMemberOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-white">Team Members</CardTitle>
              <CardDescription className="text-white/70">{filteredMembers.length} team members</CardDescription>
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/50 md:w-[240px]"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-sm font-medium text-white/70">Name</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Role</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Last Active</th>
                  <th className="p-4 text-right text-sm font-medium text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-purple-600 text-white">{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-xs text-white/50">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={
                          member.role === "Admin"
                            ? "bg-purple-600 text-white"
                            : member.role === "Editor"
                              ? "bg-blue-600 text-white"
                              : "bg-white/10 text-white"
                        }
                      >
                        {member.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            member.status === "active" ? "bg-green-500" : "bg-white/30"
                          }`}
                        />
                        <span className="text-white">{member.status === "active" ? "Active" : "Inactive"}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white">{member.lastActive}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Roles & Permissions</CardTitle>
            <CardDescription className="text-white/70">
              Understand the different access levels for team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-medium text-white">Admin</h3>
                <p className="mt-1 text-sm text-white/70">
                  Full access to all features. Can manage team members, billing, and all tool settings.
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-medium text-white">Editor</h3>
                <p className="mt-1 text-sm text-white/70">
                  Can add, edit, and delete tools. Can view analytics but cannot manage team or billing.
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-medium text-white">Viewer</h3>
                <p className="mt-1 text-sm text-white/70">
                  Read-only access to tools and analytics. Cannot make changes to any settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Team Activity</CardTitle>
            <CardDescription className="text-white/70">Recent actions taken by team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback className="bg-purple-600 text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">John Doe</span> added a new tool "AI Content Generator"
                  </p>
                  <p className="text-xs text-white/50">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Smith" />
                  <AvatarFallback className="bg-purple-600 text-white">JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">Jane Smith</span> updated pricing for "MarketBoost Pro"
                  </p>
                  <p className="text-xs text-white/50">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback className="bg-purple-600 text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">John Doe</span> invited{" "}
                    <span className="font-medium">Robert Johnson</span> to the team
                  </p>
                  <p className="text-xs text-white/50">3 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Emily Davis" />
                  <AvatarFallback className="bg-purple-600 text-white">ED</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">Emily Davis</span> updated the description for "DataViz Pro"
                  </p>
                  <p className="text-xs text-white/50">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Team Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="border-white/10 bg-black text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Add Team Member</DialogTitle>
            <DialogDescription className="text-white/70">Invite a new member to join your team</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input id="name" placeholder="Enter full name" className="border-white/10 bg-white/5 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <Select>
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-black text-white">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white/50">This determines what permissions they will have</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/10"
              onClick={() => setIsAddMemberOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
              onClick={() => setIsAddMemberOpen(false)}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CompanyDashboardLayout>
  )
}

