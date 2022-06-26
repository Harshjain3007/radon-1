const express = require('express');

const router = express.Router();
const authorcontroller = require("../Controllers/authorcontroller")
const blogcontroller = require("../Controllers/blogcontroller")
const middleware = require("../Middlewares/middleware")










router.post("/authors", authorcontroller.createAuthor)
router.post("/login",authorcontroller.authorlogin)
router.post("/blogs",middleware.validateToken,blogcontroller.createBlog)
router.get("/blogs",middleware.validateToken,blogcontroller.getblogs)
router.put("/blogs/:blog_id",middleware.validateToken, middleware.authorization,blogcontroller.putblogs)
router.delete("/blogs/:blog_id",middleware.validateToken,middleware.authorization, blogcontroller.deletedblog)
router.delete("/blogs",middleware.validateToken,blogcontroller.deletedquerryblog)















module.exports = router;