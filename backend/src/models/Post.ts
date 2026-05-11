import pool from "../config/db";
import { Post } from "../types";

export const PostModel = {
  async findAll(): Promise<Post[]> {
    const result = await pool.query<Post>(`
      SELECT
        p.id, p.user_id, p.content, p.image_url, p.created_at, p.updated_at,
        u.username AS author,
        u.username AS avatar
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  },

  async findById(id: number): Promise<Post | null> {
    const result = await pool.query<Post>(
      `
      SELECT
        p.id, p.user_id, p.content, p.image_url, p.created_at, p.updated_at,
        u.username AS author,
        u.username AS avatar
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `,
      [id],
    );
    return result.rows[0] || null;
  },

  async create(
    userId: number,
    content: string | null,
    imageUrl: string | null,
  ): Promise<Post> {
    const result = await pool.query<Post>(
      "INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *",
      [userId, content, imageUrl],
    );
    return result.rows[0];
  },

  async update(
    id: number,
    userId: number,
    content: string | null,
    imageUrl: string | null,
  ): Promise<Post | null> {
    const result = await pool.query<Post>(
      `UPDATE posts
       SET content = $1, image_url = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [content, imageUrl, id, userId],
    );
    return result.rows[0] || null;
  },

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return (result.rowCount ?? 0) > 0;
  },
};
