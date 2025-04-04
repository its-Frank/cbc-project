"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MainNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ];

  // Handle logout
  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold">CBC-EDU Triad</span>
      </Link>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2",
                    pathname === item.href
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button className="w-full mb-2">Dashboard</Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <>
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
