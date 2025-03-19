"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  BarChart3,
  Package,
  CreditCard,
  Settings,
  Users,
  Bell,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  HelpCircle,
  MessageSquare,
  PlusCircle,
} from "lucide-react"

interface CompanyDashboardLayoutProps {
  children: React.ReactNode
}

export default function CompanyDashboardLayout({ children }: CompanyDashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/company-dashboard",
      icon: LayoutDashboard,
      current: pathname === "/company-dashboard",
    },
    {
      name: "My Tools",
      href: "/company-dashboard/tools",
      icon: Package,
      current: pathname === "/company-dashboard/tools",
    },
    {
      name: "Analytics",
      href: "/company-dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/company-dashboard/analytics",
    },
    {
      name: "Payments",
      href: "/company-dashboard/payments",
      icon: CreditCard,
      current: pathname === "/company-dashboard/payments",
    },
    { name: "Team", href: "/company-dashboard/team", icon: Users, current: pathname === "/company-dashboard/team" },
    {
      name: "Settings",
      href: "/company-dashboard/settings",
      icon: Settings,
      current: pathname === "/company-dashboard/settings",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <div className="hidden border-r border-white/10 bg-black md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
              </div>
              <span className="text-xl font-bold text-white">ToolsHub</span>
            </div>
            <Badge className="ml-2 bg-purple-600 text-white">Company</Badge>
          </div>

          <div className="mt-6 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    item.current ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      item.current ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 px-3">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                asChild
              >
                <Link href="/company-dashboard/tools">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Tool
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex-shrink-0 border-t border-white/10 p-4">
              <div className="flex items-center">
                <div>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback className="bg-purple-600 text-white">AC</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Acme Corp</p>
                  <p className="text-xs text-white/70">Business Plan</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-white/70 hover:text-white">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40 text-white">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] border-white/10 bg-black p-0">
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
                </div>
                <span className="text-xl font-bold text-white">ToolsHub</span>
              </div>
              <Badge className="bg-purple-600 text-white">Company</Badge>
            </div>

            <div className="flex flex-1 flex-col py-6">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
                      item.current ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-4 h-6 w-6 flex-shrink-0 ${
                        item.current ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 px-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/company-dashboard/tools">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Tool
                  </Link>
                </Button>
              </div>

              <div className="mt-6 pt-6">
                <Separator className="mb-6 bg-white/10" />

                <div className="px-3">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wider text-white/50">Support</p>
                  <nav className="mt-2 space-y-1">
                    <a
                      href="#"
                      className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <HelpCircle className="mr-4 h-6 w-6 text-white/70 group-hover:text-white" />
                      Help Center
                    </a>
                    <a
                      href="#"
                      className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <MessageSquare className="mr-4 h-6 w-6 text-white/70 group-hover:text-white" />
                      Contact Support
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex items-center">
                <div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback className="bg-purple-600 text-white">AC</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">Acme Corp</p>
                  <p className="text-sm text-white/70">Business Plan</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-white/70 hover:text-white">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-white/10 bg-black">
          <div className="flex flex-1 justify-between px-4 md:px-6">
            <div className="flex flex-1">
              <div className="flex w-full items-center md:ml-0">
                <div className="relative w-full max-w-lg">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-white/50" aria-hidden="true" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="block w-full rounded-md border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-4 md:ml-6">
              <Button variant="ghost" size="icon" className="relative text-white/70 hover:text-white">
                <Bell className="h-6 w-6" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                  3
                </span>
              </Button>

              <Separator orientation="vertical" className="h-6 bg-white/10" />

              <div className="relative">
                <Button variant="ghost" className="flex items-center gap-2 text-white/70 hover:text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback className="bg-purple-600 text-white">AC</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm md:block">Acme Corp</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

