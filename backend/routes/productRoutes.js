const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReviews,
  getReviews,
} = require("../controllers/productController");

const { fetchUser, adminOnly } = require("../middleware/auth");

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN
router.post("/", fetchUser, adminOnly, createProduct);
router.put("/:id", fetchUser, adminOnly, updateProduct);
router.delete("/:id", fetchUser, adminOnly, deleteProduct);

// REVIEWS
router.post("/:id/reviews", fetchUser, addReviews);
router.get("/:id/reviews", getReviews);

module.exports = router;
