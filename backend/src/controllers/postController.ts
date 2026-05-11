import { Request, Response } from "express";
import { PostModel } from "../models/Post";

export const postController = {
  // GET /api/posts
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostModel.findAll();
      res.status(200).json({ data: posts });
    } catch (error) {
      console.error("GetAll posts error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // GET /api/posts/:id
  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const post = await PostModel.findById(id);
      if (!post) {
        res.status(404).json({ message: "Post tidak ditemukan" });
        return;
      }
      res.status(200).json({ data: post });
    } catch (error) {
      console.error("GetById post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // POST /api/posts
  async create(req: Request, res: Response): Promise<void> {
    const { content, image_url } = req.body;
    const userId = req.user!.id;

    if (!content && !image_url) {
      res.status(400).json({ message: "Content atau image_url wajib diisi" });
      return;
    }

    try {
      const post = await PostModel.create(
        userId,
        content ?? null,
        image_url ?? null,
      );
      res.status(201).json({ message: "Post berhasil dibuat", data: post });
    } catch (error) {
      console.error("Create post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // PATCH /api/posts/:id
  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.user!.id;
    const { content, image_url } = req.body;

    // Pastikan minimal satu field dikirim
    if (content === undefined && image_url === undefined) {
      res
        .status(400)
        .json({
          message: "Minimal satu field (content atau image_url) harus dikirim",
        });
      return;
    }

    try {
      // Ambil data post yang ada dulu
      const existing = await PostModel.findById(id);
      if (!existing) {
        res.status(404).json({ message: "Post tidak ditemukan" });
        return;
      }

      // Hanya update field yang dikirim, sisanya pakai nilai lama
      const updatedContent = content !== undefined ? content : existing.content;
      const updatedImageUrl =
        image_url !== undefined ? image_url : existing.image_url;

      const post = await PostModel.update(
        id,
        userId,
        updatedContent,
        updatedImageUrl,
      );
      if (!post) {
        res
          .status(403)
          .json({ message: "Kamu tidak berhak mengubah post ini" });
        return;
      }

      res.status(200).json({ message: "Post berhasil diupdate", data: post });
    } catch (error) {
      console.error("Update post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // DELETE /api/posts/:id
  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    try {
      const deleted = await PostModel.delete(id, userId);
      if (!deleted) {
        res
          .status(404)
          .json({ message: "Post tidak ditemukan atau bukan milik kamu" });
        return;
      }
      res.status(200).json({ message: "Post berhasil dihapus" });
    } catch (error) {
      console.error("Delete post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
