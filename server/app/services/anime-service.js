import { requestAniList } from "./anilist-service.js";

export async function getAnimeList(page = 1, perPage = 20) {
  const query = `
    query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
            media (type: ANIME, sort: POPULARITY_DESC) {
                id
                idMal
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                
                popularity
                episodes
                season
                seasonYear
                averageScore
            }
        }
    }
  `;
  const data = await requestAniList(query, { page, perPage });
  return data.Page.media;
}

export async function getNewAnimeList(page = 1, perPage = 20) {
  const query = `
   query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
            media (type: ANIME, sort:POPULARITY_DESC, status: RELEASING) {
                id
                idMal
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                
                popularity
                episodes
                season
                seasonYear
                averageScore
            }
        }
    }
  `;

  const data = await requestAniList(query, { page, perPage });
  return data.Page.media;
}

export async function getAnimeId(id) {
  const query = `
  query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    idMal
   title {
  english
  romaji
  native
}
synonyms
startDate {
  year
}
    episodes
    averageScore
    coverImage {
      large
    }
    genres

    characters {
     edges {
     node {
        name {
            full
            }
            image {
          large
        }  
        }
     }
    }
    bannerImage
    nextAiringEpisode {
      episode
    }
    type
    format
    description(asHtml: false)
  }
}
  `;
  const data = await requestAniList(query, { id });
  return data.Media;
}


export async function AnimeSearch(search) {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, search: $search) {
          id
          title {
            english
            native
            romaji
          }
          coverImage {
            large
          }
          episodes
          averageScore
          seasonYear
        }
      }
    }
  `;

  const data = await requestAniList(query, {
    search,
  });

  return data.Page.media;
}

export async function FilterParamsAnime({ genres, page, year, perPage }) {
  const query = `
  query ($genres: [String], $year: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(
      type: ANIME
      genre_in: $genres
      seasonYear: $year
      sort: POPULARITY_DESC
    ) {
      id
      title {
        english
        romaji
        native
      }
      genres
      seasonYear
      averageScore
      episodes
      coverImage {
        large
      }
    }
  }
}
  `
  const variables = {
    genres,
    page,
    year,
    perPage: 20,
  };

  console.log("AniList variables:", variables);

  const data = await requestAniList(query, variables)
  return data.Page.media
}