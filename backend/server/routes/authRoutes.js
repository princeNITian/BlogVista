// server/routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Step 1: Forgot Password Request
router.post("/forgot-password", authController.forgotPassword);

// Step 2: Verify Token
router.get("/reset-password/:token", authController.verifyToken);

// Step 3: Update Password
router.post("/reset-password", authController.resetPassword);

router.get("/verify", authController.verifyAccount);

module.exports = router;
