'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WatchItem } from "@/lib/types";
import { Input } from "@/shared/ui/input";

export default function ContinueWatching() {
    const [items, setItems] = useState<WatchItem[]>([]);
    useEffect(() => {
        async function fetchPosters() {
            const saved = localStorage.getItem("continue-watching");
            if (!saved) return;
            const parsed = JSON.parse(saved);
            setItems(parsed);
        }
        fetchPosters();
    }, []);
    
    
    if (!items.length) {
        return (
            <section className="rounded-lg border border-white/8 bg-zinc-900 p-4">
                <p className=" text-lg text-zinc-400">
                    История просмотра пустая
                </p>
            </section>
        );
    }

    return (
        <section className="rounded-lg border border-white/8 bg-zinc-900 p-4">
            <h1 className="mb-4 text-lg font-semibold uppercase tracking-wider text-red-300">
                Продолжить просмотр
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
                {items.map((item) => {

            return( 
                <Link key={`${item.animeId}-${item.episode}`}
                        href={`/watch/${item.animeId}/${item.episode}`}
                        className="flex gap-3 rounded-lg bg-white/5 p-2 transition hover:bg-white/10">
                        <Image
                            src={item.poster}
                            alt={item.title}
                            className=" rounded-md object-cover"
                            width={60}
                            height={60}
                            />

                        <div className="flex flex-col">
                            <h2 className="line-clamp-1 text-sm font-medium text-white">
                                {item.title}
                            </h2>
                                <div className="flex gap-2">
                            <p className="mt-1 text-xs text-zinc-400">
                                Эпизод {item.episode}
                            </p>
                                <p className="items-center">==</p>

                            <p className="mt-1 text-xs text-red-300">
                                {Math.floor(item.time / 60)} мин.
                            </p>
                                </div>
                            <Input className="w-full h-2 mt-2  rounded-lg accent-blue-200  cursor-pointer"  
                            readOnly
                            type="range" 
                            value={item.time / 6}
                            min={0} 
                            max={240}/>
                        </div>
                    </Link>
            )
})}
                </div>
        </section>
    );
}