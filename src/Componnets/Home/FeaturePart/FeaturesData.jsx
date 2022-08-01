import React from 'react';

export default function FeaturesData({ feature }) {
    const { name, img } = feature;
    return (
        <div className="card max-w-md bg-base-100 shadow-xl image-full">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title font-bold">{name}</h2>
            </div>
        </div>
    )
}
