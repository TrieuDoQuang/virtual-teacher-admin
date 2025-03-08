"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-6 px-4 flex justify-center items-center">
        <h1>Dashboard</h1>
    </div>

  );
}
