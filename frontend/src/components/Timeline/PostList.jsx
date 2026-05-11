import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { mockPosts } from "../../data/mockPosts";

const PostList = () => {
  // State untuk menyimpan data postingan
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect untuk mensimulasikan pengambilan data (fetch)
  useEffect(() => {
    // Simulasi loading sejenak agar terasa seperti real API fetch
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 500);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
