"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export function ClientDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("student");
  const [userName, setUserName] = useState("John Doe");
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Determine user role from URL path or auth context
  useEffect(() => {
    // Extract role from URL path as a fallback
    let roleFromPath = "student";
    if (pathname?.includes("/dashboard/teacher")) {
      roleFromPath = "teacher";
    } else if (pathname?.includes("/dashboard/parent")) {
      roleFromPath = "parent";
    }

    if (user) {
      // If we have a user from auth context, use that
      setUserRole(user.role.toLowerCase());
      setUserName(user.name);
    } else {
      // Otherwise use the role from the path
      setUserRole(roleFromPath);
      setUserName(
        roleFromPath === "student"
          ? "John Student"
          : roleFromPath === "teacher"
          ? "Jane Teacher"
          : "Robert Parent"
      );
    }
  }, [pathname, user]);

  // For development, show a simple loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // For development, allow access even without authentication
  return (
    <>
      <DashboardHeader userRole={userRole} userName={userName} />
      <div className="flex flex-1">
        <DashboardSidebar userRole={userRole} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </>
  );
}
