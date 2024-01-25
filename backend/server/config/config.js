// server/config/config.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "yourDefaultSecretKey",
};
