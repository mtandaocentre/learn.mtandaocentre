const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, resizeBy, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res
      .status(401)
      .json({ msaage: "Sorry you do not have an authorization token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    req.user = await User.findById(decoded.id).select("password");
    next();
  } catch (err) {
    console.error(err);
    res
      .status(401)
      .json({ massage: "Sorry your authentication token did not pass!" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: " Sorry you are not recognized as admin!" });
  }
};

module.exports = { protect, admin };
