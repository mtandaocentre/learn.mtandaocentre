import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/User.js";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    return false;
  }
};

// Start Server Logic
const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected) {
    console.log("⚠️ Starting server in limited mode without database");
  }

  // Clerk User Creation Endpoint
  app.post("/api/users/create", async (req, res) => {
    try {
      const { clerkUserId, username, email, role } = req.body;
      
      // Basic validation
      if (!clerkUserId || !username || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create user with Clerk-specific data
      const newUser = new User({
        clerkUserId,
        username,
        email,
        role: role || "student",
        enrollmentStatus: "approved", // Auto-approve Clerk users
        isEmailVerified: true, // Clerk handles email verification
        isActive: true
      });

      await newUser.save();
      
      // Format response without internal fields
      const userResponse = newUser.toObject();
      res.status(201).json({ success: true, user: userResponse });
      
    } catch (error) {
      console.error("Error creating user:", error);
      
      // Handle duplicate key errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(409).json({ 
          error: `${field} already exists` 
        });
      }
      
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Existing Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      timestamp: new Date()
    });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Access at: http://localhost:${PORT}`);
  });
};

// Start the application
startServer();

export default app;