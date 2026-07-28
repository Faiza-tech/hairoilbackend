# 🛒 Hair Oil Ecommerce Backend (Node.js + Express)

A secure, scalable REST API powering the Hair Oil Ecommerce application.
This backend handles authentication, product management, orders, payments, image uploads, email notifications, and admin features.

---

## 🚀 Live API

👉 (SOON deployed backend API link here)

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Admin Authorization
* User Profile API

---

### 📦 Product Management

* Product CRUD
* Admin Product Management
* Product Search
* Category Management
* Inventory Tracking
* Cloudinary Image Upload

---

### 🛍️ Orders

* Create Orders
* My Orders
* Order Details
* Admin Order Management
* Update Order Status
* Cancel Orders
* Paid / Unpaid Tracking
* Delivered / Pending Tracking

---

### 💳 Payments

* Stripe Checkout Integration
* Stripe Webhook Verification
* Automatic Payment Status Updates
* Secure Payment Processing

---

### 📧 Email

* Order Confirmation Email
* Nodemailer Integration

---

### 👨‍💼 Admin Dashboard

* Manage Products
* Manage Orders
* Manage Users
* Analytics Ready
* Inventory Tracking

---

### 🔒 Security

* JWT Authentication
* Password Hashing (bcrypt)
* Protected Admin Routes
* Secure Environment Variables
* Stripe Webhook Signature Verification

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Stripe
* Cloudinary
* Multer
* Nodemailer
* dotenv
* CORS

---

## 📦 Dependencies Used

```bash
express
mongoose
cors
dotenv

jsonwebtoken
bcryptjs

stripe

cloudinary
multer
multer-storage-cloudinary

nodemailer

cookie-parser

express-async-handler
```

---

## 📁 Folder Structure

```text
Backend/
│
├── config/
│   ├── db.js
│   ├── cloudinary.js
│   └── stripe.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── uploadController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── uploadRoutes.js
│   ├── userRoutes.js
│   └── webhookRoutes.js
│
├── utils/
│   ├── generateToken.js
│   └── sendEmail.js
│
├── public/
│
├── server.js
│
├── package.json
│
└── .env
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

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

## 🚀 Getting Started

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

or

```bash
node server.js
```

Backend runs on

```text
http://localhost:5000
```

---

## 📡 API Routes

### Authentication

```http
POST    /api/auth/register

POST    /api/auth/login

GET     /api/auth/profile
```

---

### Products

```http
GET     /api/products

GET     /api/products/:id

POST    /api/products

PUT     /api/products/:id

DELETE  /api/products/:id
```

---

### Orders

```http
POST    /api/orders

GET     /api/orders/my

GET     /api/orders/:id

GET     /api/orders

PUT     /api/orders/:id/status
```

---

### Upload

```http
POST /api/upload
```

---

### Stripe

```http
POST /api/create-checkout-session

POST /api/webhook
```

---

### Users

```http
GET /api/users

PUT /api/users/:id
```

---

## 💳 Payment Flow

```text
User Checkout
      │
      ▼
Create Order
      │
      ▼
Stripe Checkout
      │
      ▼
Successful Payment
      │
      ▼
Stripe Webhook
      │
      ▼
Verify Signature
      │
      ▼
Update Order Status
      │
      ▼
Send Confirmation Email
```

---

## 📧 Email Flow

```text
Order Created
      │
      ▼
Payment Success
      │
      ▼
Webhook Triggered
      │
      ▼
Order Updated
      │
      ▼
Confirmation Email Sent
```

---

## 🔒 Authentication Flow

```text
Register
      │
      ▼
Password Hashing
      │
      ▼
JWT Generated
      │
      ▼
Protected Routes
      │
      ▼
Admin Authorization
```

---

## 📸 Screenshots

(Add screenshots here)

- MongoDB Collections
- Stripe Dashboard
- Cloudinary Upload
- Postman API Testing
- Order Confirmation Email

---

## 🧠 What I Learned

* Building scalable REST APIs
* JWT Authentication & Authorization
* Password Hashing using bcrypt
* MongoDB Data Modeling
* Stripe Payment Integration
* Stripe Webhook Verification
* Cloudinary Image Upload
* Sending Emails using Nodemailer
* Middleware & Error Handling
* Secure Environment Variable Management
* Building a complete Ecommerce Backend

---

## 🚀 Deployment

Can be deployed on:

* Render
* Railway
* Cyclic
* AWS
* DigitalOcean
* VPS

Required Services

* MongoDB Atlas
* Cloudinary
* Stripe
* Gmail App Password (SMTP)

---

## 📌 Future Improvements

* Refresh Token Authentication
* Wishlist API
* Product Reviews
* Coupons & Discounts
* Invoice PDF Generation
* Redis Caching
* Docker Support
* Unit Testing
* CI/CD Pipeline
* API Rate Limiting

---

## 🙌 Author

**Faiza**

Full Stack Developer | MERN Stack | React | Node.js | Express | MongoDB | Stripe | Cloudinary