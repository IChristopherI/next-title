'use client'

import ProfileAdmin from "@/components/user/admin/Dashboard";
import ProfileUser from "@/components/user/user";
import { useAuthStore } from "@/context/AuthContext";

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
            {user?.Role === "Admin" ? <ProfileAdmin /> :  <ProfileUser />}
        </div>
    )
}