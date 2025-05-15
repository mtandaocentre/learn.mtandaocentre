const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "Student",
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }

  exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }

    exports.getMe = async (req, res) => {
      try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "=Server Error" });
      }
    };
  };
};
