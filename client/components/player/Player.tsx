"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  animeId: string;
  episode: string;
};

type AnimeInfo = {
  title: string;
  poster: string;
};

export default function Player({ animeId, episode}: Props) {
  const [videoUrl, setVideoUrl] = useState("");
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const currentEpisode = Number(episode);
  const previousEpisode = currentEpisode - 1;
  const nextEpisode = currentEpisode + 1;
  useEffect(() => {

    async function loadEpisode() {
      try {
        setLoading(true);

        const episodeResponse = await axios.get(
          `http://localhost:5050/api/anime/${animeId}/episodes/${episode}`
        );

        const animeResponse = await axios.get(
          `http://localhost:5050/api/anime/${animeId}`
        );

        const anime = animeResponse.data;

        setVideoUrl(episodeResponse.data.videoUrl || "");

        setAnimeInfo({
          title:
            anime.title.english ||
            anime.title.romaji ||
            anime.title.native ||
            "Без названия",
          poster: anime.coverImage.large,
        });
      } catch (error) {
        console.error("Ошибка загрузки серии:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEpisode();
  }, [animeId, episode]);

  if (loading) {
    return <p className="text-zinc-400">Загрузка...</p>;
  }

  if (!videoUrl || !animeInfo) {
    return <p className="text-zinc-400">Серия не найдена</p>;
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-center text-white"> Серия {episode} </h1>
      <div className="flex items-center  rounded-lg border border-white/10 bg-zinc-950/70 p-4">
        <Image
          src={animeInfo.poster}
          alt={animeInfo.title}
          width={90}
          height={120}
          className="rounded-md object-cover"
        />

        <div className="flex w-full flex-col bg-zinc-800/20 p-2">
          <h2 className="text-xl font-semibold text-white">
            {animeInfo.title}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Сейчас смотрите серию {episode}
          </p>
        </div>
      </div>
      <div className="flex justify-center bg-black">
        <VideoPlayer
          src={videoUrl}
          animeId={animeId}
          episode={episode}
          title={animeInfo.title}
          poster={animeInfo.poster}
        />

      </div>
      <div className="flex items-center justify-between gap-3">
        {currentEpisode > 1 ? (
          <Link href={`/watch/${animeId}/${previousEpisode}`}>
            <Button variant="outline">Предыдущая серия</Button>
          </Link>
        ) : (
          <Button variant="outline" disabled>
            Предыдущая серия
          </Button>
        )}

        <Link href={`/watch/${animeId}/${nextEpisode}`}>
          <Button>Следующая серия</Button>
        </Link>
      </div>
    </section>
  );
}