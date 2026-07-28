
const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    getAllProductsAdmin,
    getUsers,
    deleteUser,
    toggleAdminRole,
} = require("../controllers/adminController");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");


// ADMIN DASHBOARD STATS
router.get(
    "/dashboard",
    protect,
    admin,
    getDashboardStats,
);

// ADMIN PRODUCTS
router.get(
    "/products",
    protect,
    admin,
    getAllProductsAdmin,
);


// ADMIN USERS
router.get(
    "/users",
    protect,
    admin,
    getUsers
);

//Admin Users Delete
router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);


// Admin Users Toggle
router.put(
    "/users/:id/role",
    protect,
    admin,
    toggleAdminRole
)

module.exports = router;

