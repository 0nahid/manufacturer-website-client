import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios(`https://car-parts-bangladesh.herokuapp.com/api/blogs`)
            .then(res => {
                setBlogs(res.data);
            })
    }, [])
    // console.log(blogs);
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        blogs?.map((service, index) => (
                            <>
                                <div className="p-4 lg:w-1/3">
                                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                                        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{service?.question}</h1>
                                        <p className="leading-relaxed mb-3">{service?.answer.slice(0, 100)} </p>
                                        <Link to={`/blogs/${service?._id}`} className="text-pink-500 inline-flex items-center">Learn More
                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
