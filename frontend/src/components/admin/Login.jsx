import { useAppContext } from '@/context/AppContext'
import React, { useState } from 'react'
import toast from "react-hot-toast";

function Login() {
    const { axios, setToken } = useAppContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post('/api/admin/login', { email, password })

            if (data.success) {
                setToken(data.token)
                localStorage.setItem('token', data.token)
                axios.default.headers.common['Authorization'] = data.token;


            }
            else {
                toast.error(data.message)

            }

        } catch (error) {
            toast.error(error.message)

        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 transition-all duration-300">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        <span className="text-primary">Admin</span> Login
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Enter your credentials to access the admin panel</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 shadow-md transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Footer note */}
                <div className="mt-6 text-center text-xs text-gray-400">
                    © 2025 Yash Rana. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Login
