const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
  try {
    const Articles = await Article.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "username")
      .populate("comment.user", "username")
      .populate("likes", "username");

    if (!Article) {
      return res.status(404).json({ message: "Article not found!" });
    }

    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.creatArticle = async (req, res) => {
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

exports.updateArticle = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    if (article.author.toString() != req.user._id.toString()) {
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

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    if (article.author.toString() != req.user._id.toString()) {
      return res.status(401).json({ meassage: "Not Authorised!" });
    }

    await article.remove();
    res.json({ message: "Article Deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.addComment = async (req, res) => {
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
      path: "comment.user",
      select: "username",
    });

    // Get the newly added comment (last one in the array)
    const newComment = article.comments[article.comments.length - 1];

    res.status(500).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article Not Found!" });
    }

    // Check if the user has already liked the article
    if (article.like.includes(req.user._id)) {
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
