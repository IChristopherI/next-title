'use client';

import Link from "next/link";
import { Episode } from "@/lib/types";
import useFetch from "@/shared/hooks/useFetch";


type Props = {
  id: string;
};

export default function EpisodesList({ id }: Props) {
  const {data, loading, error} = useFetch<Episode[]>(`/anime/${id}/episodes`)

  if (loading) {
    return (
      <section className="space-y-5  mr-auto ml-auto max-w-xl">
        <h1 className="text-2xl text-center font-semibold text-white">Серии</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-10 animate-pulse rounded-xl bg-zinc-900"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!data?.length) {
    return <p className="text-zinc-400">Серии не найдены</p>;
  }

  return (
    <section className="space-y-5  mr-auto ml-auto max-w-xl">
        <h1 className="text-2xl text-center font-semibold text-white">Серии</h1>
      <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 xl:grid-cols-3">
        {data.map((episode) => (
          <Link
            key={episode.id}
            href={`/watch/${id}/${episode.ordinal}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition  hover:border-red-950 hover:bg-zinc-900"
          >
            
            <div className="p-2  flex justify-center">
              <h1 className=" font-medium text-white">
                {`Серия ${episode.ordinal}`}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
