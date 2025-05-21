import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error("Auth check error:", error);
          logout();
        }
      }
    };
    checkAuth();
  }, [token, API_URL, logout]);

  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
