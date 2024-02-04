// server/controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // If Email is not verified re-send verification mail.
    // Find the user by username
    let user = await User.findOne({ username });

    if (user && !user.isVerified) {
      // delete the user
      await User.deleteOne({ username });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Send verification email
    const verificationLink = `https://blog-vista-api.vercel.app/auth/verify?userId=${user._id}`;
    const mailOptions = {
      from: `BlogVista <${process.env.EMAIL}>`,
      to: username,
      subject: "Email Verification",
      html: `
    <html lang="en">
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }

        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #007bff;
        }

        p {
          line-height: 1.6;
        }

        a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Welcome to BlogVista!</h1>
        <p>
          Thank you for signing up. To complete your registration, please click on the following link to verify your email:
          <br>
          <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        </p>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>BlogVista Team</p>
      </div>
    </body>
    </html>
  `,
    };

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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error sending verification email" });
      }
      res.status(200).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    });

    // res.status(201).json({ message: "User registered successfully" });
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

    if (!user.isVerified) {
      return res.status(401).json({
        message: `<p>Email verification is pending. Please check your Inbox! <strong><a href="https://blog-vista-api.vercel.app/auth/resend?userId=${user._id}">Resend Mail</a></strong></p>`,
      });
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

exports.resendMail = async (req, res) => {
  // Send verification email
  const userId = req.query.userId;
  const verificationLink = `https://blog-vista-api.vercel.app/auth/verify?userId=${userId}`;
  const mailOptions = {
    from: `BlogVista <${process.env.EMAIL}>`,
    to: username,
    subject: "Email Verification",
    html: `
    <html lang="en">
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }

        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #007bff;
        }

        p {
          line-height: 1.6;
        }

        a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Welcome to BlogVista!</h1>
        <p>
          Thank you for signing up. To complete your registration, please click on the following link to verify your email:
          <br>
          <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        </p>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>BlogVista Team</p>
      </div>
    </body>
    </html>
  `,
  };

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error sending verification email" });
    }
    res.send(
      `<p>Email resent successfully. Please check your email for verification. Redirecting to Homepage..</p><script>setTimeout(() => { window.location.href = "https://blog-vista-rho.vercel.app/"; } ,1000)</script>`
    );
  });
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

exports.verifyAccount = async (req, res) => {
  try {
    const { userId } = req.query;

    // Update user verification status
    await User.updateOne({ _id: userId }, { $set: { isVerified: true } });

    // Use client-side JavaScript to handle the delay and redirection
    res.send(
      '<p>Email verified successfully. You can login now. Redirecting...</p><script>setTimeout(() => { window.location.href = "https://blog-vista-rho.vercel.app/"; }, 1000);</script>'
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
