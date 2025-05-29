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
    <div className="w-full container mx-auto px-4 py-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-text-light">welcome to learn.mtandaocentre</h1>
      <p className="text-lg md:text-xl text-text-light/70 mb-6">
        your online learning partner
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {!user && (
          <>
            <Link
              to="/register"
              className="bg-accent text-text-light px-5 py-2 rounded-md hover:bg-accent/80 hover:shadow-lg transition-all border-2 border-transparent hover:border-text-light text-sm md:text-base"
            >
              get started
            </Link>
            <Link
              to="/login"
              className="bg-primary-darker text-text-light px-5 py-2 rounded-md hover:bg-primary-darkest transition-all border-2 border-transparent hover:border-text-light text-sm md:text-base"
            >
              login
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Learn/Classes Card */}
        <div className="bg-primary-darker p-4 rounded-lg">
          <FaGraduationCap className="text-3xl mb-3 text-accent mx-auto" />
          <h2 className="text-xl font-bold mb-2 text-text-light">learn</h2>
          <p className="text-text-light/70 text-sm">
            enroll into one of our classes
          </p>
        </div>

        {/* Discuss Card */}
        <div className="bg-primary-darker p-4 rounded-lg">
          <FaWhatsapp className="text-3xl mb-3 text-accent mx-auto" />
          <h2 className="text-xl font-bold mb-2 text-text-light">discuss</h2>
          <p className="text-text-light/70 text-sm">
            join our students whatsapp group
          </p>
        </div>

        {/* Analytics Card */}
        <div className="bg-primary-darker p-4 rounded-lg">
          <FaChartLine className="text-3xl mb-3 text-accent mx-auto" />
          <h2 className="text-xl font-bold mb-2 text-text-light">analytics</h2>
          <p className="text-text-light/70 text-sm">
            track your progress with data
          </p>
        </div>
      </div>

      {/*<FloatingChat />*/}
    </div>
  );
};

export default Home;