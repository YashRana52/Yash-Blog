import { comments_data } from '@/assets/assets';
import CommentTableItem from '@/components/admin/CommentTableItem';
import { useAppContext } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Comments() {
    const [comments, setComments] = useState([]);
    const [filters, setFilter] = useState('Not Approved');
    const { axios } = useAppContext()

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('api/admin/comments')
            data.success ? setComments(data.comments) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="flex-1 pt-6 sm:pt-12 sm:pl-16 bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen px-4 sm:px-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-5xl mx-auto mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Comments</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setFilter('Approved')}
                        className={`shadow-sm border rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${filters === 'Approved'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => setFilter('Not Approved')}
                        className={`shadow-sm border rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${filters === 'Not Approved'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        Not Approved
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="relative max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-sm text-gray-700">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-600 border-b sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">Blog Title & Comment</th>
                            <th scope="col" className="px-6 py-3 text-left max-sm:hidden">Date</th>
                            <th scope="col" className="px-6 py-3 text-left max-sm:hidden">Action</th>
                        </tr>
                    </thead>
                </table>

                {/* Scrollable tbody container */}
                <div className="overflow-y-auto max-h-[450px]">
                    <table className="w-full text-sm text-gray-700">
                        <tbody>
                            {comments
                                .filter((comment) =>
                                    filters === 'Approved' ? comment.isApproved === true : comment.isApproved === false
                                )
                                .map((comment, index) => (
                                    <CommentTableItem
                                        key={comment._id}
                                        comment={comment}
                                        index={index + 1}
                                        fetchComments={fetchComments}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Comments;
