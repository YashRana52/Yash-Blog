import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import toast from 'react-hot-toast';

function CommentTableItem({ comment, fetchComments }) {

    const { blog, createdAt, _id, name, content, isApproved } = comment;

    const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const { axios } = useAppContext()
    const approvedComents = async () => {
        try {
            const { data } = await axios.post('api/admin/approve-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }
    const deleteComment = async () => {

        try {
            const confirm = window.confirm('Are you sure want to delte this comment')
            if (!confirm) return;


            const { data } = await axios.post('api/admin/delete-comment', { id: _id })
            if (data.success) {
                toast.success(data.success)
                fetchComments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
            {/* Blog title + comment */}
            <td className="px-6 py-5 text-sm text-gray-700">
                <div className="mb-2">
                    <span className="font-semibold text-gray-500">Blog:</span> {blog.title}
                </div>
                <div className="mb-1">
                    <span className="font-semibold text-gray-500">Name:</span> {name}
                </div>
                <div>
                    <span className="font-semibold text-gray-500">Comment:</span> {content}
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-5 text-sm text-gray-600 max-sm:hidden whitespace-nowrap">
                {formattedDate}
            </td>

            {/* Action Buttons */}
            <td className="px-6 py-5 max-sm:text-right">
                <div className="flex items-center gap-4">
                    {!isApproved ? (
                        <img onClick={approvedComents}
                            src={assets.tick_icon}
                            className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                            title="Approve"
                        />
                    ) : (
                        <span className="text-xs border border-green-600 bg-green-100 text-green-700 font-medium rounded-full px-3 py-1">
                            Approved
                        </span>
                    )}
                    <img onClick={deleteComment}
                        src={assets.bin_icon}
                        alt="Delete"
                        className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                        title="Delete"
                    />
                </div>
            </td>
        </tr>
    );
}

export default CommentTableItem;
