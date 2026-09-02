import { prisma } from "../prisma/prisma.js";

export async function saveAnime(anime) {
  const savedAnime = await prisma.anime.upsert({
    where: {
      anilistId: anime.id,
    },

    update: {
      titleRomaji: anime.title?.romaji,
      titleEnglish: anime.title?.english,
      titleNative: anime.title?.native,
      description: anime.description,
      coverImage: anime.coverImage?.large,
      bannerImage: anime.bannerImage,
      year: anime.startDate?.year,
      status: anime.status,
      episodesCount: anime.episodes,
    },

    create: {
      anilistId: anime.id,
      titleRomaji: anime.title?.romaji,
      titleEnglish: anime.title?.english,
      titleNative: anime.title?.native,
      description: anime.description,
      coverImage: anime.coverImage?.large,
      bannerImage: anime.bannerImage,
      year: anime.startDate?.year,
      status: anime.status,
      episodesCount: anime.episodes,
    },
  });

  return savedAnime;
}

export async function saveEpisodes(anime, episodes) {
  const savedAnime = await prisma.anime.findUnique({
    where: {
      anilistId: anime.id,
    },
  });

  if (!savedAnime) {
    return;
  }

  for (const episode of episodes) {
    await prisma.episode.upsert({
      where: {
        animeId_number: {
          animeId: savedAnime.id,
          number: episode.number,
        },
      },

      update: {
        title: savedAnime.titleEnglish,
        videoUrl: episode.hls_1080 || episode.hls_720 || episode.hls_480,
        provider: episode.provider,
      },

      create: {
        animeId: savedAnime.id,
        number: episode.number,
        title: savedAnime.titleEnglish,
        videoUrl: episode.hls_1080 || episode.hls_720 || episode.hls_480,
        provider: episode.provider,
      },
    });
  }
}