import { CardProps } from "@/lib/types";
import clsx from "clsx";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Card({id,title,averageScore, seasonYear,episodes,coverImage, size,category,}: CardProps) {
  const animeTitle = title.english || title.romaji || "Без названия";

  return (
    <Link
      href={`/anime/${id}`}
      className={clsx(
        "group block min-w-0",
        size === "large" && "w-full"
      )}
    >
      <article className="relative aspect-2/3 overflow-hidden rounded-lg border border-white/8 bg-zinc-900 transition duration-200 group-hover:-translate-y-1 group-hover:border-red-400/35 group-hover:shadow-xl group-hover:shadow-black/30">
        <Image
          className="object-cover transition duration-500 group-hover:scale-105"
          src={coverImage.large}
          alt={animeTitle}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 180px"
        />

        <div className="absolute inset-0 bg-lanier-to-t from-black via-black/10 to-transparent" />

        <div className="absolute left-2 top-2">
          {category === "popularity" ? (
            <span className="flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-zinc-100 backdrop-blur">
              <Star size={13} fill="#facc15" className="text-yellow-400" />
              {averageScore ? (averageScore / 10).toFixed(1) : "N/A"}
            </span>
          ) : (
            <span className="rounded-md bg-red-500 px-2 py-1 text-[11px] font-semibold uppercase text-white">
              Новинка
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white">
            {animeTitle}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            {episodes ? `${episodes} эп.` : "Онгоинг"} · {seasonYear || "N/A"}
          </p>
        </div>
      </article>
    </Link>
  );
}
