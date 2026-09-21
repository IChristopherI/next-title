import axios from "axios";

export async function getSheduleWeek(query: string, variables: { start: number; end: number }) {
        return await axios.post(`https://graphql.anilist.co`, { query, variables });
}

