export interface Post {
  id: number;
  user_id?: number;
  author: string;
  avatar: string;
  content: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
  // Optional fields dari mock data
  role?: string;
  timestamp?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
