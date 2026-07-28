

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
      await sendEmail({
        to: user.email,
        subject: `Order Confirmation #${order._id}`,
        html: orderEmailTemplate(order),
      });

      console.log(
        `Confirmation email sent to ${user.email}`
      );
    }
  }

  // Tell Stripe the webhook was received successfully
  res.sendStatus(200);
};

module.exports = {
  stripeWebhook,
};



















/*
const User =
  require("../models/userModel");// for email

const sendEmail =
  require("../utils/sendEmail");// for email

const orderEmailTemplate =
  require("../utils/orderEmailTemplate");// for email



const Stripe = require("stripe");
const Order = require("../models/orderModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const stripeWebhook = async (req, res) => {

  console.log("WEBHOOK HIT");


  const sig = req.headers["stripe-signature"];

  let event;

  try {

    console.log("🔥 RAW BODY TYPE:", typeof req.body);

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("RAW BODY:", req.body);
    console.log("SIGNATURE:", req.headers["stripe-signature"]);

  } catch (err) {

    return res.status(400).send(
      `Webhook Error: ${err.message}`
    );
  }

  console.log(
    "WEBHOOK RECEIVED:",
    event.type
  );

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    //for paymnt return 
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    console.log("SESSION FROM STRIPE:", session.id);
    console.log("LOOKING FOR ORDER WITH:", session.id);

    console.log("SESSION ID:", session.id);
    console.log("SEARCHING DB FOR SESSION:", session.id);

    // This already fetches the order from MongoDB.
    const orderCheck = await Order.findOne({ stripeSessionId: session.id });
    console.log("ORDER FOUND IN DB:", orderCheck);

    /**Then update the order.

      This prevents

      duplicate updates
      duplicate emails
      duplicate stock changes (if you ever move stock logic there) *

    if (!orderCheck) {
      return res.status(200).end();
    }

    if (orderCheck.isPaid) {
      return res.status(200).end();
    }

    let updatedOrder = null;

    /*for (let i = 0; i < 10; i++) {

      updatedOrder = await Order.findOneAndUpdate(

        { stripeSessionId: session.id },
        {
          isPaid: true,
          paidAt: new Date(),

          paymentResult: {
            id: session.payment_intent,
            status: session.payment_status,
            email: session.customer_details?.email,
          }
        },
       {
         returnDocument: "after"
       }
      );

      if (updatedOrder) break;

      await new Promise(r =>
        setTimeout(r, 1000)
      );
    }*

    updatedOrder = await Order.findOneAndUpdate(

      { stripeSessionId: session.id }, //// THIS MUST MATCH WHAT YOU SAVE IN DB
      {
        isPaid: true,
        paidAt: new Date(),

        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          update_time: new Date(),
          email_address: session.customer_details?.email
        }
      },
      {
        returnDocument: "after"
      }
    );
    console.log("UPDATED ORDER RESULT:", updatedOrder);

    //email
    if (updatedOrder) {

      console.log("FOUND ORDER");

      console.log("🔥 THIS IS WEBHOOK EMAIL");

      const user = await User.findById(updatedOrder.user);

      console.log("USER:", user);

      console.log("USER EMAIL:", user?.email);

      console.log("EMAIL HTML:");
      console.log(orderEmailTemplate(updatedOrder));

      await sendEmail({

        to: user.email,

        subject: `Order Confirmation #${updatedOrder._id}`,

        html: orderEmailTemplate(updatedOrder),

      });

      console.log(
        "EMAIL SENT"
      );
    }


    console.log("ORDER UPDATED:", updatedOrder?._id);
  }

  res.json({ received: true });
};

module.exports = {
  stripeWebhook,
};
*/



/**
 * *** Final Recommendation
  
  const session = event.data.object;

const paymentIntent =
  await stripe.paymentIntents.retrieve(
    session.payment_intent
  );

const order = await Order.findOne({
  stripeSessionId: session.id,
});

if (!order) {
  return res.status(200).end();
}

if (order.isPaid) {
  return res.status(200).end();
}

order.isPaid = true;
order.paidAt = new Date();

order.paymentResult = {
  id: paymentIntent.id,
  status: paymentIntent.status,
  update_time: new Date(),
  email_address: session.customer_details?.email,
};

await order.save();

const updatedOrder = order;

// send email
const user = await User.findById(updatedOrder.user);

await sendEmail({
  to: user.email,
  subject: `Order Confirmation #${updatedOrder._id}`,
  html: orderEmailTemplate(updatedOrder),
});

console.log("EMAIL SENT");
 */

/**   
  **** Your flow becomes  ****


Stripe webhook

↓

Find order once

↓

Already paid?
      ↓
    yes → return

↓

Update fields

↓

save()

↓

Send email

↓

Done
 */