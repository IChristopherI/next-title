'use client';

import { getSheduleWeek } from "@/lib/service";
import { ScheduleItem } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WeeklySchedule() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const now = Math.floor(Date.now() / 1000);
        const nextWeek = now + 7 * 24 * 60 * 60;

        const query = `
          query ($start: Int, $end: Int) {
            Page(page: 1, perPage: 30) {
              airingSchedules(
                airingAt_greater: $start
                airingAt_lesser: $end
                sort: TIME
              ) {
                id
                episode
                airingAt
                media {
                  id
                  title {
                    romaji
                    english
                    native
                  }
                  coverImage {
                    large
                  }
                }
              }
            }
          }
        `;

        const response = await getSheduleWeek(query, { start: now, end: nextWeek });
        setItems(response.data.data.Page.airingSchedules);
      } catch (error) {
        console.log("Ошибка расписания:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSchedule();
  }, []);

  if (loading) {
    return <p className="text-zinc-400">Загрузка...</p>;
  }
  const currentItems = items.slice(0, 10); 
  return (
    <section className="rounded-lg border border-white/8 bg-white/2.5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-white">Расписание</h2>
        <span className="text-xs text-zinc-600">7 дней</span>
      </div>

      <div className="space-y-3">
        {currentItems.map((item) => {
          const date = new Date(item.airingAt * 1000);
          const day = date.toLocaleDateString("ru-RU", {weekday: "short"});
          const time = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit"});
          return (
            <div
              key={item.id}
              className="flex gap-3 rounded-lg bg-white/5 p-2 transition hover:bg-white/10">
              <Image
                src={item.media.coverImage.large}
                alt={item.media.title.english || 'title'}
                className="rounded-md object-cover"
                width={48}
                height={64}/>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {item.media.title.romaji || item.media.title.english || item.media.title.native}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Серия {item.episode}
                </p>

                <p className="mt-1 text-xs text-red-300">
                  {day}, {time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}