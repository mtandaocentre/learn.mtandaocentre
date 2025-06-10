import User from '../models/User.js';
import Article from '../models/Article.js';
import Analytics from '../models/Analytics.js'; // Make sure you have this model

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Get all articles (admin view)
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).populate('author', 'username');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles' });
  }
};

// Delete article (admin only)
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article' });
  }
};

// Add this function for dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get basic counts
    const userCount = await User.countDocuments();
    const articleCount = await Article.countDocuments();
    
    // Get analytics data if you have an Analytics model
    let analyticsData = {};
    if (Analytics) {
      analyticsData = await Analytics.findOne().sort({ createdAt: -1 }).lean() || {};
    }
    
    res.status(200).json({
      userCount,
      articleCount,
      ...analyticsData
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
};