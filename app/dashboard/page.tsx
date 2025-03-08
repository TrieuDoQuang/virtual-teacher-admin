'use client'

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
export default function Dashboard() {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={() => logout()} className="mt-4">
                <LogOutIcon className="w-4 h-4 mr-2" />
                Logout
            </Button>
        </div>
    )
}
