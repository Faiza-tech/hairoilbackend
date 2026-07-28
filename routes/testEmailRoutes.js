const express = require("express");
const router = express.Router();

const sendEmail =
  require("../utils/sendEmail");

router.get("/", async (req, res) => {

  
  try {
    console.log("🧪 THIS IS TEST EMAIL");


    await sendEmail({
      to: "myherbalshop6@gmail.com",
      subject: "Test Email",
      html: "<h1>Email Works!</h1>",
    });

    console.log("EMAIL SENT");

    res.send("Email Sent");

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    res.status(500).send(error.message);
  }
});

module.exports = router;