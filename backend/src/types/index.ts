export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Post {
  id: number;
  user_id: number;
  content: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
  // joined fields
  author?: string;
  avatar?: string;
  role?: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

// Extend Express Request to include user from JWT
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
