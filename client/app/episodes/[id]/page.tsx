import EpisodesList from "@/anime/components/AnimeEpisodeList";

export default async function WatchPage({ params,}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;

  return <EpisodesList  id={id}/>;
}