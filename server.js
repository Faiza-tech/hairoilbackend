require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv");

const helmet = require("helmet");

const productRoutes = require("./routes/productsRoutes");

const authRoutes = require("./routes/authRoutes"); //Connect Routes In server.js

const uploadRoutes = require("./routes/uploadRoutes"); // for images

const orderRoutes = require("./routes/orderRoutes"); // for checkout

const adminRoutes = require("./routes/adminRoutes"); // for admin stats

const paymentRoutes = require("./routes/paymentRoutes"); // for payment

const contactRoutes = require("./routes/contactRoutes"); //for contact form

const testEmailRoutes =
  require("./routes/testEmailRoutes");//test email

const connectDB = require("./config/db");


//dotenv.config(); 

// connect database
connectDB(); 


const app = express();

app.use(helmet()); //security improvement.

app.use(cors());

app.use("/api/payment/webhook", express.raw({ type: "application/json" }), paymentRoutes);

app.use(express.json());

// routes
app.use("/api/products", productRoutes); // for product

app.use("/api/auth", authRoutes); // for login

app.use("/api/upload", uploadRoutes); // for images upload

app.use("/api/orders", orderRoutes); // for order

app.use("/api/admin", adminRoutes); // admin stats

app.use("/api/payment", paymentRoutes); // for payment

app.use("/api/test-email", testEmailRoutes);// test email

app.use("/api/contact", contactRoutes);// contact form


// static images
app.use("/images", express.static("public/images"));
app.use(express.static("public"));

app.get("/", (req, res) => { res.send("API Running..."); });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});