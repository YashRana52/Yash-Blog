import React from 'react'
import Navbar from '../components/Navbar'
import Header from '@/components/Header'
import BlogList from '@/components/BlogList'
import NewsLatter from '@/components/NewsLatter'
import Footer from '@/components/Footer'

function Home() {
    return (
        <>

            <Navbar />
            <Header />
            <BlogList />
            <NewsLatter />
            <Footer />

        </>

    )
}

export default Home