import AnimeDetailsClient from "@/anime/components/AnimeDetailsClient";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function AnimePage({ params }: Props) {
  const { id } = await params;

  return <AnimeDetailsClient id={id} />;
}