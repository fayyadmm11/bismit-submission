import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostList from "../components/Feed/PostList";
import CreatePost from "../components/Feed/CreatePost";
import { postService } from "../services/postService";
import { useAuth } from "../hooks/useAuth";
import type { Post } from "../types";

const TimelinePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAll();
        setPosts(data);
      } catch {
        setError("Gagal memuat postingan. Pastikan backend sudah berjalan.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Timeline</h1>
          <p className="text-slate-400">
            Lihat update terbaru dari teman-teman BEM kamu.
          </p>
        </div>

        {user && <CreatePost onPostCreated={handlePostCreated} />}

        {!user && (
          <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center text-sm text-slate-400">
            <a href="/login" className="text-blue-400 hover:underline">
              Masuk
            </a>{" "}
            atau{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Daftar
            </a>{" "}
            untuk membuat postingan.
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-rose-400 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && <PostList posts={posts} />}
      </main>
      <Footer />
    </div>
  );
};

export default TimelinePage;
