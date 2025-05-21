import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        setArticles(res.data);
      } catch (error) {
        console.error("Fetch articles error:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch articles"
        );
      }
    };

    if (user?.role === "admin") {
      fetchArticles();
    }
  }, [user, API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setArticles(articles.filter((article) => article._id !== id));
      toast.success("Article deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete article");
    }
  };

  if (user?.role !== "admin") {
    return <div className="text-center py-8">Admin access required</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <Link
          to="/articles/new"
          className="bg-accent text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-primary-darker p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-400">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/articles/edit/${article._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(article._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
