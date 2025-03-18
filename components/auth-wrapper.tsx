"use client";

import React from "react";
import { useAuth } from '@/hooks/useAuth'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <div></div>;
    }
    return <>{children}</>;
}
