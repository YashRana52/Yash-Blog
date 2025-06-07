import { assets } from '@/assets/assets'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='flex flex-col border-r border-gray-200 min-h-screen pt-6 bg-white shadow-md'>

            <NavLink
                end={true}
                to='/admin'
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-64 cursor-pointer rounded-r-full transition-all duration-200 hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/10 border-r-4 border-primary text-primary font-medium" : "text-gray-700"
                    }`
                }
            >
                <img src={assets.home_icon} alt="" className='w-5 min-w-5' />
                <p className='hidden md:inline-block'>Dashboard</p>
            </NavLink>

            <NavLink
                to='/admin/addBlog'
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-64 cursor-pointer rounded-r-full transition-all duration-200 hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/10 border-r-4 border-primary text-primary font-medium" : "text-gray-700"
                    }`
                }
            >
                <img src={assets.add_icon} alt="" className='w-5 min-w-5' />
                <p className='hidden md:inline-block'>AddBlog</p>
            </NavLink>

            <NavLink
                to='/admin/listBlog'
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-64 cursor-pointer rounded-r-full transition-all duration-200 hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/10 border-r-4 border-primary text-primary font-medium" : "text-gray-700"
                    }`
                }
            >
                <img src={assets.list_icon} alt="" className='w-5 min-w-5' />
                <p className='hidden md:inline-block'>Blog list</p>
            </NavLink>

            <NavLink
                to='/admin/comments'
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-64 cursor-pointer rounded-r-full transition-all duration-200 hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/10 border-r-4 border-primary text-primary font-medium" : "text-gray-700"
                    }`
                }
            >
                <img src={assets.comment_icon} alt="" className='w-5 min-w-5' />
                <p className='hidden md:inline-block'>Comments</p>
            </NavLink>

        </div>
    )
}

export default Sidebar
