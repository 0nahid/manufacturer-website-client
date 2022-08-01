import React from 'react'
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import FeaturesData from './FeaturesData'
export default function Features() {
    const features = [
        {
            _id: 1,
            name: 'Max Speed',
            img: image1,
        },
        {
            _id: 2,
            name: 'Clean WorkShop',
            img: image2,
        },
        {
            _id: 3,
            name: 'Better Quality',
            img: image3,
        }
    ]
    return (
        <div className=" mb-10 md:-mt-20">
        <h1 className="text-center text-primary font-bold text-3xl mt-10 mb-10">Features</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {
                    features.map(feature => <FeaturesData key={feature._id} feature={feature} />)

                }
            </div>
        </div>
    )
}
