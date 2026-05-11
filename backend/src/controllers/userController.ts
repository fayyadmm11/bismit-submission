import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const userController = {
  // GET /api/users/me
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.user!.id);
      if (!user) {
        res.status(404).json({ message: "User tidak ditemukan" });
        return;
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.error("GetMe error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
