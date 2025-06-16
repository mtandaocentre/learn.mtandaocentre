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
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className={`w-full bg-primary-darker shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-1 border-b border-gray-700" : "py-1.5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <Link 
            to="/" 
            className="text-xl font-bold text-text-light"
            onClick={() => setMobileMenuOpen(false)}
          >
            learn.<span className="text-accent">mtandaocentre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem to="/" icon={<FaHome className="text-base"/>} label="Home" />
            <NavItem to="/courses" icon={<FaGraduationCap className="text-base"/>} label="Courses" />
            <NavItem to="/analytics" icon={<FaChartLine className="text-base"/>} label="Analytics" />
            <NavItem to="/about" icon={<FaInfoCircle className="text-base"/>} label="About" />
            
            {user ? (
              <>
                {user.role === "admin" && (
                  <NavItem 
                    to="/admin" 
                    icon={<FaCog className="text-base"/>} 
                    label="Admin"
                    className="bg-accent/10 hover:bg-accent/20 text-accent"
                  />
                )}
                <NavItem to="/profile" icon={<FaUser className="text-base"/>} label="Profile" />
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-text-light hover:text-accent px-3 py-1.5 rounded-md transition-all hover:bg-primary-darkest text-sm"
                >
                  <FaSignOutAlt className="text-base" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="flex items-center space-x-1 bg-accent text-white px-3 py-1.5 rounded-md transition-all hover:bg-accent/90 text-sm"
                >
                  <FaSignInAlt className="text-base" />
                  <span>Login</span>
                </button>
                
                {loginDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-primary-darker rounded-md shadow-lg z-50 border border-gray-700">
                    <Link
                      to="/login?role=student"
                      className="flex items-center space-x-2 px-4 py-2.5 text-text-light hover:bg-primary-darkest hover:text-accent transition-colors"
                      onClick={() => setLoginDropdownOpen(false)}
                    >
                      <FaGraduationCap className="text-sm" />
                      <span className="text-sm">Sign in as Student</span>
                    </Link>
                    <Link
                      to="/login?role=admin"
                      className="flex items-center space-x-2 px-4 py-2.5 text-text-light hover:bg-primary-darkest hover:text-accent transition-colors"
                      onClick={() => setLoginDropdownOpen(false)}
                    >
                      <FaCog className="text-sm" />
                      <span className="text-sm">Sign in as Admin</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-light hover:text-accent focus:outline-none transition-colors p-1.5 rounded-md hover:bg-primary-darkest"
            >
              <svg
                className="h-5 w-5"
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
          <div className="flex flex-col space-y-0 py-2">
            <MobileNavItem 
              to="/" 
              icon={<FaHome className="text-base"/>} 
              label="Home" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/courses" 
              icon={<FaGraduationCap className="text-base"/>} 
              label="Courses" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/analytics" 
              icon={<FaChartLine className="text-base"/>} 
              label="Analytics" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavItem 
              to="/about" 
              icon={<FaInfoCircle className="text-base"/>} 
              label="About" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {user ? (
              <>
                {user.role === "admin" && (
                  <MobileNavItem 
                    to="/admin" 
                    icon={<FaCog className="text-base"/>} 
                    label="Admin"
                    className="bg-accent/10"
                    onClick={() => setMobileMenuOpen(false)} 
                  />
                )}
                <MobileNavItem 
                  to="/profile" 
                  icon={<FaUser className="text-base"/>} 
                  label="Profile" 
                  onClick={() => setMobileMenuOpen(false)} 
                />
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 px-5 text-text-light hover:bg-primary-darker transition-all text-sm"
                >
                  <FaSignOutAlt className="text-base" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <MobileNavItem 
                  to="/login?role=student" 
                  icon={<FaGraduationCap className="text-base"/>} 
                  label="Sign in as Student"
                  className="bg-accent/10 text-white"
                  onClick={() => setMobileMenuOpen(false)} 
                />
                <MobileNavItem 
                  to="/login?role=admin" 
                  icon={<FaCog className="text-base"/>} 
                  label="Sign in as Admin"
                  className="bg-accent/10 text-white"
                  onClick={() => setMobileMenuOpen(false)} 
                />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, icon, label, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all text-sm ${
        isActive
          ? "text-accent bg-accent/10"
          : "text-text-light hover:text-accent hover:bg-primary-darkest"
      } ${className}`
    }
  >
    <span>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

const MobileNavItem = ({ to, icon, label, onClick, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-2 py-2 px-5 text-sm ${
        isActive
          ? "text-accent bg-accent/10"
          : "text-text-light hover:bg-primary-darker"
      } ${className} transition-colors`
    }
    onClick={onClick}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Navbar;