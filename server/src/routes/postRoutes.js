const router = require("express").Router();
// const { getAllPosts } = require("../controller/postController.js");
const {getAllPosts} = require("../controller/postController.js");


router.get("/", getAllPosts);

module.exports = router;
