import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaGraduationCap,   // For Learn/Classes
  FaWhatsapp,        // For Discuss
  FaChartLine        // For Analytics
} from "react-icons/fa";
import FloatingChat from "../components/FloatingChat";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-text-light">welcome to learning.mtandaocentre</h1>
      <p className="text-xl text-text-light/70 mb-8">
        your online place for everything computers
      </p>

      <div className="flex justify-center gap-4 mb-12">
        {!user && (
          <>
            <Link
              to="/register"
              className="bg-accent text-text-light px-6 py-3 rounded-md 
                      hover:bg-accent/80 hover:shadow-lg transition-all
                      border-2 border-transparent hover:border-text-light"
            >
              get started
            </Link>
            <Link
              to="/login"
              className="bg-primary-darker text-text-light px-6 py-3 rounded-md 
                      hover:bg-primary-darkest transition-all
                      border-2 border-transparent hover:border-text-light"
            >
              login
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Learn/Classes Card */}
        <div className="bg-primary-darker p-6 rounded-lg">
          <FaGraduationCap className="text-4xl mb-4 text-accent mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-text-light">learn</h2>
          <p className="text-text-light/70">
            enroll into one of our classes
          </p>
        </div>

        {/* Discuss Card */}
        <div className="bg-primary-darker p-6 rounded-lg">
          <FaWhatsapp className="text-4xl mb-4 text-accent mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-text-light">discuss</h2>
          <p className="text-text-light/70">join our students whatsapp group</p>
        </div>

        {/* Analytics Card */}
        <div className="bg-primary-darker p-6 rounded-lg">
          <FaChartLine className="text-4xl mb-4 text-accent mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-text-light">analytics</h2>
          <p className="text-text-light/70">track your progress with data</p>
        </div>
      </div>

      {/*<FloatingChat />*/}
    </div>
  );
};

export default Home;