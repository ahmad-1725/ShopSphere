const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { fetchUser, adminOnly } = require("../middleware/auth");

// USER ROUTES
router.post("/", fetchUser, createOrder);
router.get("/my", fetchUser, getMyOrders);
router.get("/:id", fetchUser, getOrderById);

// ADMIN ROUTES
router.get("/", fetchUser, adminOnly, getAllOrders);
router.put("/:id/status", fetchUser, adminOnly, updateOrderStatus);
router.delete("/:id", fetchUser, adminOnly, deleteOrder);

module.exports = router;