import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'
import Loader from '../Shared/Loader'
import Loading from '../Shared/Loading'
export default function AllOrders() {
    const { data, refetch, isLoading } = useQuery(['available',], () => axios.get(`http://localhost:5500/api/orders`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }))
    // console.log(data);
    if (isLoading) {
        <Loading />
    }

    const cancelOrder = (id, quantity) => {
        console.log(id, quantity);
        // asking confirmation with sweetalert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // if confirmed, delete the order
                axios.delete(`http://localhost:5500/api/orders/${id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                    }
                })
                    .then(res => {
                        console.log(res);

                        // update the availableQty of the service by checking the quantity of the order
                        axios.get(`http://localhost:5500/api/service/${id}`, {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                            }
                        })
                            .then(res => {
                                console.log(res);
                                const updatedAvailableQty = res.data.availableQty + parseInt(quantity);
                                axios.patch(`http://localhost:5500/api/service/${id}`, {
                                    availableQty: updatedAvailableQty
                                }, {
                                    headers: {
                                        authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                                    }
                                })
                                    .then(res => {
                                        console.log(res);
                                        refetch();
                                    });
                            });

                       

                        Swal.fire(
                            'Deleted!',
                            'Order has been deleted.',
                            'success'
                        )
                        refetch()
                    }
                    ).catch(err => console.log(err))



            }
        })
    }
    return (
        <>
            {
                !isLoading ? (
                    data?.data?.length > 0 ? (
                        <>
                            <h1 className="text-center text-xl font-medium mb-5">All Orders</h1>
                            <Helmet>
                                <title>All Orders - Car Parts</title>
                                <meta name="description" content="Helmet application" />
                            </Helmet>
                            <div className="container mx-auto flex justify-center items-center ">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Sl.</th>
                                            <th>order Name</th>
                                            <th>Email</th>
                                            <th>Quantity</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Payment Status</th>
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
                                                            <button className="btn btn-xs btn-success text-white font-bold rounded">
                                                                Paid
                                                            </button>
                                                        </span> : <span>
                                                            <button className="btn btn-xs btn-info text-white font-bold rounded">
                                                                Not paid
                                                            </button>
                                                        </span>
                                                        :
                                                        <span className="text-green-500">Free</span>}

                                                </td>
                                                <td>
                                                    {order?.transactionId ? <span className="font-bold text-xs">{order?.transactionId.slice(3)}</span> : <span className="text-green-500">Not Paid</span>}
                                                </td>
                                                {
                                                    order?.paid ? (
                                                        <td></td>
                                                    ) : (
                                                        <td>
                                                            <button
                                                                onClick={() => cancelOrder(order?._id, order?.quantity)}
                                                                className="btn btn-sm btn-error text-white font-bold py-2 px-4 rounded"
                                                            >Cancel</button>
                                                        </td>
                                                    )
                                                }
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
