export type User = {
  id: string;
  name: string;
  email: string;
  Role?: "Admin" | "User";
  isActive: boolean;
};


export type Anime = {
    id: number;
    title: {
        english: string | null;
        romaji: string | null;
        native: string | null;
    };
    description: string | null;
    episodes: number  | null;
    averageScore: number | null;
    coverImage: {
        large: string;
    };
    rankings?: {
        allTime: string;
    };
    characters: {
        edges: {
            node: {
                name: {
                    full: string;
                };
                image: {
                    large: string;
                };
            };
        }[];
    };
    genres: string[];
    bannerImage: string | null;
    nextAiringEpisode: {
        episode: string;
    } | null;
    type: string;
    format: string;
    episodeList: string;
    seasonYear: number | null;
    popularity: number;
};

export type CardProps = {
  id: number;
  title: {
    english: string | null;
    romaji?: string | null;
  };
  coverImage: {
    large: string;
  };
  popularity: number;
  seasonYear: string;
  episodes: number;
  averageScore?: number;
  size?: "small" | "large";
  category?: "popularity" | "new";
};

export type ScheduleItem = {
  id: number;
  episode: number;
  airingAt: number;
  media: {
    id: number;
    title: {
      romaji: string | null;
      english: string | null;
      native: string | null;
    };
    coverImage: {
      large: string;
    };
  };
};

export type Episode = {
  id: string;
  name: string | null;
  ordinal: number;
  previewUrl: string | null;
};

export type WatchItem = {
    animeId: string;
    episode: string;
    title: string;
    poster: string;
    time: number;
    duration: number;
    updatedAt: number;
};