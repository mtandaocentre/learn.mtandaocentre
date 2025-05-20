import express from "express";
const router = express.Router();
import {
  getArticles,
  getArticleById,
  createArticle, // Fixed typo from creatArticle
  updateArticle,
  deleteArticle,
  addComment,
  likeArticle,
} from "../controllers/articleController.js";
import { protect, admin } from "../middlewares/auth.js";

// Public routes
router.get("/", getArticles);
router.get("/:id", getArticleById);

// Admin protected routes
router.post("/", protect, admin, createArticle); // Fixed typo here
router.put("/:id", protect, admin, updateArticle);
router.delete("/:id", protect, admin, deleteArticle);

// Student protected routes
router.post("/:id/comments", protect, addComment);
router.post("/:id/like", protect, likeArticle);

export default router;
