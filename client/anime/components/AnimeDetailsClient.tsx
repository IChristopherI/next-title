"use client";

import { Anime } from "@/lib/types";
import useFetch from "@/shared/hooks/useFetch";
import Comments from "@/comments/components/comments";
import AnimeDetails from "./AnimeDetails";

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