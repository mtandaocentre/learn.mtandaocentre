const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleById,
  creatArticle,
  updateArticle,
  deleteArticle,
  addComment,
  likeArticle,
} = require("../controllers/articleController");
const { protect, admin } = require("../middlewares/auth");

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", protect, admin, creatArticle);
router.put("/:id", protect, admin, updateArticle);
router.delete("/:id", protect, admin, deleteArticle);

// Stdent only routes
router.post("/:id/comments", protect, addComment);
router.post("/:id/like", protect, likeArticle);

module.exports = router;
