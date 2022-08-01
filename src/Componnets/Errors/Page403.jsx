import React from 'react'
import { Helmet } from 'react-helmet'

export default function Page403() {
    return (
        <div className="hero min-h-screen">
            <Helmet>
                <title>Page 403 - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-3xl font-bold">403</h1>
                    <p className="text-lg">
                        You are not authorized to access this page.
                    </p>

                </div>
            </div>
        </div>
    )
}
