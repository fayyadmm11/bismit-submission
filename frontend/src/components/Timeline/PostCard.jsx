const PostCard = ({ post }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:border-slate-600 transition-colors">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-md">
          {post.avatar}
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-white text-base leading-tight">
            {post.author}
          </h3>
          <div className="flex items-center text-xs text-slate-400 mt-0.5 gap-2">
            <span>{post.role}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span>{post.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        {post.content && (
          <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}
      </div>

      {/* Post Image (Conditional Rendering) */}
      {post.image && (
        <div className="w-full max-h-96 overflow-hidden bg-slate-900 border-t border-b border-slate-700/50">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* Post Footer (Actions) */}
      <div className="p-3 bg-slate-800/50 flex items-center justify-between border-t border-slate-700/50">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors group">
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span className="text-sm font-medium">{post.likes}</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-colors group">
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span className="text-sm font-medium">{post.comments}</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors group">
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            ></path>
          </svg>
          <span className="text-sm font-medium">{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
