import {
    Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Loader from '../Shared/Loader'

import CheckoutForm from './CheckoutForm.jsx'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)
// console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


export default function Payment() {
    const { id } = useParams()
    const { data: orders, refetch, isLoading, error } = useQuery(['available',], () => axios.get(`http://localhost:5500/api/order/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }))

    if (isLoading) return <Loader />

    const { productName, userName, price, email } = orders?.data;
    // console.log(orders?.data);

    return (
        <div claSS="container mx-auto">
            {/* <h1>Payment of {id}</h1> */}
            <Helmet>
                <title>Payment - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="card w-50 bg-base-100 shadow-xl my-12 ">
                <div className="card-body">
                    <p className="text-2xl font-semibold">Grettings <span className="text-success">{userName}</span> </p>
                    <h2 className="card-title font-bold text-neutral">Pay for {productName?.toUpperCase()}</h2>
                    <p className='text-xl'>Please pay <span className="font-bold text-xl">{price}$</span> </p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={id} price={price} userName={userName} email={email} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}