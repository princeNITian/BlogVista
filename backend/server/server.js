// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());
// Custom CORS configuration with additional headers
const corsOptions = {
  origin: ["http://localhost:3000", "https://blog-vista-rho.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Set the preflight response status to 204
  allowedHeaders: "Content-Type, Authorization", // Define the allowed headers
};

app.use(cors(corsOptions));

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("<h1>BlogVista API Working..</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
