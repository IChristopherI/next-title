import axios from "axios";
import { create } from "zustand";
type User = {
    email: string;
    name?: string
    Role: "Admin" | "User";
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
    Role: '',
    isLoading: true,
    login: async ({email, password}) => {
        const response = await axios.post("http://localhost:5050/api/login", { email, password }, { withCredentials: true })
        set({ user: response.data.user, refreshToken: response.data.refreshToken, isAuth: true })
    },

    logout: async () => {
        await axios.post("http://localhost:5050/api/logout", {}, { withCredentials: true })
        set({user:null, refreshToken: '', isAuth:false})
        
    },
    checkAuth: async () => {
        try {
            const response = await axios.get("http://localhost:5050/api/me", { withCredentials: true })
            set({ user: response.data.user, refreshToken: response.data.refreshToken, isAuth: true })
        } catch (error) {
            set({ user: null, refreshToken: '', isAuth: false})
        }  finally {
            set({ isLoading: false });
        }
    }
})) 