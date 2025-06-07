import { assets } from '@/assets/assets'
import Sidebar from '@/components/admin/Sidebar'
import { useAppContext } from '@/context/AppContext'
import React from 'react'
import { Outlet, } from 'react-router-dom'

function Layout() {

    const { axios, setToken, navigate } = useAppContext()
    const logout = () => {

        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)


        navigate('/')

    }
    return (
        <>
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <img src={assets.logo1} alt="" className='w-40 sm:w-60 cursor-pointer' onClick={() => navigate('/')} />
                <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
            </div>
            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />


            </div>



        </>
    )
}

export default Layout