"use client";

import { getAnimeList, getAnimeListFilter } from "@/anime/api/anime.api";
import Card from "@/anime/components/AnimeCard";
import Filter from "@/anime/components/AnimeFilters";
import { CardProps } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeCatalogClient() {
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const filtersFromUrl = searchParams.toString();

  useEffect(() => {
    async function fetchAnimes() {
      try {
        setLoading(true);

        let response;

        if (filtersFromUrl) {
          response = await getAnimeListFilter(page, filtersFromUrl);
        } else {
          response = await getAnimeList(page);
        }

        if (page === 1) {
          setAnimes(response.data);
        } else {
          setAnimes((prev) => [...prev, ...response.data]);
        }
      } catch (error) {
        console.log("Anime fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimes();
  }, [page, filtersFromUrl]);

  function loadMoreAnime() {
    if (!loading) {
      setPage((prev) => prev + 1);
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="grid grid-cols-5 w-270 gap-2 place-items-center">
          {animes.map((anime: CardProps) => (
            <Card
              key={anime.id}
              id={anime.id}
              title={anime.title}
              coverImage={anime.coverImage}
              popularity={anime.popularity}
              averageScore={anime.averageScore}
              seasonYear={anime.seasonYear}
              episodes={anime.episodes}
              size="large"
              category="popularity"
            />
          ))}
        </div>

        <Filter />
      </div>
      {!filtersFromUrl && (
      <button type="button" onClick={loadMoreAnime} disabled={loading}>
        {loading ? "Загрузка..." : "Показать ещё"}
      </button>
      )}
    </>
  );
}