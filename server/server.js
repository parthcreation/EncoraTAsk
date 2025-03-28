const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file
const postsRoutes = require("./src/routes/postRoutes.js");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/posts", postsRoutes); // Mount post-related routes under /api/posts

// Define server port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
