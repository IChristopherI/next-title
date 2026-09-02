const ANILIST_URL = "https://graphql.anilist.co";

export async function requestAniList(query, variables = {}) {
  const response = await fetch(ANILIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime from AniList");
  }

  const result = await response.json();
  return result.data;
}