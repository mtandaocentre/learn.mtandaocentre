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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-text-light">
        {user ? `Welcome back, ${user.name}!` : "Welcome to learn.mtandaocentre"}
      </h1>
      
      <p className="text-md md:text-lg text-text-light/80 mb-6">
        Your online learning partner
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {!user ? (
          <>
            <Link
              to="/register"
              className="bg-accent text-white px-5 py-2.5 rounded-lg hover:bg-accent/90 hover:shadow-md transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-primary-darker text-text-light px-5 py-2.5 rounded-lg hover:bg-primary-darkest hover:shadow-md transition-all duration-300 border border-primary-light text-sm md:text-base"
            >
              Login
            </Link>
          </>
        ) : (
          <Link
            to="/dashboard"
            className="bg-accent text-white px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-all text-sm md:text-base"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Learn Card */}
        <Link 
          to="/courses" 
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          <div className="p-5 flex flex-col h-full">
            <FaGraduationCap 
              aria-label="Courses" 
              className="text-2xl mb-3 text-accent mx-auto" 
            />
            <h2 className="text-lg font-bold mb-1.5 text-text-light">Learn</h2>
            <p className="text-text-light/70 mb-3 flex-grow text-sm">
              Access structured courses and learning materials
            </p>
            <div className="text-accent font-medium mt-auto text-sm">Browse Courses →</div>
          </div>
        </Link>

        {/* Discuss Card */}
        <a 
          href="https://wa.me/yourgroup" 
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          <div className="p-5 flex flex-col h-full">
            <FaWhatsapp 
              aria-label="Discussion Group" 
              className="text-2xl mb-3 text-accent mx-auto" 
            />
            <h2 className="text-lg font-bold mb-1.5 text-text-light">Discuss</h2>
            <p className="text-text-light/70 mb-3 flex-grow text-sm">
              Join our student community for support and collaboration
            </p>
            <div className="text-accent font-medium mt-auto text-sm">Join Group →</div>
          </div>
        </a>

        {/* Analytics Card */}
        <Link 
          to="/progress" 
          className="block bg-primary-darker rounded-lg hover:bg-primary-darkest transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          <div className="p-5 flex flex-col h-full">
            <FaChartLine 
              aria-label="Progress Analytics" 
              className="text-2xl mb-3 text-accent mx-auto" 
            />
            <h2 className="text-lg font-bold mb-1.5 text-text-light">Analytics</h2>
            <p className="text-text-light/70 mb-3 flex-grow text-sm">
              Track your learning progress and achievements
            </p>
            <div className="text-accent font-medium mt-auto text-sm">View Stats →</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;