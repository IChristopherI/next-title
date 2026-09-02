"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/Axios";
import useFetch from "@/hooks/useFetch";

type Comment = {
  id: number;
  title: string;
  author?: {
    name: string | null;
    email: string;
  };
  createdAt :string
};

type Props = {
  id: number | string;
};

export default function Comments({ id }: Props) {
  const { data, loading, error } = useFetch<Comment[]>(`/anime/${id}/comments`);

  const [value, setValue] = useState("");
  const [newComments, setNewComments] = useState<Comment[]>([]);

  const comments = [...newComments, ...(data ?? [])];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/anime/${id}/comments`,
        { title: value },
        { withCredentials: true }
      );

      setNewComments((prev) => [response.data, ...prev]);
      setValue("");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <p>Загрузка комментариев...</p>;
  }

const date = new Date();
const timeRu = date.toLocaleTimeString('ru-RU');

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Написать комментарий..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />

          <Button type="submit">Отправить</Button>
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {comments.map((comment) => {

          const ruTimer = new Date(comment.createdAt).toLocaleDateString('ru-RU', {  day:'2-digit', month: '2-digit', hour: '2-digit',minute: '2-digit'})
          return(
            <div key={comment.id} className="rounded-lg bg-zinc-900 p-3">
            <p className="text-sm text-zinc-400">
              {comment.author?.name || comment.author?.email || "Пользователь"}
            </p>

            <p>{comment.title}</p>
            <p>{ruTimer}</p>
          </div>
          )
})}

      </div>
    </div>
  );
}