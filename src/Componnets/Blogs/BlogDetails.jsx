import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
export default function BlogDetails() {
  const { id } = useParams();
  const [blogDetails, setblogDetails] = useState({})
  useEffect(() => {
    axios.get(`https://car-parts-bangladesh.herokuapp.com/api/blog/${id}`)
      .then(res => {
        setblogDetails(res.data)
      })
  }, [id])
  // console.log(blogDetails);
  return (
    <div className="max-w-4xl mx-auto mt-10  text-neutral">
      <Link to="/blogs" className="text-pink-500 inline-flex items-center"><IoChevronBackSharp />Back...</Link>
      <div className="mockup-code bg-white ">
        <pre data-prefix="$"><code className="text-black text-2xl">{blogDetails?.question}</code></pre>
        <pre data-prefix=">" className="text-success text-2xl mt-5"><code>{blogDetails?.answer}</code></pre>
      </div>
    </div>
  )
}
