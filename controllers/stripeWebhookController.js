

const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const Stripe = require("stripe");
const Order = require("../models/orderModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res
      .status(400)
      .send(`Webhook Error: ${err.message}`);
  }

  console.log("Webhook:", event.type);

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    // Optional: retrieve full PaymentIntent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    // Find the order
    const order = await Order.findOne({ stripeSessionId: session.id, });

    // Order doesn't exist
    if (!order) {
      return res.sendStatus(200);
    }

    // Already processed
    if (order.isPaid) {
      return res.sendStatus(200);
    }

    // Mark paid
    order.isPaid = true;
    order.paidAt = new Date();

    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date(),
      email_address:
        session.customer_details?.email,
    };

    await order.save();

    console.log(
      `Order ${order._id} marked as paid`
    );

    // Send confirmation email
    const user = await User.findById(order.user);

    if (user) {

      try {
        console.log("Sending email to:", user.email);


        await sendEmail({
          to: user.email,
          subject: `Order Confirmation #${order._id}`,
          html: orderEmailTemplate(order),
        });

        console.log("✅ Email sent successfully");
      } catch (error) {
        console.error("❌ Email failed:", error);
      }
    }

    // Tell Stripe the webhook was received successfully
    res.sendStatus(200);
  };

  module.exports = {
    stripeWebhook,
  };

