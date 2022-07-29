import React from 'react';
import { Link } from 'react-router-dom';

export default function ShopData({ service }) {
    const { productName, image, _id, price, availableQty } = service;
    return (
        <div class="card card-compact w-full bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 shadow-xl">
            <figure><img src={image} class="h-52" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    {productName}
                    <div class="badge badge-neural">NEW</div>
                </h2>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">{availableQty} left</div>
                    <div class="badge ">{price}$ only</div>
                </div>
                <div class="card-actions justify-end">
                    <Link to={`/services/${_id}`} class="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    )
}
