import express from "express";
const router = express.Router();
import {
  getUserSavedArticles,
  getUserReadingProgress,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Protected routes (user must be logged in)
router.get("/:userId/saved", protect, getUserSavedArticles);
router.get("/:userId/progress", protect, getUserReadingProgress);

export default router;