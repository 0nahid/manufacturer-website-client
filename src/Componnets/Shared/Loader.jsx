import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <ClimbingBoxLoader
                color="#fda4af" size={30} />
        </div>
    )
}