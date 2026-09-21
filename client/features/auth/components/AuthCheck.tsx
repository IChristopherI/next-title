 'use client';
import { useAuthStore } from "@/features/auth/components/Auth";
import { useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    const { checkAuth } = useAuthStore((state) => state);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return <>{children}</>
}