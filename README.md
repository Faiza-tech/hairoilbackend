# 🛍️ Hair Oil Ecommerce Backend

A RESTful backend API for a full-stack hair oil ecommerce application built with **Node.js**, **Express**, and **MongoDB**.

The backend provides authentication, user management, product management, orders, Stripe payments, Stripe webhooks, email notifications, Cloudinary image uploads, admin functionality, analytics, and customer messages.

---

# 🚀 Project Overview

This repository contains the backend/API for the Hair Oil Ecommerce application.

It is designed to work with a separate React + Vite frontend.

### Backend Responsibilities

* User authentication
* JWT authorization
* User registration
* User login
* Forgot Password
* Password reset
* Product CRUD
* Product image uploads
* Shopping orders
* Order management
* Stripe Checkout
* Stripe webhook processing
* Payment verification
* Order confirmation emails
* Admin dashboard APIs
* Analytics APIs
* User management
* Contact/message APIs

---

# ✨ Features

## 👤 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Admin authorization
* Token expiration
* Forgot Password
* Password Reset
* Secure password hashing with bcrypt
* Email-based password reset

---

# 🔐 Password Reset Flow

```
User clicks Forgot Password
          ↓
Enters registered email
          ↓
Backend finds user
          ↓
Generate secure reset token
          ↓
Hash token before database storage
          ↓
Set token expiration
          ↓
Send reset email
          ↓
User opens reset link
          ↓
Creates new password
          ↓
Password is hashed
          ↓
Reset token removed
          ↓
User can login
```

---

# 🛍️ Product Management

The API supports:

* Create products
* Read products
* Update products
* Delete products
* Search products
* Product filtering
* Product pagination
* Product image uploads
* Cloudinary integration

---

# 📦 Order Management

The backend supports:

* Create orders
* Get user orders
* Get all orders
* Get individual order details
* Update order status
* Cancel pending orders
* Paid order tracking
* Payment information
* Shipping address information

---

# 💳 Stripe Payment Integration

The backend integrates with Stripe for secure online payments.

Payment flow:

```
Customer Checkout
       ↓
Create Order
       ↓
Create Stripe Checkout Session
       ↓
Customer Pays
       ↓
Stripe Processes Payment
       ↓
Stripe Webhook
       ↓
Backend Verifies Event
       ↓
Order Marked Paid
       ↓
Confirmation Email
```

---

# 🔔 Stripe Webhooks

Stripe webhook events are handled by the backend.

Important event:

```
checkout.session.completed
```

The webhook:

1. Verifies the Stripe signature.
2. Finds the matching order.
3. Prevents duplicate processing.
4. Marks the order as paid.
5. Stores payment information.
6. Saves the order.
7. Sends the customer a confirmation email.

---

# 📧 Email System

The backend uses **Nodemailer** with Gmail SMTP.

Email functionality includes:

* Password reset emails
* Order confirmation emails
* Customer notifications

The email sender is configured using environment variables.

---

# ☁️ Cloudinary

Cloudinary is used for product image uploads.

The backend handles:

* Image upload
* Image storage
* Cloudinary URLs
* Product image references

---

# 👨‍💼 Admin Features

Admin-protected APIs provide functionality for:

### Dashboard

* Revenue statistics
* Total products
* Total users
* Total orders
* Inventory information
* Low-stock products
* Top-selling products
* Recent orders
* Recent users

### Products

* Create
* Update
* Delete
* Search
* Manage images

### Orders

* View orders
* Search orders
* Update order status
* Cancel pending orders
* Export order information

### Users

* View users
* Search users
* Admin authorization

### Messages

* Receive customer messages
* Manage customer messages

---

# 🛠️ Technology Stack

## Backend

* Node.js
* Express.js
* JavaScript
* MongoDB
* Mongoose

## Authentication

* JSON Web Token
* bcryptjs
* crypto

## Payments

* Stripe
* Stripe Webhooks

## Email

* Nodemailer
* Gmail SMTP

## Image Storage

* Cloudinary

## Security

* Helmet
* CORS
* Environment variables
* JWT authentication
* Password hashing
* Stripe webhook signature verification

---

# 📦 Main Dependencies

```bash
npm install express
npm install mongoose
npm install bcryptjs
npm install jsonwebtoken
npm install dotenv
npm install cors
npm install helmet
npm install nodemailer
npm install stripe
npm install cloudinary
npm install multer
```

For development:

```bash
npm install --save-dev nodemon
```

---

# 📁 Project Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── paymentController.js
│   ├── adminController.js
│   └── contactController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   └── orderModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productsRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── adminRoutes.js
│   ├── contactRoutes.js
│   └── testEmailRoutes.js
│
├── utils/
│   ├── sendEmail.js
│   └── orderEmailTemplate.js
│
├── public/
│   └── images/
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# 🔌 API Structure

The API is organized into resource-based routes.

```
/api/auth
/api/products
/api/orders
/api/admin
/api/payment
/api/upload
/api/contact
/api/test-email
```

---

# 👤 Authentication Routes

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

---

# 🛍️ Product Routes

Product routes provide functionality for:

```
GET
POST
PUT
DELETE
```

depending on the requested resource and authorization level.

---

# 📦 Order Routes

Order APIs provide:

* Create order
* User order history
* Individual order details
* Admin order management
* Order status updates

---

# 💳 Payment Routes

Stripe-related endpoints handle:

* Checkout session creation
* Payment processing
* Stripe webhook events
* Payment confirmation

The Stripe webhook must receive the **raw request body** so that Stripe signature verification works correctly.

---

# 🌐 CORS

The backend allows the frontend application to communicate with the API through CORS configuration.

Development:

```
Frontend
http://localhost:5173

Backend
http://localhost:5000
```

Production URLs should be configured through environment variables.

---

# 🔐 Environment Variables

The backend requires environment variables for sensitive configuration.

Example `.env.example`:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx

CLOUDINARY_API_KEY=xxxx

CLOUDINARY_API_SECRET=xxxx

STRIPE_SECRET_KEY=sk_test_xxxxx

STRIPE_WEBHOOK_SECRET=whsec_xxxxx

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password

CLIENT_URL=http://localhost:5173
```

---

# 🚀 Getting Started

## 1. Clone repository

```bash
git clone git@github.com:Faiza-tech/hairoilbackend.git
```

## 2. Enter the project

```bash
cd hairoilbackend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env`

Create:

```
.env
```

and add your local environment variables.

---

# ▶️ Run Development Server

If your `package.json` contains the development script:

```bash
npm run dev
```

The backend runs on:

```
http://localhost:5000
```

---

# ▶️ Run Production Server

```bash
npm start
```

The exact command depends on the scripts configured in `package.json`.

---

# 🧪 Testing

Before deployment, test:

### Authentication

* Register
* Login
* Wrong password
* Expired JWT
* Forgot Password
* Reset Password

### Products

* Product listing
* Search
* Filtering
* Admin create
* Admin edit
* Admin delete

### Orders

* Create order
* User orders
* Admin orders
* Order status updates

### Stripe

* Checkout session
* Successful payment
* Stripe webhook
* Paid order update
* Confirmation email

### Email

* Password reset email
* Order confirmation email

---

# 🔒 Security Considerations

The backend uses several security measures:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Admin authorization
* Helmet security headers
* CORS
* Environment variables
* Stripe webhook signature verification
* Secure password reset tokens
* Expiring password reset links

---

# 🔄 Full Application Architecture

```
                    CUSTOMER
                       │
                       ▼
              React + Vite Frontend
                       │
                       │ Axios / REST API
                       ▼
              Node.js + Express API
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       MongoDB      Stripe      Cloudinary
          │            │            │
          │            ▼            │
          │       Stripe Webhook     │
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                  Nodemailer
                       │
                       ▼
                  Customer Email
```

---

# 🧠 What I Learned

Through this backend project I worked with:

* Node.js
* Express
* MongoDB
* Mongoose
* REST API design
* JWT authentication
* bcrypt password hashing
* Password reset systems
* Email workflows
* Nodemailer
* Stripe Checkout
* Stripe webhooks
* Payment verification
* Cloudinary
* CRUD APIs
* Admin authorization
* Middleware
* CORS
* Helmet
* Environment variable management
* Error handling
* Database relationships
* Ecommerce order processing

---

# 📌 Future Improvements

Potential improvements include:

* Refresh token authentication
* Rate limiting
* Advanced request validation
* More detailed audit logging
* Product reviews API
* Wishlist API
* Coupon and discount API
* Inventory reservation
* Advanced analytics
* Automated testing
* API documentation with Swagger
* Production monitoring
* More advanced email templates

---

# 🔗 Related Repository

Frontend repository:

```
https://github.com/Faiza-tech/hairoilFrontend
```

---

# 👨‍💻 Author

**Faiza**


If you find this project helpful, feel free to ⭐ the repository.
