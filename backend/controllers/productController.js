const Product = require("../models/Product");
const APIFeatures = require("../utils/apiFeatures");

// VALIDATE (for create only)
function validateProduct(data) {
  const { name, price, description, category, stock, image } = data;

  if (
    !name ||
    !price ||
    !description ||
    !category ||
    !image ||
    stock === undefined
  ) {
    return "Please provide all required fields";
  }

  if (price <= 0) return "Invalid price";
  if (stock < 0) return "Invalid stock";

  return null;
}

// CREATE PRODUCT (ADMIN)
exports.createProduct = async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const { name, price, description, category, stock, image } = req.body;

    const product = await Product.create({
      name: name.trim(),
      price,
      description,
      category: category.trim().toLowerCase(),
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS (PUBLIC + PAGINATION)

exports.getProducts = async (req, res) => {
  try {
    const resultPerPage = 10;

    // Build base query (search + filter only)
    const baseQuery = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    // Get filtered count (IMPORTANT)
    const filteredCount = await Product.countDocuments(
      baseQuery.query.getQuery(),
    );

    // Apply sort + pagination
    baseQuery.sort().pagination(resultPerPage);

    // Optional: avoid heavy fields
    baseQuery.query = baseQuery.query.select(
      "name price image category stock rating numOfReviews",
    );
    // Execute query
    const products = await baseQuery.query;

    // Response
    res.json({
      success: true,
      filteredCount,
      resultPerPage,
      currentPage: Math.max(1, Number(req.query.page) || 1),
      totalPages: Math.ceil(filteredCount / resultPerPage),
      count: products.length,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT (ADMIN)
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name.trim();
    if (req.body.price !== undefined) {
      if (req.body.price <= 0) {
        return res.status(400).json({ message: "Invalid price" });
      }
      updateData.price = req.body.price;
    }

    if (req.body.description) updateData.description = req.body.description;

    if (req.body.category) {
      updateData.category = req.body.category.trim().toLowerCase();
    }

    if (req.body.stock !== undefined) {
      if (req.body.stock < 0) {
        return res.status(400).json({ message: "Invalid stock" });
      }
      updateData.stock = req.body.stock;
    }

    if (req.body.image) updateData.image = req.body.image;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT (ADMIN)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addReviews = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Message not found" });
    }
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() == req.user.id,
    );
    if (alreadyReviewed) {
      alreadyReviewed.rating = rating;
      alreadyReviewed.comment = comment;
    } else {
      product.reviews.push({
        user: req.user.id,
        rating,
        comment,
      });
    }

    product.numOfReviews = product.reviews.length;

    product.numOfReviews = product.reviews.length;

    product.rating =
      product.numOfReviews === 0
        ? 0
        : product.reviews.reduce((sum, item) => sum + item.rating, 0) /
          product.numOfReviews;

    await product.save();

    res.json({
      success: true,
      message: alreadyReviewed ? "Review Updated" : "Reviews Added",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "name",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
