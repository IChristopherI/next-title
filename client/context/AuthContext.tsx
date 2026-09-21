import { axiosInstance } from "@/api/axiosInstance";
import { create } from "zustand";
type User = {
    email: string;
    name?: string
    Role: "USER" | "ADMIN";
}

type LoginData = {
    email: string;
    password: string;
}
type AuthStore = {
    user: User | null;
    refreshToken: string;
    isAuth: boolean;
    login: (data: LoginData) => Promise<void>
    logout: () => void;
    checkAuth: () => Promise<void>;
    isLoading: boolean;
}
export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    refreshToken: '',
    isAuth: false,
    isLoading: true,
    login: async ({email, password}) => {
        const response = await axiosInstance.post("/login", { email, password })
        set({ user: response.data.user, refreshToken: response.data.refreshToken, isAuth: true })
    },

    logout: async () => {
        await axiosInstance.post("/logout", {})
        set({user:null, refreshToken: '', isAuth:false})
        
    },
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/me")
            set({ user: response.data.user, refreshToken: response.data.refreshToken, isAuth: true })
        } catch (error) {
            set({ user: null, refreshToken: '', isAuth: false})
            console.log("Error checking authentication:", error);
        }  finally {
            set({ isLoading: false });
        }
    }
})) 