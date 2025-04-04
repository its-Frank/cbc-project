"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  BookOpen,
  FileText,
  Home,
  type LucideIcon,
  Settings,
  User,
  Users,
  Brain,
  CheckSquare,
  PlusSquare,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarNavProps {
  userRole: string
}

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export function DashboardSidebar({ userRole }: SidebarNavProps) {
  const pathname = usePathname()

  // Define navigation items based on user role
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/${userRole}`,
      icon: Home,
    },
  ]

  // Add role-specific navigation items
  if (userRole === "student") {
    navItems.push(
      {
        title: "My Projects",
        href: "/dashboard/student/projects",
        icon: FileText,
      },
      {
        title: "Submit Project",
        href: "/dashboard/student/submit",
        icon: PlusSquare,
      },
      {
        title: "My Competencies",
        href: "/dashboard/student/competencies",
        icon: Brain,
      },
      {
        title: "Feedback",
        href: "/dashboard/student/feedback",
        icon: MessageSquare,
      },
    )
  } else if (userRole === "teacher") {
    navItems.push(
      {
        title: "Tasks",
        href: "/dashboard/teacher/tasks",
        icon: CheckSquare,
      },
      {
        title: "Assessments",
        href: "/dashboard/teacher/assessments",
        icon: BookOpen,
      },
      {
        title: "Students",
        href: "/dashboard/teacher/students",
        icon: Users,
      },
      {
        title: "Reports",
        href: "/dashboard/teacher/reports",
        icon: BarChart,
      },
    )
  } else if (userRole === "parent") {
    navItems.push(
      {
        title: "My Children",
        href: "/dashboard/parent/children",
        icon: Users,
      },
      {
        title: "Projects",
        href: "/dashboard/parent/projects",
        icon: FileText,
      },
      {
        title: "Provide Feedback",
        href: "/dashboard/parent/feedback",
        icon: MessageSquare,
      },
      {
        title: "Competency Progress",
        href: "/dashboard/parent/competencies",
        icon: Brain,
      },
    )
  }

  // Add common navigation items for all roles
  navItems.push(
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  )

  return (
    <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>CBC-EDU Triad</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

