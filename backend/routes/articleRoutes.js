import express from "express";
const router = express.Router();
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  addComment,
  likeArticle,
} from "../controllers/articleController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Fixed path (singular)
import requireAdmin from "../middlewares/adminMiddleware.js"; // Correct import

// Public routes
router.get("/", getArticles);
router.get("/:id", getArticleById);

// Admin protected routes - FIXED: changed "admin" to "requireAdmin"
router.post("/", protect, requireAdmin, createArticle);
router.put("/:id", protect, requireAdmin, updateArticle);
router.delete("/:id", protect, requireAdmin, deleteArticle);

// Student protected routes
router.post("/:id/comments", protect, addComment);
router.post("/:id/like", protect, likeArticle);

export default router;