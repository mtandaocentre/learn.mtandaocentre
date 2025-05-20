import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username") // Fixed from comment.user to comments.user
      .populate("likes", "username");

    if (!article) {
      // Fixed variable name from Article to article
      return res.status(404).json({ message: "Article not found!" });
    }

    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const createArticle = async (req, res) => {
  // Fixed typo in method name
  try {
    const { title, content, tags } = req.body;
    const article = new Article({
      title,
      content,
      tags,
      author: req.user._id,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body; // Fixed variable name from tag to tags
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized!" });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized!" }); // Fixed typo
    }

    await article.deleteOne(); // Changed from remove() to deleteOne()
    res.json({ message: "Article Deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    article.comments.push(comment);
    await article.save();

    // Populate user field in the newly added comment
    await Article.populate(article, {
      path: "comments.user", // Fixed path from comment.user to comments.user
      select: "username",
    });

    // Get the newly added comment (last one in the array)
    const newComment = article.comments[article.comments.length - 1];

    res.status(201).json(newComment); // Fixed status code from 500 to 201
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    // Check if user has already liked the article
    if (article.likes.includes(req.user._id)) {
      // Fixed from like to likes
      return res.status(400).json({ message: "Article Already Liked!" });
    }

    article.likes.push(req.user._id);
    await article.save();
    res.json({ message: "Article Liked!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};
