// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
