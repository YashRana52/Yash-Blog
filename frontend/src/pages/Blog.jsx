import { assets } from '@/assets/assets';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import { useAppContext } from '@/context/AppContext';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function Blog() {
    const { id } = useParams();
    const { axios } = useAppContext();
    const [data, setData] = useState(null);
    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            if (data.success) setData(data.blog);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComment = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id });
            if (data.success) setComment(data.comments);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) {
            toast.error("Name and Comment cannot be empty");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                '/api/blog/add-comments',
                {
                    blog: id,
                    name,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setComment((prev) => [
                    {
                        name,
                        content,
                        createdAt: new Date(),
                    },
                    ...prev,
                ]);
                setName('');
                setContent('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComment();
    }, [id]);

    return data ? (
        <div className="relative">
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute top-0 left-0 right-0 -z-10 opacity-30"
            />

            <Navbar />

            {/* Blog header */}
            <div className="text-center mt-16 text-gray-700 px-4 bg-gradient-to-tr from-blue-50 to-blue-100">
                <p className="text-primary py-4 font-medium">
                    Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold max-w-3xl mx-auto text-gray-900">
                    {data.title}
                </h1>
                <h2 className="mt-4 text-lg max-w-xl mx-auto text-gray-600">{data.subTitle}</h2>
                <p className="inline-block mt-6 mb-2 py-1 px-4 rounded-full border text-sm border-primary bg-primary/10 font-medium text-primary">
                    Yash Rana
                </p>
            </div>

            {/* Blog content */}
            <div className="mx-5 max-w-5xl md:mx-auto my-14">
                <img src={data.image} alt="" className="rounded-3xl mb-8 w-full" />

                {/* Rich text content */}
                <div
                    className="rich-text max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />

                {/* Comments section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">Comments ({comment.length})</p>
                    <div className="flex flex-col gap-6">
                        {comment.map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-primary/5 border border-primary/10 p-5 rounded-xl text-gray-700 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={assets.user_icon} alt="" className="w-7 h-7" />
                                    <p className="font-medium">{item.name}</p>
                                </div>
                                <p className="text-sm ml-9">{item.content}</p>
                                <p className="absolute right-4 bottom-3 text-xs text-gray-500">
                                    {Moment(item.createdAt).fromNow()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add comment section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <p className="font-semibold mb-4 text-lg">Add Your Comment</p>
                    <form onSubmit={addComment} className="flex flex-col gap-4 max-w-xl">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Your name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        />
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Your comment"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none h-32 resize-none focus:border-primary"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share section */}
                <div className="mt-14 max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">Share this article</p>
                    <div className="flex gap-4">
                        <img
                            src={assets.facebook_icon}
                            alt="Facebook"
                            className="w-10 h-10 cursor-pointer hover:scale-105 transition"
                        />
                        <img
                            src={assets.twitter_icon}
                            alt="Twitter"
                            className="w-10 h-10 cursor-pointer hover:scale-105 transition"
                        />
                        <img
                            src={assets.googleplus_icon}
                            alt="Google Plus"
                            className="w-10 h-10 cursor-pointer hover:scale-105 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    ) : (
        <div className="text-center py-20 text-gray-500 text-lg">
            <Loader />
        </div>
    );
}

export default Blog;
