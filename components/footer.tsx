import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
        <div className="flex flex-col gap-4 md:w-1/3">
          <Link href="/" className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">CBC-EDU Triad</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            A platform for showcasing student innovation projects and enhancing competency tracking for the
            Competency-Based Curriculum (CBC) in Kenya.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">Wami School</li>
              <li className="text-sm text-muted-foreground">info@wamischool.edu</li>
              <li className="text-sm text-muted-foreground">+254 123 456 789</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2025 CBC-EDU Triad. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

