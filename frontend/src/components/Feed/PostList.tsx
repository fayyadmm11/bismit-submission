import type { Post } from "../../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-sm">
          Belum ada postingan. Jadilah yang pertama!
        </p>
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
