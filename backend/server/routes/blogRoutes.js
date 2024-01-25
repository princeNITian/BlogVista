// server/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");

// Add a new blog
router.post("/add", authMiddleware, blogController.addBlog);

// Edit a blog by ID
router.put("/edit/:id", authMiddleware, blogController.editBlog);

// Delete a blog by ID
router.delete("/delete/:id", authMiddleware, blogController.deleteBlog);

// Filter blogs by tag
router.get("/filter", authMiddleware, blogController.filterBlogs);

// Get a blog by :id
router.get("/:id", authMiddleware, blogController.getBlogById);

// Get a list of blogs
router.get("/", authMiddleware, blogController.getBlogList);

module.exports = router;
