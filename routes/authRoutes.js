const express = require("express");

const router = express.Router();

const { protect, } = require("../middleware/authMiddleware")

const {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");





// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);

// PROFILE
//redirect route
router.get("/profile", protect, getUserProfile);


// Forgot password
router.post("/forgot-password", forgotPassword);


// Reset password
router.put("/reset-password/:token", resetPassword);




module.exports = router;