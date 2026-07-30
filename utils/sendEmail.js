


const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();
  console.log("✅ SMTP connection successful");

  const info = await transporter.sendMail({
    from: "My Herbal Shop <myherbalshop6@gmail.com>",
    to,
    subject,
    html,
  });

  console.log("Message ID:", info.messageId);
};

module.exports = sendEmail;