import ContinueWatching from "../components/home/ContinueWatch";
import ListTitle from "../components/home/ListTitle";
import NewSeasonAnime from "../components/home/NeSeasonAnime";
import WeeklySchedule from "../components/home/WeeklyShcedule";

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
