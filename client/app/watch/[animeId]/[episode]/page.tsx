import Player from "@/components/player/Player";

export default async function WatchPage({params}: { params: Promise<{ animeId: string; episode: string; }>; }) {
  const { animeId, episode } = await params;

  return (
    <Player
      animeId={animeId}
      episode={episode}
    />
  );
}