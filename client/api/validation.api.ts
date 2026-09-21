import { axiosInstance } from "./axiosInstance";

export async function registration(name: string, email: string, password: string) {
  return await axiosInstance.post(`/registration`, { name, email, password });
}

export async function login(email: string, password: string) {
  return await axiosInstance.post(`/login`, { email, password });
}
