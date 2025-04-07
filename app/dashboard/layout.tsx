import type React from "react";
import { Providers } from "@/app/providers";
import { ClientDashboard } from "@/components/client-dashboard";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <ClientDashboard>{children}</ClientDashboard>
      </div>
    </Providers>
  );
}
