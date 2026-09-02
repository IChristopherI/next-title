import { axiosInstance } from "./Axios";

export const  getAnimeList = async (page:number) => { 
        return await axiosInstance.get(`/anime/?page=${page}`)
    }

export async function getAnimeListFilter(page: number, filters: string) {
  return await axiosInstance.get(`/anime/filter?${filters}&page=${page}`);
}


export async function getSheduleWeek(query: string, variables: { start: number; end: number }) {
        return await axiosInstance.post(`https://graphql.anilist.co`, { query, variables });
}
