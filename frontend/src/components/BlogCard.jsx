import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog }) {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/blog/${_id}`)}
            className="w-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-primary/40 hover:-translate-y-1 hover:scale-[1.02] transition duration-300 cursor-pointer"
        >
            <img
                src={image}
                alt={title}
                className="aspect-video w-full object-cover"
            />

            <div className="p-5">
                <span className="mb-2 inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                    {category}
                </span>

                <h5 className="mt-3 mb-2 font-semibold text-gray-900 text-base">
                    {title}
                </h5>

                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ "__html": description.slice(0, 80) }}>

                </p>
            </div>
        </div>
    );
}

export default BlogCard;
