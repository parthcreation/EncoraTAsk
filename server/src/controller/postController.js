const axios = require("axios");

const POSTS_API = "https://jsonplaceholder.typicode.com/posts"; // API URL for fetching posts

/**
 * @desc   Fetch all posts with pagination support.
 * @route  GET /api/posts?page={page}&limit={limit}
 * @param  {number} req.query.page - The current page number (default: 1).
 * @param  {number} req.query.limit - The number of posts per page (default: 10).
 * @returns {object} JSON response containing total posts count and paginated posts.
 */
exports.getAllPosts = async (req, res) => {
  try {
    // Extract page and limit from request query parameters with default values
    const { page = 1, limit = 10 } = req.query;

    // Fetch all posts from the external API
    const { data } = await axios.get(POSTS_API);

    // Calculate the starting index for pagination
    const start = (page - 1) * limit;

    // Slice the posts array to return only the requested page's posts
    const paginated = data.slice(start, start + parseInt(limit));

    // Send response with total number of posts and paginated posts
    res.json({ total: data.length, posts: paginated });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
