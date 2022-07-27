import React from 'react';

export default function FeatureMustData({ service }) {
    // console.log(service);
    const { name, description, icon } = service;
    return (
        <div class="card w-60 lg:max-w-lg bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                {icon}
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}
