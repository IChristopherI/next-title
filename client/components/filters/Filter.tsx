import { ChevronRight } from "lucide-react";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function Filter() {
    const router = useRouter()
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false);

    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Sports"];

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [year, setYear] = useState([2026]);
    const [score, setScore] = useState([0]);

    function toogleGenres(genre: string) {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((item) => item !== genre))
        } else {
            setSelectedGenres([...selectedGenres, genre])
        }
    }

    function applyFilteres() {
        const params = new URLSearchParams();

        if (selectedGenres.length > 0) {
            params.set("genres", selectedGenres.join(","));
        }

            params.set("year", String(year[0]));
            // params.set("score", String(score[0]));

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <aside className=" w-100  sticky top-20 rounded-lg border border-white/10 bg-zinc-950/70 p-4 text-white">
            <div className="w-full ">
                <div className="  mt-1 items-center justify-between rounded-md border border-white/10 bg-white/4 px-4 py-3 text-left transition hover:bg-white/6">

                    <div className="flex justify-between gap-2 mb-1 text-sm text-zinc-400">
                        <p className="text-base p-1 font-medium text-white">Жанры</p>
                        <Button variant={'outline'} onClick={() => setIsOpen(!isOpen)}>Любые <ChevronRight size={16} /></Button>
                    </div>
                    {isOpen && (
                        <div className="rounded-md border border-white/10 bg-white/3 p-3">
                            <div className="grid grid-cols-2 gap-3">
                                {genres.map((genre) => (
                                    <label
                                        key={genre}
                                        htmlFor={genre}
                                        className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300"
                                    >
                                        <Checkbox
                                            id={genre}
                                            checked={selectedGenres.includes(genre)}
                                            onCheckedChange={() => toogleGenres(genre)}
                                        />

                                        {genre}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex  mt-1 items-center justify-between rounded-md border border-white/10 bg-white/4 px-4 py-3 text-left transition hover:bg-white/6">

                    <div>
                        <p className="text-sm font-medium text-white">Тэги</p>
                    </div>

                    <div className="flex  items-center gap-2 text-sm text-zinc-400">
                         <Button variant={'outline'}>Любые <ChevronRight size={16} /></Button>
                      
                    </div>

                </div>

                <div className="mt-4 ">
                    <h1>Год выпуска {year}</h1>
                    <Slider className="mt-2" min={1998} max={2026} step={1} value={year} onValueChange={(value) => setYear(value)} />

                </div>
                <div className="mt-4">
                    <h1>Оценка {score}</h1>
                    <Slider className="mt-2" defaultValue={[0, 100]} max={100} step={1} value={score} onValueChange={(score) => setScore(score)} ></Slider>

                </div>
            </div>


            <div className="mt-6 flex gap-2">
                <Button className="flex-1" onClick={() => applyFilteres()}>
                    Применить
                </Button>

                <Button variant="outline" className="flex-1">
                    Сбросить
                </Button>
            </div>
        </aside>
    );
}