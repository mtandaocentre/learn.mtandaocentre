import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout } = useAuth();
  const [savedArticles, setSavedArticles] = useState([]);
  const [readingProgress, setReadingProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const [savedRes, progressRes] = await Promise.all([
          axios.get(`${API_URL}/users/${user._id}/saved`, config),
          axios.get(`${API_URL}/users/${user._id}/progress`, config),
        ]);

        setSavedArticles(savedRes.data);
        setReadingProgress(progressRes.data);
      } catch (error) {
        // Changed from 'err' to 'error'
        console.error("User data fetch error:", error); // Now using the error
        toast.error(
          error.response?.data?.message || "Failed to fetch user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, API_URL]);

  if (!user) {
    return (
      <div className="text-center py-8">Please login to view your profile</div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition mt-4 md:mt-0"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>
            {savedArticles.length > 0 ? (
              <ul className="space-y-2">
                {savedArticles.map((article) => (
                  <li key={article._id}>
                    <a
                      href={`/articles/${article._id}`}
                      className="hover:text-accent transition"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No saved articles yet</p>
            )}
          </div>

          <div className="bg-primary-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>
            {readingProgress.length > 0 ? (
              <div className="space-y-4">
                {readingProgress.map((progress) => (
                  <div key={progress.articleId._id}>
                    <div className="flex justify-between mb-1">
                      <span>{progress.articleId.title}</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <div className="w-full bg-primary-dark rounded-full h-2.5">
                      <div
                        className="bg-accent h-2.5 rounded-full"
                        style={{ width: `${progress.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reading progress tracked yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
