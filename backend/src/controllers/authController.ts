import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Username, email, dan password wajib diisi" });
      return;
    }

    try {
      // Cek apakah email sudah digunakan
      const existingEmail = await UserModel.findByEmail(email);
      if (existingEmail) {
        res.status(409).json({ message: "Email sudah digunakan" });
        return;
      }

      // Cek apakah username sudah digunakan
      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        res.status(409).json({ message: "Username sudah digunakan" });
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Buat user baru
      const user = await UserModel.create(username, email, hashedPassword);

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      res.status(201).json({
        message: "Registrasi berhasil",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email dan password wajib diisi" });
      return;
    }

    try {
      // Cari user berdasarkan email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Email atau password salah" });
        return;
      }

      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Email atau password salah" });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      res.status(200).json({
        message: "Login berhasil",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
