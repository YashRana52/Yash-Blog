// @ts-nocheck
import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';


import Comment from '../models/Comment.js';
import main from '../configs/gemini.js'

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Missing required field"
            });
        }


        if (
            !req.user ||
            !process.env.ADMIN_EMAIL ||
            req.user.email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()
        ) {
            return res.status(403).json({
                success: false,
                message: "Your account cannot be authenticated."


            });

        }



        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: 'blog'
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublished
        });

        res.json({
            success: true,
            message: "Blog added successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// @ts-ignore
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({
            success: true,
            blogs
        });


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });

    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)

        if (!blog) {


            return res.json({
                success: false,
                message: "Blog not Found"
            });


        }
        res.json({
            success: true,
            blog
        });



    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });


    }

}

export const deletBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id)

        //delete all comment jo is blog mai ho
        await Comment.deleteMany({ blog: id })

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });



    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });


    }

}


export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id)

        // @ts-ignore
        blog.isPublished = !blog.isPublished

        // @ts-ignore
        await blog.save();
        res.json({
            success: true,
            message: 'Blog status updated successfully'
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });


    }
}


export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content })
        res.json({ success: true, message: "Comment added" });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });

    }


}

export const getBlogComments = async (req, res) => {

    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({
            createdAt: -1
        })
        res.json({
            success: true,
            comments
        });



    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });

    }



}
export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;

        const blogPrompt = `
You are a professional blog writer. Write a complete blog article on the topic: "${prompt}". 

Make sure:
- The blog is informative, engaging, and well-structured.
- Include an introduction, body, and conclusion.
- Use relevant emojis (🧠💡📈🔥✅ etc.) to make it more interesting and attractive.
- Do not start or end the content with any assistant messages.
- Keep the tone human-like and beginner-friendly.
- Use emojis only where appropriate — don't overuse them.
- Return only the blog content in plain text format.
`;

        const content = await main(blogPrompt);

        res.json({
            success: true,
            content
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
