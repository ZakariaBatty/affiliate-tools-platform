"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LogOut, LayoutDashboard, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AddToolDialog } from "@/components/add-tool-dialog"
import { useAuthDialog } from "@/hooks/use-auth-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { open: openAuthDialog } = useAuthDialog()
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Function to scroll to section if on homepage
  const scrollToSection = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Check if link is active
  const isActive = (path: string) => {
    return pathname === path
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return "U"

    const nameParts = session.user.name.split(" ")
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()

    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
            </div>
          </Link>
          <Link href="/" className="text-xl font-bold text-white">
            ToolsHub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            aria-label="Home page"
            className={cn("text-sm transition-colors", isActive("/") ? "text-white" : "text-white/70 hover:text-white")}
          >
            Home
          </Link>
          <Link
            href="/tools"
            aria-label="Browse tools"
            className={cn(
              "text-sm transition-colors",
              isActive("/tools") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className={cn(
              "text-sm transition-colors",
              isActive("/blog") || pathname.startsWith("/blog/") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Blog
          </Link>
          <Link
            href="/#categories"
            onClick={() => scrollToSection("categories")}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm transition-colors",
              isActive("/about") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "text-sm transition-colors",
              isActive("/pricing") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm transition-colors",
              isActive("/contact") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            // Show loading state
            <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse"></div>
          ) : isAuthenticated ? (
            // Show user profile dropdown when authenticated
            <UserProfileDropdown user={session.user} onLogout={handleLogout} initials={getUserInitials()} />
          ) : (
            // Show login dialog when not authenticated
            <Button variant="outline" onClick={() => openAuthDialog({ defaultTab: "login", redirectUrl: "/" })}>
              Log in
            </Button>
          )}

          <AddToolDialog />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black p-6 pt-24 transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-6 bg-black  p-8">
          <Link
            href="/"
            className={cn("text-lg transition-colors", isActive("/") ? "text-white" : "text-white/70 hover:text-white")}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className={cn(
              "text-lg transition-colors",
              isActive("/tools") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className={cn(
              "text-lg transition-colors",
              isActive("/blog") || pathname.startsWith("/blog/") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Blog
          </Link>
          <Link
            href="/#categories"
            onClick={() => scrollToSection("categories")}
            className="text-lg text-white/70 hover:text-white transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => scrollToSection("how-it-works")}
            className="text-lg text-white/70 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              "text-lg transition-colors",
              isActive("/dashboard") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-lg transition-colors",
              isActive("/about") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "text-lg transition-colors",
              isActive("/pricing") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-lg transition-colors",
              isActive("/contact") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white"
              onClick={() => openAuthDialog({ defaultTab: "login" })}
            >
              Login
            </Button>
            <AddToolDialog
              trigger={
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                  Add Your Tool
                </Button>
              }
            />
          </div>
        </nav>
      </div>
    </div>
  )
}


// User Profile Dropdown Component
interface UserProfileDropdownProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }
  onLogout: () => void
  initials: string
}

function UserProfileDropdown({ user, onLogout, initials }: UserProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            {user.role && (
              <p className="mt-1 text-xs text-muted-foreground">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

