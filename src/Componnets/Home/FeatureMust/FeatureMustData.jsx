import React from 'react';

export default function FeatureMustData({ service }) {
    // console.log(service);
    const { name, description, icon } = service;
    return (
        <div className="card w-60 lg:max-w-lg bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                {icon}
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}
