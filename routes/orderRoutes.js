//  Cart → Checkout → POST /api/orders → DB saved → /my shows data

const express = require("express");

const router = express.Router();

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/orderController");


// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);


// USER ORDERS
router.get(
  "/my",
  protect,
  getMyOrders
);


// ADMIN ALL ORDERS
router.get(
  "/",
  protect,
  admin,
  getAllOrders
);


// ADMIN UPDATE STATUS
router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);


// GET SINGLE ORDER
router.get(
  "/:id",
  protect,
  admin,
  getOrderById
);


module.exports = router;
