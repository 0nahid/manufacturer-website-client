import React from 'react'
import { Helmet } from 'react-helmet'
import image from "./error-404.png"
export default function Page404() {
    return (
        <div>
            <Helmet>
                <title>Error - Car Parts</title>
            </Helmet>
            <div className='flex justify-center items-center min-h-screen'>
                <img src={image} alt="error" />
            </div>
        </div>
    )
}
