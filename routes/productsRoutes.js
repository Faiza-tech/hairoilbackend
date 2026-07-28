const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  deleteReview,
  updateReview
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


// GET products
router.get("/", getProducts);


// GET single product
router.get("/:id", getProductById);




// CREATE PRODUCT (ADMIN ONLY)
router.post("/", protect, admin, createProduct);

// DELETE product
router.delete("/:id", protect, admin, deleteProduct);

// UPDATE product
router.put("/:id", protect, admin, updateProduct);

// Review Create
router.post("/:id/reviews", protect, createProductReview);


// DELETE REVIEW
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

// UPDATE REVIEW
router.put("/:id/reviews/:reviewId", protect, updateReview);




module.exports = router;


