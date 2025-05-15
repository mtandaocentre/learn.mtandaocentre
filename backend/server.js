require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createServer } = require("http");
const { server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(express.json());

//socket.io set up
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENTURL || "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

//Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoBD connection error:", err));

//Routes will be added here

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
