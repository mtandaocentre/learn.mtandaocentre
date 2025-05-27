import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FloatingChat from "../components/FloatingChat";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-text-light">Welcome to Learning Blog</h1>
      <p className="text-xl text-text-light/70 mb-8">
        Explore educational articles and join the community discussion
      </p>

      <div className="flex justify-center gap-4 mb-12">
        {!user && (
          <>
            <Link
              to="/register"
              className="bg-accent text-text-light px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-primary-darker text-text-light px-6 py-3 rounded-md hover:bg-primary-darkest transition-colors"
            >
              Login
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-primary-darker p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-light">Learn</h2>
          <p className="text-text-light/70">
            Discover new articles on various topics
          </p>
        </div>
        <div className="bg-primary-darker p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-light">Discuss</h2>
          <p className="text-text-light/70">Join community conversations</p>
        </div>
        <div className="bg-primary-darker p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-light">Track Progress</h2>
          <p className="text-text-light/70">Monitor your learning journey</p>
        </div>
      </div>

      <FloatingChat />
    </div>
  );
};

export default Home;