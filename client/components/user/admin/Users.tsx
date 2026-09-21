"use client";

import useFetch from "@/hooks/useFetch";
import { User } from "@/lib/types";
import { Search, ShieldCheck, UserRound, Users } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch<User[]>(
    "/admin/getUsers"
  );

    const users = data || [];

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const name = user.name?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";

      return name.includes(search) || email.includes(search);
    });
  }, [users, searchTerm]);

  if (loading) {
    return (
      <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-6 text-zinc-400">
        Загрузка пользователей...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-red-300">
        Не удалось загрузить пользователей
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/70 mt-2">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-red-400" />
            <h2 className="text-xl font-semibold text-white">Пользователи</h2>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Всего пользователей: {users.length}
          </p>
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Поиск по имени или email..."
            className="w-full rounded-md border border-white/10 bg-white/4 py-2 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs text-zinc-500">
              <th className="px-5 py-3">Пользователь</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Роль</th>
              <th className="px-5 py-3">Активен</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((adminUser) => (
              <tr
                key={adminUser.id}
                className="border-b border-white/6 transition hover:bg-white/3"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-red-500/10 text-red-300">
                      <UserRound size={18} />
                    </div>

                    <span className="font-medium text-white">
                      {adminUser.name || "Без имени"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-zinc-300">
                  {adminUser.email}
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/4 px-2 py-1 text-xs text-zinc-300">
                    <ShieldCheck size={14} />
                    {adminUser.Role || "User"}
                  </span>
                </td>

                <td className="px-5 py-4 text-zinc-300"> 
                    <span>
                        {adminUser.isActivated ? "Да" : "Нет"}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!filteredUsers.length && (
          <div className="p-8 text-center text-sm text-zinc-500">
            Пользователи не найдены
          </div>
        )}
      </div>
    </section>
  );
}
