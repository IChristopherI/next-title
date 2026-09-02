import AnimeDetailsClient from "@/components/anime/AnimeDetails/AnimeDetailsClient";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function AnimePage({ params }: Props) {
  const { id } = await params;

  return <AnimeDetailsClient id={id} />;
}