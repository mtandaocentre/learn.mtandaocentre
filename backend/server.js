import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// Temporarily disable analytics until DB connection is stable
// import trackAnalytics from "./middlewares/analytics.js";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(trackAnalytics);  // Disabled until DB connection is stable
app.use(express.json());

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Enhanced MongoDB connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // 30 seconds timeout
      socketTimeoutMS: 45000            // 45 seconds socket timeout
    });
    console.log("✅ Connected to MongoDB");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("Troubleshooting steps:");
    console.log("1. Make sure your IP is whitelisted in MongoDB Atlas");
    console.log("2. Verify your database user credentials");
    console.log("3. Check your internet connection");
    console.log("4. Ensure the MONGODB_URI in .env is correct");
    return false;
  }
};

// Start server only after DB connection attempt
const startServer = async () => {
  const dbConnected = await connectDB();
  
  if (!dbConnected) {
    console.log("⚠️ Starting server in limited mode without database");
  }

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });

    socket.on("chatMessage", ({ room, message, user }) => {
      if (room.startsWith("admin-") && user.role !== "admin") {
        socket.emit("error", "Admin privileges required");
        return;
      }
      
      io.to(room).emit("message", {
        user,
        text: message,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

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
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Access at: http://localhost:${PORT}`);
  });
};

// Start the application
startServer();

export { app, io };