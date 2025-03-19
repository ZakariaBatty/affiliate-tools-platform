"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  PenToolIcon as Tool,
  FileText,
  CreditCard,
  Package,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Companies",
      href: "/admin/companies",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Tools",
      href: "/admin/tools",
      icon: <Tool className="h-5 w-5" />,
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
      subItems: [
        {
          title: "Posts",
          href: "/admin/blog",
        },
        {
          title: "Categories",
          href: "/admin/blog/categories",
        },
        {
          title: "Tags",
          href: "/admin/blog/tags",
        },
      ],
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Plans",
      href: "/admin/plans",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileSidebar}
          className="bg-white text-black hover:bg-purple-600 hover:text-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleMobileSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-800 border-r transition-all duration-300 ease-in-out lg:relative",
          expanded ? "w-64" : "w-20",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 mr-2">
                <Tool className="h-5 w-5 text-purple-600" />
              </div>
              {expanded && <span className="font-bold text-lg">Admin Panel</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden lg:flex bg-white text-black hover:bg-purple-600 hover:text-white"
            >
              {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <div key={item.href} className="space-y-1">
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                          !expanded && "justify-center",
                        )}
                      >
                        <div className={cn(!expanded && "mx-auto")}>{item.icon}</div>
                        {expanded && <span className="ml-3">{item.title}</span>}
                      </div>
                    </Link>

                    {expanded && item.subItems && (
                      <div className="ml-8 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href

                          return (
                            <Link key={subItem.href} href={subItem.href}>
                              <div
                                className={cn(
                                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                  isSubActive
                                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
                                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50",
                                )}
                              >
                                <span>{subItem.title}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {expanded && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              )}
              {expanded && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto bg-white text-black hover:bg-purple-600 hover:text-white"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

