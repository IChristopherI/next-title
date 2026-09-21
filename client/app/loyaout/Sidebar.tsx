'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Heart,
  History,
  Home,
  List,
  ListCollapse,
  LucideIcon,
  Newspaper,
  ThumbsUp,
  Timer,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainMenu = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Каталог", href: "/anime", icon: List },
  { name: "Новинки", href: "/new", icon: Newspaper },
  { name: "Популярное", href: "/popular", icon: ThumbsUp },
  { name: "Скоро выйдет", href: "/upcoming", icon: Timer },
  { name: "Подборки", href: "/collections", icon: ListCollapse },
];

const secondaryMenu = [
  { name: "Избранное", href: "/favorites", icon: Heart },
  { name: "История", href: "/history", icon: History },
  { name: "Сообщество", href: "/community", icon: Users2 },
];

type MenuItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export function AppSidebar() {
  const pathname = usePathname();

  function renderMenu(items: MenuItem[]) {
    return items.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.name}
          href={item.href}
          className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm transition ${
            isActive
              ? "bg-red-500/12 text-red-300"
              : "text-zinc-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
          <span>{item.name}</span>
        </Link>
      );
    });
  }

  return (
    <Sidebar className="border-r border-white/8 bg-[#08090d] text-white">
      <SidebarHeader className="border-b border-white/8 bg-[#08090d] px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div>
            <p className="text-xs text-zinc-500">Dattebayoooo</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-[#08090d] px-2 py-3">
        <SidebarGroup className="gap-1">
          <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Навигация
          </p>
          {renderMenu(mainMenu)}
        </SidebarGroup>

        <SidebarGroup className="mt-2 gap-1 border-t border-white/8 pt-4">
          <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Библиотека
          </p>
          {renderMenu(secondaryMenu)}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/8 bg-[#08090d] p-4">
        
      </SidebarFooter>
    </Sidebar>
  );
}
