"use client";

import { useAuthStore } from "@/features/auth/components/Auth";
import Link from "next/link";
import {
  Clock3,
  Heart,
  History,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function ProfileUser() {
  const { user, logout } = useAuthStore((state) => state);

  const menuItems = [
    {
      title: "Продолжить просмотр",
      description: "Вернуться к последним сериям",
      href: "/",
      icon: Clock3,
    },
    {
      title: "Избранное",
      description: "Твои сохранённые аниме",
      href: "/favorites",
      icon: Heart,
    },
    {
      title: "История",
      description: "Что ты смотрел раньше",
      href: "/history",
      icon: History,
    },
  ];
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <p>Пожалуйста, войдите в систему, чтобы просмотреть свой профиль.</p>
      </div>
    );
  }

  
  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="flex flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/70 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-red-300">User profile</p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 md:w-auto"
          >
            <LogOut size={17} />
            Выйти
          </button>
        </section>

        <section className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-lg bg-red-500/15 text-red-300">
                <UserRound size={32} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {user?.name || "Пользователь"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Обычный аккаунт
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/3 p-3">
                <Mail size={18} className="text-zinc-500" />

                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="text-sm text-white">
                    {user?.email || "Email не указан"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/3 p-3">
                <ShieldCheck size={18} className="text-zinc-500" />

                <div>
                  <p className="text-xs text-zinc-500">Роль</p>
                  <p className="text-sm text-white">
                    {user?.Role || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">
                Быстрые действия
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Основные разделы пользователя.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-lg border border-white/10 bg-white/3 p-4 transition hover:border-red-500/40 hover:bg-red-500/10"
                  >
                    <div className="flex size-10 items-center justify-center rounded-md bg-red-500/15 text-red-300">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}