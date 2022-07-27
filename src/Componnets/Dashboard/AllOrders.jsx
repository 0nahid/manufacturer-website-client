import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Shared/Loader'
import Loading from '../Shared/Loading'

export default function AllOrders() {
    const { data, refetch, isLoading } = useQuery(['available',], () => axios.get(`http://localhost:5500/api/orders`))
    if (isLoading) {
        <Loading />
    }
    console.log(data?.data);
    return (
        <>
            {
                !isLoading ? (
                    data?.data?.length > 0 ? (
                        <>
                            <h1 className="text-center text-xl font-medium mb-5">My order</h1>
                            <div className="container flex justify-center items-center">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>order Name</th>
                                            <th>Email</th>
                                            <th>Quantity</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Payment</th>
                                            <th>TrnxId</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data?.map((order, index) => (
                                            <tr key={order?._id}>
                                                <td>{index + 1}</td>
                                                <td>{order?.productName}</td>
                                                <td>{order?.email}</td>
                                                <td>{order?.quantity}</td>
                                                <td>{order?.size}</td>
                                                <td>
                                                    {order?.price ? <span className="font-bold">{order?.price}  $ </span> : <span className="text-green-500">Free</span>}
                                                </td>
                                                <td>

                                                    {order?.price ?
                                                        order?.price && order.paid ? <span className="text-green-500">
                                                            <button className="btn btn-sm btn-success text-white font-bold py-2 px-4 rounded">
                                                                Paid
                                                            </button>
                                                        </span> : <span>
                                                            <Link to={`/dashboard/payment/${order?._id}`} className="btn btn-sm btn-info text-white font-bold py-2 px-4 rounded">
                                                                Pay
                                                            </Link>
                                                        </span>
                                                        :
                                                        <span className="text-green-500">Free</span>}

                                                </td>
                                                <td>
                                                    {order?.transactionId ? <span className="font-bold">{order?.transactionId.slice(3)}</span> : <span className="text-green-500">Not Paid</span>}
                                                </td>
                                                <td>
                                                    <button>Cancel</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="container flex justify-center items-center">
                            <h1 className="text-center text-xl font-medium mb-5">No orders</h1>
                        </div>
                    )
                ) : (
                    <Loader />
                )
            }
        </>
    )
}
