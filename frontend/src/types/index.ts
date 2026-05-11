export interface Post {
  id: number
  author: string
  role: string
  avatar: string
  timestamp: string
  content: string
  image: string | null
  likes: number
  comments: number
  shares: number
}

export interface User {
  id: number
  username: string
  email: string
}
