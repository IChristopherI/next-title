import { axiosInstance } from "./axiosInstance";

export const  getAnimeList = async (page:number) => { 
        return await axiosInstance.get(`/anime/?page=${page}`)
    }

export async function getAnimeListFilter(page: number, filters: string) {
  return await axiosInstance.get(`/anime/filter?${filters}&page=${page}`);
}

export async function searchAnime(query: string) {
  return await axiosInstance.get(`/anime/search?query=${encodeURIComponent(query)}`);
}