import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import toast from 'react-hot-toast';

function BlogTableItem({ blog, fetchBlogs, index }) {
    const { title, createdAt } = blog;
    const blogDate = new Date(createdAt);

    const { axios } = useAppContext()

    const formattedDate = blogDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const deleteBlog = async () => {

        const confirm = window.confirm('Are you sure you want to delete this blog?')
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/blog/delete', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()

            }
            else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    const togglePublished = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()

            }
            else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)

        }


    }

    return (
        <tr className='border-b border-gray-200'>
            <th className='px-3 py-4'>{index}</th>
            <td className='px-3 py-4'>{title}</td>
            <td className='px-3 py-4 max-sm:hidden'>{formattedDate}</td>
            <td className='px-3 py-4 max-sm:hidden'>
                <p className={blog.isPublished ? "text-green-600" : "text-orange-600"}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>
            <td className='px-3 py-4 flex items-center gap-2 text-xs'>
                <button onClick={togglePublished} className='border px-3 py-1 rounded text-gray-600 hover:bg-gray-100 transition'>
                    {blog.isPublished ? 'UnPublished' : 'published'}
                </button>
                <img onClick={deleteBlog} src={assets.cross_icon} alt="Delete" className='w-5 h-5 cursor-pointer' />
            </td>
        </tr>
    );
}

export default BlogTableItem;
