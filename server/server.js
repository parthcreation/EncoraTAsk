const express = require("express");
const cors = require("cors");
require("dotenv").config();
//const postsRoutes = require("./src/routes/postRoutes.js");
const postsRoutes = require("./src/routes/postRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
