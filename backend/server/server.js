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
app.use(
  cors({
    origin: ["http://localhost:3000","https://blogvista.vercel.app"]
  })
);
// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req,res) => {
  res.send("<h1>BlogVista API Working..</h1>")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
