'use client';

import axios from "axios";
import { LoaderCircle, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Anime } from "@/lib/types";
import { searchAnime } from "@/api/anime.api";


function getAnimeTitle(anime: Anime) {
  return anime.title.english || anime.title.romaji || anime.title.native || "Без названия";
}

export default function SearchAnime() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const canSearch = value.trim().length >= 2;

  useEffect(() => {
    if (!canSearch) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
          const response = await searchAnime(value);
        setResults(response.data);
      } catch (error) {
        console.log("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, canSearch]);

  function closeSearch() {
    setValue("");
    setResults([]);
    setIsOpen(false);
  }

  return (
    <div className="relative z-50 w-full">
      <Search
        size={17}
        className="pointer-events-none absolute left-3 top-1/2 z-50 -translate-y-1/2 text-zinc-500"
      />

      <Input
        placeholder="Найти аниме..."
        className="relative z-50 h-10 rounded-md border-white/10 bg-white/5 pl-10 pr-10 text-sm text-white shadow-none placeholder:text-zinc-600 focus-visible:border-red-400/50 focus-visible:ring-red-400/15"
        value={value}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => setValue(event.target.value)}
      />

      {isOpen && value && (
        <button
          type="button"
          title="Очистить поиск"
          onClick={() => {
            setValue("");
            setResults([]);
          }}
          className="absolute right-3 top-1/2 z-50 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          <X size={16} />
        </button>
      )}

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Закрыть поиск"
            onClick={closeSearch}
            className="fixed inset-0 h-screen w-screen z-40 cursor-default bg-black/40 backdrop-blur-[1px]"
          />

          <div className="absolute left-0 top-12 z-50 w-full overflow-hidden rounded-lg border border-white/10 bg-[#111216] shadow-2xl shadow-black/60">
            <div className="max-h-105 overflow-y-auto p-2">
              {!canSearch && (
                <p className="px-3 py-5 text-sm text-zinc-500">
                  Введите минимум два символа
                </p>
              )}

              {canSearch && loading && (
                <div className="flex items-center gap-2 px-3 py-5 text-sm text-zinc-400">
                  <LoaderCircle size={17} className="animate-spin" />
                  Ищем аниме...
                </div>
              )}

              {canSearch && !loading && results.length === 0 && (
                <p className="px-3 py-5 text-sm text-zinc-500">Ничего не найдено</p>
              )}

              {canSearch && !loading && results.map((anime) => (
                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3 rounded-md p-2.5 transition hover:bg-white/6"
                >
                  {anime.coverImage?.large ? (
                    <Image
                      src={anime.coverImage.large}
                      alt={getAnimeTitle(anime)}
                      width={44}
                      height={60}
                      className="h-15 w-11 rounded object-cover"
                    />
                  ) : (
                    <div className="h-15 w-11 rounded bg-zinc-800" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {getAnimeTitle(anime)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {anime.seasonYear || "Год неизвестен"}
                      {anime.averageScore ? ` · ${(anime.averageScore / 10).toFixed(1)}` : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
