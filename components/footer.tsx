import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
              </div>
              <span className="text-xl font-bold text-white">ToolsHub</span>
            </div>
            <p className="mb-4 text-white/70">
              Discover, compare, and implement the best tools for your business growth.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-white/70 hover:text-white">
                  Terms & Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white">
                  Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Newsletter</h3>
            <p className="mb-4 text-white/70">Subscribe to our newsletter to get updates on new tools and features.</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-500"
              />
              <Button type="submit" size="icon" className="bg-purple-600 text-white hover:bg-purple-700">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} ToolsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

