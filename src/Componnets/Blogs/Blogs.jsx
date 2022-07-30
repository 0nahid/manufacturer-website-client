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
    console.log(blogs);
    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                    {
                        blogs?.map((service, index) => (
                            <>
                                <div class="p-4 lg:w-1/3">
                                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                                        <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{service?.question}</h1>
                                        <p class="leading-relaxed mb-3">{service?.answer.slice(0,100)} </p>
                                        <Link to={`/blogs/${service?._id}`}  class="text-pink-500 inline-flex items-center">Learn More
                                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
