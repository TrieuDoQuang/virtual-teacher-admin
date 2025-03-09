"use client";
import AuthWrapper from "@/components/auth-wrapper";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="flex">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
        <div className="flex-1 bg-background w-full">
          {children}
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </AuthWrapper>
  );
}
