import React from 'react';
import { assets } from '../assets/assets';
import { Button } from './ui/button';

import { useAppContext } from '@/context/AppContext';

function Navbar() {

    const { navigate, token } = useAppContext()

    return (
        <div className="flex justify-between items-center py-6 px-6 sm:px-20 xl:px-32 shadow-sm bg-white">
            {/* Logo */}
            <img
                onClick={() => navigate('/')}
                src={assets.logo1}
                alt="logo"
                className="w-40 sm:w-60 cursor-pointer transition-transform duration-200 hover:scale-105"
            />

            {/* Login Button */}
            <Button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-200"
            >
                {token ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" className="w-3 h-3" />
            </Button>
        </div>
    );
}

export default Navbar;
