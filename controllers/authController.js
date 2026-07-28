const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto"); // for forgot password
const sendEmail = require("../utils/sendEmail");// for forgot password


// GENERATE JWT TOKEN
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h",  //30d , 7d
    }
  );
};


// REGISTER USER
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log(error);
    console.log(error.response);

    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:
        error.response?.data?.message ||
        "Registration failed",
    });
  }
  
};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("EMAIL:", email);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);

    if (user && (await bcrypt.compare(password, user.password))) {

      console.log("PASSWORD MATCH");

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });

    } else {

      console.log("LOGIN FAILED");

      res.status(401).json({
        message: "Invalid email or password",
      });

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// Redirect 
const getUserProfile = async (req, res) => {

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });

};


// forgot password
const forgotPassword = async (req, res) => {

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {

    return res.status(404).json({
      message: "No account found with this email"
    });

  }

  //Backend creates reset token ,Your controller does:
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Then stores a hashed version in MongoDB:
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //And expires it after 15 minutes:
  user.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetUrl =
    `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendEmail({

    to: user.email,

    subject: "Password Reset",

    html: `
            <h2>Password Reset</h2>

            <p>You requested a password reset.</p>

            <a href="${resetUrl}">
                Click here to reset password
            </a>

            <p>This link expires in 15 minutes.</p>
        `

  });

  res.json({
    message:
      "Password reset email sent"
  });

};



// RESET PASSWORD
const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;
    const { password } = req.body;

    // Check token exists
    if (!token) {
      return res.status(400).json({
        message: "Reset token is missing",
      });
    }

    // Check password exists
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Hash the token received from frontend
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({

      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },

    });

    // Invalid / expired token
    if (!user) {

      return res.status(400).json({
        message: "Reset link is invalid or expired",
      });

    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Save new password
    user.password = hashedPassword;

    // Remove reset token
    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({

      message: "Password updated successfully",

    });

  } catch (error) {

    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    return res.status(500).json({

      message: "Unable to reset password",

    });

  }

};






module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
};