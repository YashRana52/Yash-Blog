import { blog_data, blogCategories } from '@/assets/assets';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { useAppContext } from '@/context/AppContext';

function BlogList() {
    const [menu, setMenu] = useState("All");
    const { blogs, input } = useAppContext()

    const filteredBlogs = () => {
        if (input === '') {
            return blogs;
        }
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.category.toLowerCase().includes(input.toLowerCase())
        );
    };


    return (
        <div>
            {/* Category Tabs */}
            <div className="flex justify-center flex-wrap gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map((item) => (
                    <div key={item}>
                        {menu === item ? (
                            <motion.button
                                layoutId="activeButton"
                                onClick={() => setMenu(item)}
                                className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white shadow-md"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                                {item}
                            </motion.button>
                        ) : (
                            <button
                                onClick={() => setMenu(item)}
                                className="px-4 py-2 rounded-md font-medium bg-gray-200 text-black hover:bg-gray-300 transition"
                            >
                                {item}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-6 sm:mx-10 xl:mx-40">
                {filteredBlogs()
                    .filter((blog) => menu === "All" || blog.category === menu)
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>
        </div>
    );
}

export default BlogList;
