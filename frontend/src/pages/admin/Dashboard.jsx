import { assets } from '@/assets/assets';
import BlogTableItem from '@/components/admin/BlogTableItem';
import { useAppContext } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [],
    });

    const { axios } = useAppContext();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard');


            if (data.success && data.dashboardData) {
                const { blogs = 0, comments = 0, drafts = 0, recentBlogs = [] } = data.dashboardData;


                setDashboardData({
                    blogs,
                    comments,
                    drafts,
                    recentBlogs: Array.isArray(recentBlogs) ? recentBlogs : [],
                });
            } else {
                toast.error(data.message || "Failed to load dashboard data");
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const stats = dashboardData ? [
        {
            label: 'Blogs',
            icon: assets.dashboard_icon_1,
            value: dashboardData.blogs,
        },
        {
            label: 'Comments',
            icon: assets.dashboard_icon_2,
            value: dashboardData.comments,
        },
        {
            label: 'Drafts',
            icon: assets.dashboard_icon_3,
            value: dashboardData.drafts,
        },
    ] : [];

    return (
        <div className="flex-1 p-4 sm:p-8 bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen">
            {/* Page Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📊 Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <img src={item.icon} alt={item.label} className="w-12 h-12" />
                        <div>
                            <p className="text-3xl font-extrabold text-gray-700">{item.value}</p>
                            <p className="text-base text-gray-500">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest Blogs Heading */}
            <div className="flex items-center gap-3 mb-4 mt-8 text-gray-700 font-semibold text-lg">
                <img src={assets.dashboard_icon_4} alt="Recent Blogs" className="w-6 h-6" />
                <p>Latest Blogs</p>
            </div>

            {/* Blog Table */}
            <div className="relative max-w-5xl overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs text-gray-600 uppercase border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-3 py-4 text-left">#</th>
                            <th scope="col" className="px-3 py-4 text-left">Blog Title</th>
                            <th scope="col" className="px-3 py-4 text-left max-sm:hidden">Date</th>
                            <th scope="col" className="px-3 py-4 text-left max-sm:hidden">Status</th>
                            <th scope="col" className="px-3 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(dashboardData.recentBlogs) && dashboardData.recentBlogs.map((blog, index) => (
                            <BlogTableItem
                                key={blog._id || index}
                                blog={blog}
                                fetchBlogs={fetchDashboard}
                                index={index + 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
