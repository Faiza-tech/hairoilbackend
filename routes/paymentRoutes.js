const express = require("express");

const router = express.Router();

const { createCheckoutSession } =
  require("../controllers/paymentController");

const { stripeWebhook, } =
  require("../controllers/stripeWebhookController");

// NORMAL JSON ROUTES
router.post("/create-checkout-session", createCheckoutSession);

// WEBHOOK ROUTE , IMPORTANT: webhook MUST use raw body
router.post("/webhook", express.raw({ type: "application/json", }), stripeWebhook);




module.exports = router;