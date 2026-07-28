const Order = require("../models/orderModel");
const Stripe = require("stripe");

const CLIENT_URL = process.env.CLIENT_URL;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {

    const { orderId } = req.body;

    const order = await Order.findById(orderId); // Find Order

    if (!order) { //Does order exist?
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // NEW CHECK
    if (order.isPaid) { // Is it already paid? , then Create Stripe Session
      return res.status(400).json({
        message: "Order already paid",
      });
    }

    const line_items = order.orderItems.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));


    //Create Stripe Session
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],
      line_items,
      mode: "payment",


      success_url:
        `${CLIENT_URL}/payment-success?orderId=${order._id}`,

      cancel_url:
        `${CLIENT_URL}/checkout`,
    });

    order.stripeSessionId = session.id;

    await order.save();

    res.json({
      url: session.url,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createCheckoutSession,
};