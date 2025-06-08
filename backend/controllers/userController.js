import User from "../models/User.js";
import Article from "../models/Article.js";

// Get user's saved articles
export const getUserSavedArticles = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("savedArticles");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's reading progress
export const getUserReadingProgress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "readingProgress.articleId",
      select: "title",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.readingProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};