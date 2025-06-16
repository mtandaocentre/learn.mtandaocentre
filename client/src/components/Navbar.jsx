import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaGraduationCap,
  FaCog,
  FaChartLine
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full bg-primary-darker shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-0 border-b border-gray-700" : "py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-text-light"
            onClick={() => setMobileMenuOpen(false)}
          >
            learn.<span className="text-accent">mtandaocentre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem to="/" icon={<FaHome />} label="Home" />
            <NavItem to="/courses" icon={<FaGraduationCap />} label="Courses" />
            <NavItem to="/analytics" icon={<FaChartLine />} label="Analytics" />
            <NavItem to="/about" icon={<FaInfoCircle />} label="About" />
            
            {user ? (
              <>
                {user.role === "admin" && (
                  <NavItem 
                    to="/admin" 
                    icon={<FaCog />} 
                    label="Admin"
                    className="bg-accent/10 hover:bg-accent/20 text-accent"
                  />
                )}
                <NavItem to="/profile" icon={<FaUser />} label="Profile" />
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-text-light hover:text-accent px-4 py-2 rounded-md transition-all hover:bg-primary-darkest group"
                >
                  <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavItem 
                to="/login" 
                icon={<FaSignInAlt />} 
                label="Login"
                className="bg-accent text-white hover:bg-accent/90 px-4 py-2 rounded-md transition-all"
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-light hover:text-accent focus:outline-none transition-colors p-2 rounded-md hover:bg-primary-darkest"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-darkest border-t border-gray-700 animate-fadeIn">
          <div className="flex flex-col space-y-1 py-3">
            <MobileNavItem 
              to="/" 
              icon={<FaHome />} 
              label="Home" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/courses" 
              icon={<FaGraduationCap />} 
              label="Courses" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/analytics" 
              icon={<FaChartLine />} 
              label="Analytics" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/about" 
              icon={<FaInfoCircle />} 
              label="About" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {user ? (
              <>
                {user.role === "admin" && (
                  <MobileNavItem 
                    to="/admin" 
                    icon={<FaCog />} 
                    label="Admin"
                    className="bg-accent/10"
                    onClick={() => setMobileMenuOpen(false)} 
                  />
                )}
                <MobileNavItem 
                  to="/profile" 
                  icon={<FaUser />} 
                  label="Profile" 
                  onClick={() => setMobileMenuOpen(false)} 
                />
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 py-3 px-6 text-text-light hover:bg-primary-darker transition-all"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <MobileNavItem 
                to="/login" 
                icon={<FaSignInAlt />} 
                label="Login"
                className="bg-accent text-white"
                onClick={() => setMobileMenuOpen(false)} 
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavItem component for desktop
const NavItem = ({ to, icon, label, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
        isActive
          ? "text-accent bg-accent/10"
          : "text-text-light hover:text-accent hover:bg-primary-darkest"
      } ${className}`
    }
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

// Reusable MobileNavItem component
const MobileNavItem = ({ to, icon, label, onClick, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 py-3 px-6 ${
        isActive
          ? "text-accent bg-accent/10"
          : "text-text-light hover:bg-primary-darker"
      } ${className} transition-colors`
    }
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Navbar;