import {
  getRelease,
  searchAnilibria,
} from "./anilibria-service.js";

function cleanTitle(title = "") {
  return title
    .toLowerCase()
    .replace(/\u0451/g, "\u0435")
    .replace(/[^\p{Letter}0-9]+/gu, " ")
    .trim();
}

function getPossibleTitles(anime) {
  return [
    anime.title?.english,
    anime.title?.romaji,
    anime.title?.native,
    ...(anime.synonyms || []),
  ].filter(Boolean);
}

function releaseHasTitle(release, title) {
  const releaseTitles = [
    release.name?.main,
    release.name?.english,
    release.name?.alternative,
  ];

  return releaseTitles
    .filter(Boolean)
    .map(cleanTitle)
    .includes(cleanTitle(title));
}

function getPreviewUrl(episode) {
  const previewUrl = (
    episode.preview?.optimized?.src ||
    episode.preview?.optimized?.preview ||
    episode.preview?.optimized?.thumbnail ||
    episode.preview?.src ||
    episode.preview?.preview ||
    episode.preview?.thumbnail ||
    null
  );

  if (!previewUrl) {
    return null;
  }

  if (previewUrl.startsWith("http")) {
    return previewUrl;
  }

  return `https://anilibria.top${previewUrl}`;
}

async function findRelease(anime) {
  const titles = getPossibleTitles(anime);

  for (const title of titles) {
    const releases = await searchAnilibria(title);
    const foundRelease = releases.find((release) =>releaseHasTitle(release, title));

    if (foundRelease) {
      return getRelease(foundRelease.id);
    }
  }

  return null;
}

export async function getVideoEpisodes(anime) {
  const release = await findRelease(anime);

  if (!release?.episodes?.length) {
    return [];
  }

  return release.episodes.map((episode) => ({
    id: episode.id,
    number: episode.ordinal,
    title: episode.name,
    provider: "anilibria",
    previewUrl: getPreviewUrl(episode),
    hls_480: episode.hls_480,
    hls_720: episode.hls_720,
    hls_1080: episode.hls_1080,
  }));
}

export function getVideoSource(episode) {
  return episode.hls_1080 || episode.hls_720 || episode.hls_480 || null;
}
