import { assets, blogCategories } from '@/assets/assets'
import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { useAppContext } from '@/context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

function AddBlog() {
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(false)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [category, setCategory] = useState("startup")
    const [isPublished, setIsPublished] = useState(false)

    const generateContent = async () => {
        if (!title) return toast.error('please enter a title')
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)



            }
            else {
                toast.error(data.message)

            }



        } catch (error) {
            toast.error(error.message)

        }
        finally {
            setIsLoading(false)
        }


    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsAdding(true)

            const blog = {
                title, subTitle, description: quillRef.current.root.innerHTML,
                category, isPublished
            }
            const formData = new FormData()
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)


            const { data } = await axios.post(`/api/blog/add`, formData)
            if (data.success) {
                toast.success(data.message)
                setImage(false)
                setTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')


            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
        finally {
            setIsAdding(false)

        }


    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex-1 bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen text-gray-600 overflow-auto px-2 sm:px-0"
        >
            <div className="bg-white w-full max-w-2xl mx-auto p-4 sm:p-6 mt-6 shadow rounded-xl space-y-3">

                <h2 className="text-xl font-semibold text-gray-800">Create Blog</h2>

                {/* Upload Thumbnail */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                        Thumbnail
                    </label>
                    <label
                        htmlFor="image"
                        className="w-32 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                        <img
                            src={!image ? assets.upload_area : URL.createObjectURL(image)}
                            alt="thumbnail"
                            className="object-contain h-full"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Blog Title */}
                <div>
                    <label className="text-sm font-medium">Blog Title</label>
                    <input
                        type="text"
                        placeholder="Type blog title"
                        required
                        className="w-full mt-1 p-2 border border-gray-300 outline-none rounded text-sm"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                {/* Blog Subtitle */}
                <div>
                    <label className="text-sm font-medium">Blog Subtitle</label>
                    <input
                        type="text"
                        placeholder="Type blog subtitle"
                        required
                        className="w-full mt-1 p-2 border border-gray-300 outline-none rounded text-sm"
                        onChange={e => setSubTitle(e.target.value)}
                        value={subTitle}
                    />
                </div>

                {/* Blog Description */}
                <div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Blog Description</label>
                    </div>
                    <div className="h-32 border border-gray-300 rounded mt-1 overflow-hidden text-sm">
                        <div ref={editorRef} className="h-full" />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            disabled={isLoading}
                            onClick={generateContent}
                            type="button"
                            className={`text-xs font-medium text-white px-4 py-1.5 rounded-full transition-all shadow-sm
    ${isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:brightness-110"}
  `}
                        >
                            {isLoading ? "Generating content... Please wait" : "Generate with AI"}
                        </button>

                    </div>
                </div>

                {/* Blog Category */}
                <div>
                    <label className="text-sm font-medium">Blog Category</label>
                    <select
                        onChange={e => setCategory(e.target.value)}
                        name="category"
                        className="w-full mt-1 p-2 border border-gray-300 outline-none rounded text-sm"
                        value={category}
                    >
                        <option disabled>Select category</option>
                        {blogCategories.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Publish Now */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Publish Now</label>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        className="scale-110 cursor-pointer"
                        onChange={e => setIsPublished(e.target.checked)}
                    />
                </div>

                {/* Submit Button */}
                <button disabled={isAdding}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-all"
                >
                    {isAdding ? 'Adding..' : ' Add Blog'}
                </button>
            </div>
        </form>
    )
}

export default AddBlog
