import React from 'react';

export default function FeaturesData({ feature }) {
    const { name, img } = feature;
    return (
        <div class="card max-w-md bg-base-100 shadow-xl image-full">
            <figure><img src={img} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title font-bold">{name}</h2>
            </div>
        </div>
    )
}
