 'use client';
import { useAuthStore } from "@/context/AuthContext";
import { useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    const { checkAuth } = useAuthStore((state) => state);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return <>{children}</>
}