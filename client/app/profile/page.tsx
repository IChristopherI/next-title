'use client'

import ProfileAdmin from "@/features/auth/components/admin/Dashboard";
import ProfileUser from "@/features/auth/components/user/user";
import { useAuthStore } from "@/features/auth/components/Auth";

export default function ProfilePage() {
    const { user } = useAuthStore((state) => state);
    const isLoading = useAuthStore((state) => state.isLoading);

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            </div>
        )
    }

    return (
        <div>
            {user?.Role === "ADMIN" ? <ProfileAdmin /> : <ProfileUser />}
        </div>
    )
}