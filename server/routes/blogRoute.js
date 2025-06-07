import express from 'express';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import { addBlog, addComment, deletBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deletBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comments", auth, addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
