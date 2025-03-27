const axios = require("axios");
const POSTS_API = "https://jsonplaceholder.typicode.com/posts";

/**
 * @desc   Get all posts
 * @route  GET /api/posts
 */
exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + parseInt(limit));
    res.json({ total: data.length, posts: paginated });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
