import express from "express"
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  findBlogById,
  updateBlog,
} from "../controllers/blogController.js"
import { protect } from "../middleware/authHandler.js"

const blogRouter = express.Router()

/**
    @req Type GET
    public Route
    GetAllBlogs
 **/
blogRouter.get("/allblogs", getAllBlogs)

/**
    @req Type POST
    proteted Route
    Post a blog
 **/

blogRouter.post("/newblog", protect, createBlog)

/**
    @req Type GET
    public route
    delete OR find a blog
 **/

blogRouter.route("/:id").get(findBlogById).delete(protect, deleteBlog)

/**
    @req Type GET
    public route
    FIND & UPDATE a blog
 **/

blogRouter.route("/update/:id").put(protect, updateBlog)

export default blogRouter
