const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  getUserById,
  getAllUsers,
  updateMyProfile,
  deleteUser
} = require("../controllers/userController");

const { fetchUser, adminOnly } = require("../middleware/auth");


// MY PROFILE
router.get("/me", fetchUser, getMyProfile);
router.put("/me", fetchUser, updateMyProfile);


// ADMIN ROUTES
router.get("/", fetchUser, adminOnly, getAllUsers);
router.get("/:id", fetchUser, adminOnly, getUserById);
router.delete("/:id", fetchUser, adminOnly, deleteUser);


module.exports = router;