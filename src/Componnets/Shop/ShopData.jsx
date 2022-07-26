import React from 'react';
import { Link } from 'react-router-dom';

export default function ShopData({ service }) {
    const { name, image,_id } = service;
    return (
        <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src={image} class="h-52" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    {name}
                    <div class="badge badge-neural">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div>
                    <div class="badge badge-outline">Products</div>
                </div>
                <div class="card-actions justify-end">
                    <Link to={`/services/${_id}`} class="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    )
}
