import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // Store token in localStorage, state and set axios default header
    const storeToken = (newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            setToken(newToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        } else {
            localStorage.removeItem("token");
            setToken(null);
            delete axios.defaults.headers.common["Authorization"];
        }
    };


    useEffect(() => {
        const localToken = localStorage.getItem("token");

        if (localToken) {
            storeToken(localToken);
        }
        fetchBlogs();
    }, []);

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(`/api/blog/all`);
            if (data.success) setBlogs(data.blogs);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        axios,
        navigate,
        token,
        setToken: storeToken,
        blogs,
        setBlogs,
        input,
        setInput,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
