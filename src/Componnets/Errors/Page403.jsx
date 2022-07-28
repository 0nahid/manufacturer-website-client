import React from 'react'
import { Helmet } from 'react-helmet'

export default function Page403() {
    return (
        <div class="hero min-h-screen">
            <Helmet>
                <title>Page 403 - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-3xl font-bold">403</h1>
                    <p class="text-lg">
                        You are not authorized to access this page.
                    </p>

                </div>
            </div>
        </div>
    )
}
