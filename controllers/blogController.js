import asyncHandler from "express-async-handler";
import Blog from "../model/blogModel.js";
import CustomErrors from "../errors/CustomErrors.js";

/*
 * Get All blogs Controller function ****
 */
export const getAllBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find();
    if (!blogs) {
        next(CustomErrors.NotFoundError());
    } else {
        res.status(200).json(blogs);
    }
});

/*
 * Create a new blog Controller function ****
 */
export const createBlog = asyncHandler(async (req, res, next) => {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
        next(CustomErrors.validationError());
    }
    const blog = new Blog({
        title,
        description,
        image,
        user: req.user.id,
    });
    if (blog) {
        const newblog = await blog.save();
        res.status(201).json({
            Success: true,
            message: "Blog created successfully...",
            newblog,
        });
    } else {
        next(CustomErrors.SomethingWentWrong("blog creation failed"));
    }
});

/*
 * Delete Blog Controller function ****
 */
export const deleteBlog = asyncHandler(async (req, res, next) => {
    const filterBlog = await Blog.findById(req.params.id);
    if (filterBlog.user._id.toString() !== req.user._id.toString()) {
        next(CustomErrors.AuthorizationError("Deletion Access denied..."));
    }
    if (filterBlog) {
        await filterBlog.remove();
        res.status(200).json({
            message: "blog deleted successfully",
        });
    } else {
        next(CustomErrors.NotFoundError());
    }
});

/*
 * Filter Blog Controller function ****
 */
export const findBlogById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (blog) {
        res.status(200).json(blog);
    } else {
        next(CustomErrors.NotFoundError("Blog not found..."));
    }
});

/*
 * Update Blog Controller function ****
 */
export const updateBlog = asyncHandler(async (req, res, next) => {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (blog.user.toString() !== req.user._id.toString()) {
        next(CustomErrors.AuthorizationError());
    }
    if (blog) {
        blog.title = title;
        blog.description = description;
        blog.image = image;
        const updatedblog = await blog.save();
        res.status(200).json({
            message: "Blog updated successfully...",
            updatedblog,
        });
    } else {
        next(CustomErrors.NotFoundError("Blog Not Found"));
    }
});
