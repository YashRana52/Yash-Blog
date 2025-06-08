import { assets } from '@/assets/assets';
import React, { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

function Header() {
    const { setInput, input } = useAppContext();
    const inputRef = useRef();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    };

    const onClear = () => {
        setInput('');
        inputRef.current.value = '';
    };

    return (
        <div className="relative mx-4 sm:mx-12 lg:mx-24 xl:mx-32 overflow-hidden py-10 lg:py-20 bg-gradient-to-tr from-blue-50 to-blue-100">
            {/* Background Image */}
            <img
                src={assets.gradientBackground}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover opacity-25 -z-10"
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary font-medium shadow-md hover:shadow-lg transition-all">
                    🚀 New: AI Feature Integrated
                    <img src={assets.star_icon} alt="star" className="w-4 h-4" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug tracking-tight text-center">
                    <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
                        Share Your
                    </span>
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Story with Style
                    </span>
                </h1>


                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                    Create blogs that connect, inspire, and lead change.
                </p>

                {/* Search Box */}
                <form onSubmit={onSubmitHandler} className="flex items-center max-w-xl w-full mx-auto h-12 md:h-13 shadow-md rounded-md overflow-hidden border border-gray-300">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for blogs..."
                        required
                        className="h-full w-full px-4 text-gray-700 placeholder-gray-400 outline-none"
                    />
                    <button
                        type="submit"
                        className="h-full px-6 md:px-8 text-white bg-primary hover:bg-primary/90 transition-all font-medium"
                    >
                        Search
                    </button>
                </form>

                {/* Clear Button */}
                {input && (
                    <div className="pt-2">
                        <button
                            onClick={onClear}
                            className="text-sm text-primary border border-primary px-3 py-1 rounded-full hover:bg-primary/10 transition-all"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
