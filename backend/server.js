require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const { timeStamp } = require("console");

const app = express();
const httpServer = createServer(app);

//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//socket.io set up
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoBD connection error:", err));

//Routes will be added here

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("JoinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on("chatMessage", ({ room, message, user }) => {
    io.to(room).emit("message", {
      user,
      text: message,
      timestamp: new Data(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client is disconnectec");
  });
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

//server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
