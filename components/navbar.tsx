"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoginDialog } from "@/components/login-dialog"
import { AddToolDialog } from "@/components/add-tool-dialog"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
            className={cn("text-sm transition-colors", isActive("/") ? "text-white" : "text-white/70 hover:text-white")}
          >
            Home
          </Link>
          <Link
            href="/tools"
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
            href="/dashboard"
            className={cn(
              "text-sm transition-colors",
              isActive("/dashboard") ? "text-white" : "text-white/70 hover:text-white",
            )}
          >
            Dashboard
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
          <LoginDialog />
          <AddToolDialog />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-black p-6 pt-24 transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-6">
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
            <LoginDialog
              trigger={
                <Button
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                  Login
                </Button>
              }
            />
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

