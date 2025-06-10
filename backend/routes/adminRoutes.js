import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import requireAdmin from "../middlewares/adminMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  getAllArticles,
  deleteArticle,
  getDashboardStats
} from "../controllers/adminController.js";

const router = express.Router();

// All routes protected and require admin role
router.use(protect, requireAdmin);

// User management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Article management
router.get("/articles", getAllArticles);
router.delete("/articles/:id", deleteArticle);

// Analytics
router.get("/stats", getDashboardStats);

export default router;