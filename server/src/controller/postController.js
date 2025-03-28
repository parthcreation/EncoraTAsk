const axios = require("axios");
const POSTS_API = "https://jsonplaceholder.typicode.com/posts";

/**
 * @desc   Get all posts
 * @route  GET /api/posts
 */
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const title = req.query.title?.toLowerCase() || "";

    const { data } = await axios.get(
      POSTS_API
    );

    // Filter by title if title query is provided
    const filtered = title
      ? data.filter((post) => post.title.toLowerCase().includes(title))
      : data;

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = filtered.slice(start, end);

    res.json({
      total: filtered.length,
      page,
      limit,
      posts: paginated,
    });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
