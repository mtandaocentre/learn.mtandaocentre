import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaHeart,
  FaComment,
} from "react-icons/fa";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/${id}`);
        setArticle(res.data);
      } catch (error) {
        // Changed from 'err' to 'error'
        toast.error(error.response?.data?.message || "Failed to fetch article"); // Use the error
        console.error("Article fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, API_URL]); // Add API_URL to dependencies

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like articles");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/articles/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = await axios.get(`${API_URL}/articles/${id}`);
      setArticle(res.data);
      toast.success("Article liked!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to like article");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/articles/${id}/comments`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = await axios.get(`${API_URL}/articles/${id}`);
      setArticle(res.data);
      setComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!article) {
    return <div className="text-center py-8">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          <div className="flex items-center justify-between text-gray-400">
            <span>
              By {article.author?.username} •{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  user ? "hover:text-accent" : "cursor-default"
                }`}
                disabled={!user}
              >
                <FaHeart
                  className={
                    article.likes?.includes(user?._id) ? "text-red-500" : ""
                  }
                />
                <span>{article.likes?.length || 0}</span>
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-invert max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <FacebookShareButton
              url={window.location.href}
              quote={article.title}
              className="hover:opacity-80 transition"
            >
              <FaFacebook size={24} />
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.href}
              title={article.title}
              className="hover:opacity-80 transition"
            >
              <FaTwitter size={24} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={window.location.href}
              title={article.title}
              summary={article.content.substring(0, 100)}
              source="Learning Blog"
              className="hover:opacity-80 transition"
            >
              <FaLinkedin size={24} />
            </LinkedinShareButton>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Comments ({article.comments?.length || 0})
          </h3>
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 bg-primary-darker border border-gray-600 rounded-md text-text-light mb-2"
                rows="3"
                required
              />
              <button
                type="submit"
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Post Comment
              </button>
            </form>
          )}
          <div className="space-y-4">
            {article.comments?.length > 0 ? (
              article.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-primary-darker p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">
                      {comment.user?.username}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default ArticleDetail;
