'use client';

import Card from "@/components/anime/AnimeCard";
import { useSlider } from "@/hooks/use-slide";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Anime } from "@/lib/types";
import useFetch from "@/hooks/useFetch";

export default function ListTitle() {
  const {data, loading, error} = useFetch<Anime[]>(`/anime`);
  const { current, prev, next } = useSlider(data?.length || 0);
 
  const currentAnime = data?.slice(current, current + 6) || [];
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-red-300">
            Выбор зрителей
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">Топ аниме</h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            title="Назад"
            onClick={prev}
            disabled={loading || !data?.length}
            className="flex size-9 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition hover:bg-white/6 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            title="Вперёд"
            onClick={next}
            disabled={loading || !data?.length}
            className="flex size-9 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition hover:bg-white/6 hover:text-white disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="aspect-2/3 w-full rounded-lg bg-white/5" />
            ))
          : currentAnime.map((anime) => (
              <Card
                key={anime.id}
                id={anime.id}
                title={anime.title}
                coverImage={anime.coverImage}
                popularity={anime.popularity}
                averageScore={anime.averageScore || 0}
                seasonYear={String(anime.seasonYear || "")}
                episodes={anime.episodes ?? 0}
                size="small"
                category="popularity"
              />
            ))}
      </div>
    </section>
  );
}
