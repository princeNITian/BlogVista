// server/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
