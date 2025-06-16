import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaGraduationCap,
  FaWhatsapp,
  FaChartLine
} from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-text-light">
        {user ? `Welcome back, ${user.name}!` : "Welcome to learn.mtandaocentre"}
      </h1>
      
      <p className="text-lg md:text-xl text-text-light/80 mb-8">
        Your online learning partner
      </p>

      <div className="flex justify-center gap-4 mb-10">
        {!user ? (
          <>
            <Link
              to="/register"
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-primary-darker text-text-light px-6 py-3 rounded-lg hover:bg-primary-darkest hover:shadow-lg transition-all duration-300 border border-primary-light"
            >
              Login
            </Link>
          </>
        ) : (
          <Link
            to="/dashboard"
            className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-all"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Learn Card */}
        <Link 
          to="/courses" 
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-xl cursor-pointer"
        >
          <div className="p-6 flex flex-col h-full">
            <FaGraduationCap 
              aria-label="Courses" 
              className="text-3xl mb-4 text-accent mx-auto" 
            />
            <h2 className="text-xl font-bold mb-2 text-text-light">Learn</h2>
            <p className="text-text-light/70 mb-4 flex-grow">
              Access structured courses and learning materials
            </p>
            <div className="text-accent font-medium mt-auto">Browse Courses →</div>
          </div>
        </Link>

        {/* Discuss Card */}
        <a 
          href="https://wa.me/yourgroup" 
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-xl cursor-pointer"
        >
          <div className="p-6 flex flex-col h-full">
            <FaWhatsapp 
              aria-label="Discussion Group" 
              className="text-3xl mb-4 text-accent mx-auto" 
            />
            <h2 className="text-xl font-bold mb-2 text-text-light">Discuss</h2>
            <p className="text-text-light/70 mb-4 flex-grow">
              Join our student community for support and collaboration
            </p>
            <div className="text-accent font-medium mt-auto">Join Group →</div>
          </div>
        </a>

        {/* Analytics Card */}
        <Link 
          to="/progress" 
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-xl cursor-pointer"
        >
          <div className="p-6 flex flex-col h-full">
            <FaChartLine 
              aria-label="Progress Analytics" 
              className="text-3xl mb-4 text-accent mx-auto" 
            />
            <h2 className="text-xl font-bold mb-2 text-text-light">Analytics</h2>
            <p className="text-text-light/70 mb-4 flex-grow">
              Track your learning progress and achievements
            </p>
            <div className="text-accent font-medium mt-auto">View Stats →</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;