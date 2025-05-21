import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBook,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaComments,
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-darker shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-accent">
            LearnBlog
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
            >
              <FaBook />
              <span>Articles</span>
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
            >
              <FaComments />
              <span>Chat</span>
            </NavLink>

            {user ? (
              <>
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center space-x-1 ${
                        isActive
                          ? "text-accent"
                          : "text-text-light hover:text-accent"
                      } transition`
                    }
                  >
                    <span>Admin</span>
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 ${
                      isActive
                        ? "text-accent"
                        : "text-text-light hover:text-accent"
                    } transition`
                  }
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-text-light hover:text-accent transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center space-x-1 ${
                    isActive
                      ? "text-accent"
                      : "text-text-light hover:text-accent"
                  } transition`
                }
              >
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-light hover:text-accent focus:outline-none"
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
        <div className="md:hidden bg-primary-dark pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaBook />
              <span>Articles</span>
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2 ${
                  isActive ? "text-accent" : "text-text-light hover:text-accent"
                } transition`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaComments />
              <span>Chat</span>
            </NavLink>

            {user ? (
              <>
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 py-2 ${
                        isActive
                          ? "text-accent"
                          : "text-text-light hover:text-accent"
                      } transition`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Admin</span>
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-2 ${
                      isActive
                        ? "text-accent"
                        : "text-text-light hover:text-accent"
                    } transition`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-text-light hover:text-accent transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center space-x-2 py-2 ${
                    isActive
                      ? "text-accent"
                      : "text-text-light hover:text-accent"
                  } transition`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
