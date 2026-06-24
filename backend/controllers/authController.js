const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// helper
function validateUser(data, requireRole = false) {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    return "Please provide all required fields";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (requireRole && !role) {
    return "Role is required";
  }

  return null;
}


// REGISTER (PUBLIC)
exports.register = async (req, res) => {
  try {
    const error = validateUser(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const { name, email, password } = req.body;

    const lowerEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      role: "customer",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// CREATE ADMIN (ADMIN ONLY)
exports.createAdmin = async (req, res) => {
  try {
    const error = validateUser(req.body, true);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const { name, email, password, role } = req.body;
    const lowerEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!["admin", "customer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const lowerEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};