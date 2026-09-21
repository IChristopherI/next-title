import { axiosInstance } from "./axiosInstance";

export async function postAddComment(id: number, title: string) {
  return await axiosInstance.post(`/anime/${id}/comments`,{ title },{ withCredentials: true });
}

export async function putUpdateComment(id: number, editedTitle: string) {
  return await axiosInstance.put(`/comments/update`, { id, title: editedTitle }, { withCredentials: true });
}