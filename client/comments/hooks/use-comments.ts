import { useAuthStore } from "@/features/auth/components/Auth";
import useFetch from "../../shared/hooks/useFetch";
import { useState } from "react";
import { Comment } from "@/lib/types";
import { postAddComment, putUpdateComment } from "../api/comments.api";

export function useComments(id: number) {
    const { data, loading } = useFetch<Comment[]>(`/anime/${id}/comments`);
    const { user } = useAuthStore((state) => state);

    const [newComments, setNewComments] = useState<Comment[]>([]);
    const [editedTitles, setEditedTitles] = useState<Record<number, string>>({});

    const [value, setValue] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>("");

    // собираем итоговый список прямо тут, без useEffect и без лишнего состояния
    const comments = [...newComments, ...(data ?? [])].map((comment) =>
        editedTitles[comment.id] ? { ...comment, title: editedTitles[comment.id] } : comment
    );

    async function addComment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!value.trim()) return;

        if (!user) {
            alert("Вы должны быть авторизованы, чтобы оставлять комментарии.");
            return;
        }

        try {
            const response = await postAddComment(Number(id), value);
            setNewComments((prev) => [response.data, ...prev]);
            setValue("");
        } catch (error) {
            console.log(error);
        }
    }

    function startEditComment(comment: Comment) {
        setEditingId(comment.id);
        setEditedTitle(comment.title);
    }

    function cancelEditComment() {
        setEditingId(null);
        setEditedTitle("");
    }

    async function updateComment(commentId: number) {
        if (!editedTitle.trim()) return;

        try {
            await putUpdateComment(commentId, editedTitle);

            setEditedTitles((prev) => ({ ...prev, [commentId]: editedTitle }));
            cancelEditComment();
        } catch (error) {
            console.log(error);
        }
    }
    return {
        addComment,
        startEditComment,
        cancelEditComment,
        updateComment,
        loading,
        comments,
        value,
        setValue,
        editingId,
        editedTitle,
        setEditedTitle,
        user,
    }
}