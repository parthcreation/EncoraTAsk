const router = require("express").Router();
const { getAllPosts } = require("../controller/postController.js"); // Import the controller function

/**
 * @desc   Route to get all posts with pagination
 * @route  GET /api/posts
 * @access Public
 */
router.get("/", getAllPosts);

module.exports = router;
