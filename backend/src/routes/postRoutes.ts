import { Router } from "express";
import { postController } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API untuk manajemen postingan timeline
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Mendapatkan semua postingan
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Daftar seluruh postingan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Public routes
router.get("/", postController.getAll);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Mendapatkan satu postingan berdasarkan ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari postingan
 *     responses:
 *       200:
 *         description: Data postingan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Postingan tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", postController.getById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Membuat postingan baru
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Halo, ini postingan!
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://image.com/pic.jpg
 *     responses:
 *       201:
 *         description: Postingan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Tidak terautentikasi
 */
// Protected routes (butuh login)
router.post("/", authMiddleware, postController.create);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Mengubah (edit) postingan milik sendiri
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari postingan yang diedit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Postingan berhasil diedit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *         description: Bukan pemilik postingan
 *       404:
 *         description: Postingan tidak ditemukan
 */
router.patch("/:id", authMiddleware, postController.update);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Menghapus postingan milik sendiri
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari postingan yang dihapus
 *     responses:
 *       200:
 *         description: Postingan berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Postingan dihapus
 *       403:
 *         description: Bukan pemilik postingan
 *       404:
 *         description: Postingan tidak ditemukan
 */
router.delete("/:id", authMiddleware, postController.remove);

export default router;
