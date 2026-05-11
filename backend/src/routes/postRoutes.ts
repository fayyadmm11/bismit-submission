import { Router } from "express";
import { postController } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", postController.getAll);
router.get("/:id", postController.getById);

// Protected routes (butuh login)
router.post("/", authMiddleware, postController.create);
router.patch("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.remove);

export default router;
