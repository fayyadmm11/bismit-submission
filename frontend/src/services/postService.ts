import api from "./api";
import type { Post } from "../types";

interface CreatePostData {
  content?: string;
  image_url?: string;
}

interface PatchPostData {
  content?: string;
  image_url?: string;
}

export const postService = {
  async getAll(): Promise<Post[]> {
    const response = await api.get<{ data: Post[] }>("/api/posts");
    return response.data.data;
  },

  async getById(id: number): Promise<Post> {
    const response = await api.get<{ data: Post }>(`/api/posts/${id}`);
    return response.data.data;
  },

  async create(data: CreatePostData): Promise<Post> {
    const response = await api.post<{ data: Post }>("/api/posts", data);
    return response.data.data;
  },

  async update(id: number, data: PatchPostData): Promise<Post> {
    const response = await api.patch<{ data: Post }>(`/api/posts/${id}`, data);
    return response.data.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/api/posts/${id}`);
  },
};
