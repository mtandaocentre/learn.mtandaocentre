import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        setArticles(res.data);
      } catch (error) {
        console.error("Articles fetch error:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch articles"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [API_URL]); // Add API_URL to dependencies

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Learning Articles</h1>
        {user?.role === "admin" && (
          <Link
            to="/articles/new"
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            New Article
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-primary-darker rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/articles/${article._id}`}
                  className="hover:text-accent"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-400 mb-4">
                {article.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {article.likes?.length || 0} likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
