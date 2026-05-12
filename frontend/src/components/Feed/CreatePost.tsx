import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { postService } from "../../services/postService";
import type { Post } from "../../types";

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!content.trim() && !imageUrl.trim()) {
      setError("Tulis sesuatu atau masukkan URL gambar!");
      return;
    }

    try {
      setIsLoading(true);
      const newPost = await postService.create({
        content: content.trim() || undefined,
        image_url: imageUrl.trim() || undefined,
      });

      // Tambahkan author info dari user yang login
      const postWithAuthor: Post = {
        ...newPost,
        author: user!.username,
        avatar: user!.username,
      };

      onPostCreated(postWithAuthor);
      setContent("");
      setImageUrl("");
    } catch {
      setError("Gagal membuat post. Coba lagi!");
    } finally {
      setIsLoading(false);
    }
  };

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "U";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-6"
    >
      <div className="flex gap-3 mb-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-md shrink-0">
          {initials}
        </div>

        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Apa yang ingin kamu bagikan, ${user?.username}?`}
          rows={3}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Image URL input */}
      <div className="mb-3 ml-15">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL gambar (opsional)"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full text-sm font-semibold transition-all"
        >
          {isLoading ? "Memposting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
