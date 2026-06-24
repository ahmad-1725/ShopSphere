const bcrypt = require("bcryptjs");
const User = require("../models/User");


// ✅ GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ GET USER BY ID (ADMIN)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ GET ALL USERS (ADMIN)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ UPDATE MY PROFILE
exports.updateMyProfile = async (req, res) => {
  try {
    const updateData = {};

    // uName
    if (req.body.uName) {
      updateData.uName = req.body.uName.trim();
    }

    // email
    if (req.body.email) {
      const email = req.body.email.trim().toLowerCase();

      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }

      updateData.email = email;
    }

    // password
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }

      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ DELETE USER (ADMIN)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};