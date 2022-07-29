import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loader from '../Shared/Loader';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5500/api/orders/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        })
            .then(res => {
                setOrders(res?.data);
                // console.log(res.data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            }
            )
    }, [user?.email])
    return (
        <>
            {
                !loading ? (
                    orders.length > 0 ? (
                        <>
                            <h1 className="text-center text-xl font-medium mb-5">My order</h1>
                            <Helmet>
                                <title>My Orders - Car Parts</title>
                                <meta name="description" content="Helmet application" />
                            </Helmet>
                            <div className="container mx-auto flex justify-center items-center">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>order Name</th>
                                            {/* <th>id</th> */}
                                            {/* <th>Email</th> */}
                                            <th>Quantity</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Payment</th>
                                            <th>TrnxId</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((order, index) => (
                                            <tr key={order?._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span class="flex items-center"> <img class="w-10 h-10" src={order?.image} alt="" /> {order?.productName}</span>
                                                </td>
                                                {/* <td>{order?._id}</td> */}
                                                {/* <td>{order?.email}</td> */}
                                                <td>{order?.quantity}</td>
                                                <td>{order?.size}</td>
                                                <td>
                                                    {order?.price ? <span className="font-bold">{order?.price}  $ </span> : <span className="text-green-500">Free</span>}
                                                </td>
                                                <td>

                                                    {order?.price ?
                                                        order?.price && order?.price > 0 && order.paid ? <span className="text-green-500">
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
