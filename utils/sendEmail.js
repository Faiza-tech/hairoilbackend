const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, }) => {

/*
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();
  console.log("SMTP connection successful");*/

  const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to,

    subject,

    html,
  });

  console.log("Message ID:", info.messageId);
};

module.exports = sendEmail;