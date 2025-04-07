"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, LogOut, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardHeaderProps {
  userRole: string;
  userName: string;
}

export function DashboardHeader({ userRole, userName }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Project Submission",
      message: "John Student has submitted a new project: Solar System Model",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Assessment Reminder",
      message: "You have 3 pending project assessments to complete",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Task Due Soon",
      message: "Water Filtration System task is due in 3 days",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Feedback Received",
      message: "Parent feedback received on Recycled Art Project assessment",
      time: "1 day ago",
      read: true,
    },
  ]);

  const router = useRouter();
  const { toast } = useToast();
  const { logout } = useAuth();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });

    // Use direct navigation for more reliability
    window.location.href = "/login";
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-bold">CBC-EDU Triad</span>
            </Link>
            <div className="my-4 flex flex-col space-y-2">
              <Link
                href={`/dashboard/${userRole}`}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              {userRole === "student" && (
                <>
                  <Link
                    href="/dashboard/student/projects"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    My Projects
                  </Link>
                  <Link
                    href="/dashboard/student/competencies"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    My Competencies
                  </Link>
                </>
              )}
              {userRole === "teacher" && (
                <>
                  <Link
                    href="/dashboard/teacher/tasks"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Tasks
                  </Link>
                  <Link
                    href="/dashboard/teacher/assessments"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Assessments
                  </Link>
                  <Link
                    href="/dashboard/teacher/students"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Students
                  </Link>
                  <Link
                    href="/dashboard/teacher/reports"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Reports
                  </Link>
                </>
              )}
              {userRole === "parent" && (
                <>
                  <Link
                    href="/dashboard/parent/children"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    My Children
                  </Link>
                  <Link
                    href="/dashboard/parent/feedback"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Provide Feedback
                  </Link>
                </>
              )}
              <Link
                href="/dashboard/profile"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold hidden md:inline-block">
            CBC-EDU Triad
          </span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between border-b p-3">
                <h4 className="font-medium">Notifications</h4>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No notifications
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b p-3 ${
                        notification.read ? "" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">
                          {notification.title}
                        </h5>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 -mr-1"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t">
                <Link href="/dashboard/notifications">
                  <Button variant="outline" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{userName}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {userRole}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
