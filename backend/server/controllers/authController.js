// server/controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Step 2: Generate and Send Reset Token
  const user = await User.findOne({ username: email });
  console.log(user);

  if (user) {
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    // Step 3: Send Reset Token to User's Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, // replace with your email
        pass: process.env.EMAIL_PASS, // replace with your email password
      },
    });

    const mailOptions = {
      from: `BlogVista <${process.env.EMAIL}>`, // replace with your email
      to: user.username,
      subject: "Password Reset Request",
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }

          .card {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            background-color: beige;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #007BFF;
          }

          p {
            color: #555;
          }

          a {
            color: #17a2b8;
            text-decoration: none;
            text-align: center;
          }

          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Password Reset Request</h1>
          <p>
            To reset your password, verify your email by clicking the link within 5 minutes.
          </p>
          <a href="https://blog-vista-api.vercel.app/auth/reset-password/${resetToken}">Verify Email</a>
        </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ message: "Reset Link sent to your email." });
      }
    });
  } else {
    res.status(404).json({ message: "User not found." });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.params;
  console.log({ token });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decoded });

    // Step 5: Reset Password Form
    // res.json({ userId: decoded.userId, message: "Token is valid" });
    res.redirect(`https://blog-vista-rho.vercel.app/reset-password/${token}`);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Validate newPassword and update the user's password in the database
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decodedToken });
    req.userId = decodedToken.userId;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }

  // Example:
  const user = await User.findById(req.userId);
  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password reset successful" });
};
