import pool from "../config/db";
import { User } from "../types";

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return result.rows[0] || null;
  },

  async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    return result.rows[0] || null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  },

  async create(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const result = await pool.query<User>(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, hashedPassword],
    );
    return result.rows[0];
  },
};
