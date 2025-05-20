import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Fixed typo: startWith -> startsWith
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token required!" });
  }

  try {
    // Fixed typo: JWT_Secret -> JWT_SECRET (standard naming convention)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fixed: select("-password") instead of select("password")
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid authentication token!" });
  }
};

const admin = (req, res, next) => {
  // Use strict equality check
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin privileges required!" });
  }
};

export { protect, admin };
