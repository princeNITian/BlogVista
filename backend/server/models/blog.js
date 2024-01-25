// server/models/blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  summary: { type: String, default: "" },
  publicationDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
