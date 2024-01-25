// server/controllers/blogController.js
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");

// Add a new blog
exports.addBlog = async (req, res) => {
  try {
    const { title, content, tags, rating, summary, publicationDate } = req.body;
    const userId = req.userId; // Extracted from the authMiddleware

    // Create a new blog
    const blog = new Blog({
      title,
      content,
      tags,
      rating,
      summary,
      publicationDate,
      userId,
    });

    // Save the blog to the database
    await blog.save();

    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a blog by ID
exports.editBlog = async (req, res) => {
  try {
    const { title, content, tags, rating, summary, publicationDate } = req.body;
    const { id } = req.params;

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags, rating, summary, publicationDate },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a list of blogs
exports.getBlogList = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authMiddleware
    const blogs = await Blog.find({ userId }).sort({ timestamp: "desc" });

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Filter blogs by tag
// exports.filterBlogsByTag = async (req, res) => {
//   try {
//     const userId = req.userId; // Extracted from the authMiddleware
//     const { tag } = req.params;

//     const blogs = await Blog.find({ userId, tags: tag }).sort({
//       timestamp: "desc",
//     });

//     res.json(blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.filterBlogs = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authMiddleware
    const { tag, minRating, publicationDate } = req.query;

    // Build the filter criteria based on the provided query parameters
    const filterCriteria = { userId };

    if (tag) {
      filterCriteria.tags = tag;
    }

    // Include logic for minRating and publicationDate as needed

    // Example: If minRating is provided, add it to the filter criteria
    if (minRating) {
      filterCriteria.rating = { $gte: minRating };
    }

    // Example: If publicationDate is provided, add it to the filter criteria
    if (publicationDate) {
      filterCriteria.publicationDate = publicationDate;
    }

    const blogs = await Blog.find(filterCriteria).sort({
      timestamp: "desc",
    });

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Find a blog by id
exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Use your Blog model to find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
