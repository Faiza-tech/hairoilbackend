const Order = require("../models/orderModel");
const Product = require("../models/productModel")
const validateOrder = require("../validations/orderValidation");

const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");



const createOrder = async (req, res) => {
  try {

    console.log("========== ORDER BODY ==========");
    console.log(JSON.stringify(req.body, null, 2));

    console.log("========== SHIPPING ==========");
    console.log(req.body.shippingAddress);

    // VALIDATION
    const validationError = validateOrder(req.body);

    if (validationError) {
      console.log("VALIDATION ERROR:", validationError);

      return res.status(400).json({
        message: validationError,
      });
    }

    const order = new Order({


      user: req.user._id,

      orderItems: req.body.orderItems,


      shippingAddress: {
        fullName: req.body.shippingAddress.fullName.trim(),

        phone: req.body.shippingAddress.phone.trim(),

        addressLine1:
          req.body.shippingAddress.addressLine1.trim(),

        addressLine2:
          req.body.shippingAddress.addressLine2?.trim() || "",

        city:
          req.body.shippingAddress.city.trim(),

        state:
          req.body.shippingAddress.state.trim(),

        postalCode:
          req.body.shippingAddress.postalCode.trim(),

        country:
          req.body.shippingAddress.country.trim(),
      },

      totalPrice: req.body.totalPrice,

      isPaid: false,


    });
    console.log("ORDER SAVED:");
   // console.log("stripeSessionId:", req.body.stripeSessionId);
    //console.log("paymentIntentId:", req.body.paymentIntentId);


    // for stock
    for (const item of req.body.orderItems) {

      const product = await Product.findById(item.product);

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.title} is out of stock`,
        });
      }

      product.stock -= item.qty;
      product.totalSold += item.qty;

      await product.save();
    }

    const createdOrder = await order.save();

    console.log(
      "NEW ORDER PAID STATUS:",
      createdOrder.isPaid
    );

     /*console.log("EMAIL SENT");*/

    console.log("ORDER ACTUALLY SAVED TO DB");
   console.log("ID:", createdOrder._id);
    console.log( "SESSION:", createdOrder.stripeSessionId);

    res.status(201).json(createdOrder);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET USER ORDERS
const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

  try {

    //console.log(req.body);

    const order = await Order.findById(
      req.params.id
    );


    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE ORDER
const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};