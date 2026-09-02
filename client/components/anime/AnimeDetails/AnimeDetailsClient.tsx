"use client";

import AnimeDetails from "@/components/anime/AnimeDetails/AnimeDetails";
import { Anime } from "@/lib/types";
import useFetch from "@/hooks/useFetch";
import Comments from "@/components/comments/comments";

type Props = { id: number; };

export default function AnimeDetailsClient({ id }: Props) {
  const { data, loading, error } = useFetch<Anime>(`/anime/${id}`);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!data) {
    return <div className="text-white">Anime not found</div>;
  }

  return <>
    <AnimeDetails anime={data} />
    <Comments id={id} />
  </>;
}