'use client'

import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Star } from "lucide-react";
import { Anime } from "@/lib/types";
import { Button } from "@/shared/ui/button";

type Props = {
    anime: Anime;
};
export default function AnimeDetails({ anime }: Props) {
    const title = anime.title.english ?? anime.title.romaji ?? "Untitled";
    const bannerImage = anime.bannerImage || anime.coverImage.large;
    const characters = anime.characters?.edges ?? [];
    const description = anime.description ?.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").trim();
    const shortDescription = description && description.length > 220 ? `${description.slice(0, 220)}...`: description || "No description available.";
    const tabs = ["Overview", "Episodes", "Characters", "Staff", "Reviews", "Recommendations", "Stats"];
    const episodesCount = Array.isArray(anime.episodes) ? anime.episodes.length : anime.episodes ?? "Unknown";

    return (
        <main className="min-h-screen bg-[#07090f] text-white">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={bannerImage}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-[#07090f] via-[#07090f]/80 to-[#07090f]/35" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#07090f] via-transparent to-[#07090f]/20" />
                </div>

                <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-6 pt-5 sm:px-6 lg:flex-row lg:px-8 lg:pt-10">
                    <aside className="w-full shrink-0 sm:w-57.5">
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#151923] shadow-2xl">
                            <div className="relative aspect-2/3">
                                <Image
                                    src={anime.coverImage.large}
                                    alt={title}
                                    fill
                                    sizes="230px"
                                    className="object-cover"
                                />
                            </div>

                            <button className="flex h-12 w-full items-center justify-center gap-2 bg-[#171b25] text-sm font-semibold text-white transition hover:bg-[#202635]">
                                <Plus className="h-4 w-4" />
                                Add to List
                            </button>
                        </div>
                    </aside>

                    <div className="flex min-w-0 flex-1 flex-col justify-center py-2 lg:max-w-4xl lg:py-10">
                        <h1 className="text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
                            {title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                            <span className="rounded bg-white/10 px-3 py-1 text-neutral-200">{anime.format}</span>
                            <span className="rounded bg-white/10 px-3 py-1 text-neutral-200">
  {episodesCount} Episodes
</span>
                            <span className="rounded bg-white/10 px-3 py-1 text-neutral-200">{anime.type}</span>
                            <span className="rounded bg-white/10 px-3 py-1 text-neutral-200">HD</span>
                            <span className="rounded bg-white/10 px-3 py-1 text-neutral-200">CC</span>
                            <span className="mx-2 text-neutral-500">›</span>
                            <span className="flex items-center gap-1 font-semibold text-yellow-400">
                                <Star className="h-4 w-4 fill-yellow-400" />
                                {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A"}
                            </span>
                            {anime.rankings?.allTime ? (
                                <span className="ml-2 font-semibold text-red-400">#{anime.rankings.allTime} Popularity</span>
                            ) : null}
                        </div>

                        <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
                            {shortDescription}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Button asChild className="h-12 w-full rounded-md bg-sky-700 px-10 text-base font-semibold hover:bg-red-500 sm:w-65">
                                <Link href={`/episodes/${anime.id}`}>
                                    <Play className="mr-2 h-4 w-4 fill-white" />
                                    Watch Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <nav className="relative mx-auto flex max-w-7xl gap-8 overflow-x-auto px-4 pb-1 text-sm font-semibold text-neutral-400 sm:px-6 lg:px-8">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            className={`shrink-0 border-b-2 px-1 pb-4 transition ${index === 0
                                ? "border-white text-white"
                                : "border-transparent hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
                <div className="space-y-2">
                    <div>
                        <h2 className="text-2xl font-semibold">Overview</h2>
                        <p className="mt-3 max-w-4xl whitespace-pre-line text-base leading-6 text-neutral-300">
                            {description || "No description available."}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Characters</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                            {characters.slice(0, 6).map((character, index) => (
                                <div key={index} className="overflow-hidden rounded-lg border border-white/10 bg-white/4">
                                    <div className="relative aspect-3/4">
                                        <Image
                                            src={character.node.image.large}
                                            alt={character.node.name.full}
                                            fill
                                            sizes="180px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="min-h-14 px-3 py-2 text-sm font-medium text-neutral-100">
                                        {character.node.name.full}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-5">
                    <div className="rounded-lg border border-white/10 bg-white/4 p-5">
                        <h2 className="text-lg font-semibold">Genres</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {anime.genres.map((genre) => (
                                <span key={genre} className="rounded bg-white/10 px-3 py-1 text-sm text-neutral-200">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/4 p-5">
                        <h2 className="text-lg font-semibold">Details</h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between gap-4">
                                <dt className="text-neutral-400">Type</dt>
                                <dd className="font-medium">{anime.type}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-neutral-400">Format</dt>
                                <dd className="font-medium">{anime.format}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-neutral-400">Episodes</dt>
                                <dd className="font-medium">
  {episodesCount}
</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-neutral-400">Score</dt>
                                <dd className="font-medium">{anime.averageScore ?? "N/A"}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-neutral-400">Next episode</dt>
                                <dd className="font-medium">{anime.nextAiringEpisode?.episode ?? "N/A"}</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </section>
        </main>
    );
}
