const express = require("express");
const router = express.Router();

const {
  register,
  login,
  createAdmin,
} = require("../controllers/authController");

const { fetchUser, adminOnly } = require("../middleware/auth");

// PUBLIC ROUTES
router.post("/register", register);
router.post("/login", login);

// ADMIN ROUTE
router.post("/admin", createAdmin);

module.exports = router;
