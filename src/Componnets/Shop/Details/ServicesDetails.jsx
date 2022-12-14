import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../Hooks/useAdmin';
import Page403 from '../../Errors/Page403';
import Loading from '../../Shared/Loading';

export default function ServicesDetails() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { data: services, refetch, isLoading, error } = useQuery(['available',], () => axios.get(`https://car-parts-bangladesh.herokuapp.com/api/service/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }))

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return <Loading />
    }

    const { productName, availableQty, orderQty, image, price, productDescription } = services?.data;
    const onSubmit = data => {
        const email = user?.email;
        const userName = user?.displayName;
        const totalPrice = price * data.quantity;
        const newData = { ...data, email, userName, productName, price: totalPrice, image }
        // console.log(newData);
        axios.post(`https://car-parts-bangladesh.herokuapp.com/api/orders`, newData, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Successfully ordered')
                    // navigate('/dashboard/orders')
                    const orderQuabtity = data.quantity;
                    const newAvailableQty = availableQty - orderQuabtity;
                    axios.put(`https://car-parts-bangladesh.herokuapp.com/api/services/${id}`, { availableQty: newAvailableQty }, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                        }
                    })
                        .then(res => {
                            // console.log(res);
                            navigate('/dashboard/orders')
                            refetch();
                        }
                        )
                        .catch(err => {
                            console.log(err);
                        });
                }
            }).catch(err => toast.error('Error ordering'))
    }

    return (
        <>
            <Helmet>
                <title>{productName || "Details"} - Car Parts</title>
                <meta name="description" content={productDescription || "Details"} />
            </Helmet>
            {
                error ? <Page403 /> :
                    loading ? <Loading /> :
                        <section className="text-gray-600 body-font overflow-hidden m-5  rounded-md p-5">
                            <button><Link to="/shop"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg></Link></button>
                            <div className="container px-5 py-24 mx-auto bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 rounded-md">
                                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={image} />
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">" "</h2> */}
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productName}</h1>
                                        <div className="flex mb-4">
                                            <span className="flex items-center">
                                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <span className="text-gray-600 ml-3">4 Reviews</span>
                                            </span>
                                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                                <a className="text-gray-500">
                                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="text-gray-500">
                                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="text-gray-500">
                                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                        <p className="leading-relaxed">{productDescription}</p>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                                <div className="flex items-center">
                                                    <span className="mr-3">Size</span>
                                                    <div className="relative">
                                                        <select {...register("size")} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                                            <option>SM</option>
                                                            <option>M</option>
                                                            <option>L</option>
                                                            <option>XL</option>
                                                        </select>
                                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                                <path d="M6 9l6 6 6-6"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                admin ? (
                                                    <div>
                                                        <p>Available items : {availableQty} </p>
                                                        <h1 className="text-error text-xl">Order option for site admin is not allowed !!!</h1>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <h1 className="font-bold text-md">Minimum Order quantity {orderQty} </h1>
                                                            <label className="block text-gray-700  font-bold mb-2" for="quantity">Quantity: <span className="badge mr-1"> {availableQty} </span>
                                                                items available </label>

                                                            <input {...register("quantity", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Quantity is required",
                                                                },
                                                                pattern: {
                                                                    value: /^(0|[1-9]\d*)$/,
                                                                    message: "Quantity must be a real number",
                                                                },
                                                                min: {
                                                                    value: orderQty,
                                                                    message: `Quantity must be at least ${orderQty}`,
                                                                },
                                                                max: {
                                                                    value: availableQty,
                                                                    message: "Quantity must be less than or equal to available quantity",
                                                                },
                                                            })}
                                                                maxLength={10}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3" id="quantity" type="number" placeholder="1" />
                                                            <label className="label">
                                                                <span className="label-text-alt"> <p className="text-error">{errors.quantity?.message}</p></span>
                                                            </label>
                                                        </div>

                                                        <div className="flex">
                                                            <span className="title-font font-medium text-2xl text-gray-900">${price}</span>
                                                            {
                                                                availableQty <= 0 ?
                                                                    <button className="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded" type="button" disabled>
                                                                        Out of Stock
                                                                    </button>
                                                                    :
                                                                    error ? <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" disabled> Can't Order' </button> : <button type='submit' className="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded">
                                                                        Place Order
                                                                    </button>
                                                            }
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
            }
        </>
    )
}
