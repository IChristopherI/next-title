"use client";

import { Pencil, SendHorizontal } from "lucide-react";
import { useComments } from "@/comments/hooks/use-comments";
import { Input } from "@/shared/ui/input";

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-sky-600",
  "bg-emerald-600",
  "bg-rose-500",
  "bg-amber-600",
];

function getInitials(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

// один и тот же человек всегда получает один и тот же цвет аватара
function getAvatarColor(key: string) {
  const hash = key.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} мин назад`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ч назад`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} дн назад`;

  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
}

function Avatar({ label }: { label: string }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${getAvatarColor(label)}`}
    >
      {getInitials(label)}
    </div>
  );
}

export default function Comments({ id }: { id: number }) {
  const {
    user,
    loading,
    addComment,
    startEditComment,
    cancelEditComment,
    updateComment,
    value,
    comments,
    setValue,
    editingId,
    editedTitle,
    setEditedTitle,
  } = useComments(id);

  if (loading) {
    return <p className="text-sm text-zinc-500">Загрузка комментариев...</p>;
  }

  return (
    <div className="space-y-6 max-w-7xl w-full mx-auto">
      <form onSubmit={addComment} className="flex items-center gap-3">
        <Avatar label={user?.name || user?.email || "Гость"} />
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={user ? "Написать комментарий..." : "Войдите, чтобы оставить комментарий"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="h-11 rounded-full border-zinc-800 bg-zinc-900/60 pl-4 pr-11 focus-visible:ring-indigo-500/40"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-indigo-400 disabled:opacity-30"
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </form>

      <div className="divide-y divide-zinc-800/70">
        {comments.length === 0 && (
          <p className="py-6 text-sm text-zinc-500">Пока нет ни одного комментария — будьте первым.</p>
        )}

        {comments.map((comment) => {
          const isEditingThis = editingId === comment.id;
          const authorLabel = comment.author?.name || comment.author?.email || "Пользователь";
          const isOwn = !!user && comment.author?.email === user.email;

          return (
            <div key={comment.id} className="group flex gap-3 py-4 first:pt-0">
              <Avatar label={authorLabel} />

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-zinc-100">{authorLabel}</span>
                  <span className="text-xs text-zinc-500">{formatRelativeTime(comment.createdAt)}</span>
                </div>

                {isEditingThis ? (
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="text"
                      value={editedTitle}
                      onChange={(event) => setEditedTitle(event.target.value)}
                      className="h-9 rounded-full border-zinc-800 bg-zinc-900/60 focus-visible:ring-indigo-500/40"
                      autoFocus
                    />
                    <button
                      onClick={() => updateComment(comment.id)}
                      className="shrink-0 text-xs font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={cancelEditComment}
                      className="shrink-0 text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      Отмена
                    </button>
                  </div>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{comment.title}</p>
                )}

                {!isEditingThis && isOwn && (
                  <button
                    onClick={() => startEditComment(comment)}
                    className="mt-1.5 flex items-center gap-1 text-xs text-zinc-600 opacity-0 transition-opacity hover:text-zinc-300 group-hover:opacity-100"
                  >
                    <Pencil size={12} />
                    Изменить
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}