import ContinueWatching from "@/anime/components/AnimeContinueWatch";
import ListTitle from "../anime/components/AnimeList";
import WeeklySchedule from "../anime/components/AnimeSchedule";
import NewSeasonAnime from "@/anime/components/AnimeNewSeason";

export default function Home() {
    return (
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
            <div className="space-y-5">
                <WeeklySchedule/>
            </div>

            <div className="min-w-0 space-y-8">
                <ContinueWatching/>
                <ListTitle/>
                <NewSeasonAnime/>
            </div>

        </div>

    );
}
