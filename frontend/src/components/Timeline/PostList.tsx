import { useState, useEffect } from 'react'
import PostCard from './PostCard'
import { mockPosts } from '../../data/mockPosts'
import type { Post } from '../../types'

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulasi loading seperti real API fetch
    const timer = setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
