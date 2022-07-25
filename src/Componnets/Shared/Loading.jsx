import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
export default function Loading() {
    return (
        <div className="h-screen flex justify-center items-center">
            <ClimbingBoxLoader
                color="#d946ef" size={25} />
        </div>
    )
}