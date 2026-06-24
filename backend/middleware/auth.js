const jwt = require("jsonwebtoken");
const User = require("../models/User");

// AUTH MIDDLEWARE
const fetchUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer "eyJhbGciOiJIUzI1NiIs..."

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ VERY IMPORTANT

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ADMIN MIDDLEWARE
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = {
  fetchUser,
  adminOnly,
};