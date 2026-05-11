import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";

import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middlewares ─────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "BEM Connect API is running" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
});

// ── Start server ─────────────────────────────────────────
const start = async () => {
  try {
    // Test database connection
    await pool.query("SELECT NOW()");
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();
