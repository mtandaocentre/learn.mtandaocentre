import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Enhanced token generation with role included
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // Include role in the token
      username: user.username // Include username for easy access
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Secure admin registration
export const register = async (req, res) => {
  const { username, email, password, role, adminSecret } = req.body;

  try {
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Handle admin registration
    let userRole = "student";
    if (role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Invalid admin secret" });
      }
      userRole = "admin";
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: userRole
    });

    // Return user data with token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user), // Pass the whole user object
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : null
    });
  }
};

// Enhanced login with role verification
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Successful login
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : null
    });
  }
};

// Get current user with more detailed info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("savedArticles", "title _id"); // Include basic article info

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      ...user.toObject(),
      isAdmin: user.role === "admin" // Convenient flag for frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : null
    });
  }
};

// Additional admin-only endpoint to check admin status
export const verifyAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("role");
    res.json({ isAdmin: user?.role === "admin" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};