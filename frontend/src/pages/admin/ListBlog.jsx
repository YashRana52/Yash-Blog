import { blog_data } from '@/assets/assets';
import React, { useEffect, useState } from 'react';
import BlogTableItem from '@/components/admin/BlogTableItem';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

function ListBlog() {
    const [blogs, setBlogs] = useState([]);
    const { axios } = useAppContext()

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            if (data.success) {
                setBlogs(data.blogs)


            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='flex-1 p-4 sm:p-8 bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen'>
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📝 All Blogs</h2>

            {/* Blog Table */}
            <div className="relative max-w-5xl bg-white rounded-2xl shadow-md border border-gray-100">
                {/* Table header (fixed) */}
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs text-gray-600 uppercase border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="px-3 py-4 text-left">#</th>
                            <th className="px-3 py-4 text-left">Blog Title</th>
                            <th className="px-3 py-4 text-left max-sm:hidden">Date</th>
                            <th className="px-3 py-4 text-left max-sm:hidden">Status</th>
                            <th className="px-3 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                </table>

                {/* Scrollable table body */}
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full text-sm text-gray-700">
                        <tbody>
                            {blogs.map((blog, index) => (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListBlog;
