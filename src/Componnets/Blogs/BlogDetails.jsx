import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
export default function BlogDetails() {
  const { id } = useParams();
  const [blogDetails, setblogDetails] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:5500/api/blog/${id}`)
      .then(res => {
        setblogDetails(res.data)
      })
  }, [id])
  console.log(blogDetails);
  return (
    <div class="max-w-4xl mx-auto mt-10  text-neutral">
      <Link to="/blogs" class="text-pink-500 inline-flex items-center"><IoChevronBackSharp />Back...</Link>
      <div class="mockup-code bg-white ">
        <pre data-prefix="$"><code class="text-black text-2xl">{blogDetails?.question}</code></pre>
        <pre data-prefix=">" class="text-success text-2xl mt-5"><code>{blogDetails?.answer}</code></pre>
      </div>
    </div>
  )
}
