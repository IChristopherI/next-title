'use client'

import { useAuthStore } from "@/features/auth/components/Auth";
import { Bell, LogOut, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import SearchAnime from "@/anime/components/AnimeSearch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout)
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-420 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <SidebarTrigger
          title="Открыть меню"
          className="size-9 shrink-0 rounded-md border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
        />

        <div className="min-w-0 max-w-3xl flex-1 ml-70">
          <SearchAnime />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            title="Сообщения"
            className="flex size-9 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/8 hover:text-white"
          >
            <MessageCircle size={19} />
          </button>

          <button
            type="button"
            title="Уведомления"
            className="flex size-9 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/8 hover:text-white"
          >
            <Bell size={19} />
          </button>
          {isAuth ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className=" font-medium text-white  p-2 rounded-md cursor-pointer">
                    {user?.name}
                  </p>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44 border-white/10 bg-zinc-950 text-white"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex cursor-pointer items-center gap-2">
                      <User size={16} />
                      Профиль
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={logout}
                    className="flex cursor-pointer items-center gap-2 text-red-300 focus:text-red-300"
                  >
                    <LogOut size={16} />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href={`/login`}>
              <div className="m-1 flex size-10 items-center justify-center rounded-full bg-red-500/15 text-sm font-semibold text-red-300">
                <User size={20} />
              </div>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
