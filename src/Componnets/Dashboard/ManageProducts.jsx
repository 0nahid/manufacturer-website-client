import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import Loader from '../Shared/Loader';
import Loading from '../Shared/Loading';

export default function ManageProducts() {
    const { data, isLoading, refetch } = useQuery(['products'], () => axios.get(`http://localhost:5500/api/services`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }));
    if (isLoading) {
        <Loading />
    }
    // console.log(data.data);
    // delete product
    const deleteProduct = (id) => {
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
                // if confirmed, delete the product
                axios.delete(`http://localhost:5500/api/services/${id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                    }
                })
                    .then(res => {
                        console.log(res);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
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
                            <h1 className="text-center text-xl font-medium mb-5">Manage Products</h1>
                            <Helmet>
                                <title>Manage Products - Car Parts</title>
                                <meta name="description" content="Helmet application" />
                            </Helmet>

                            <div className=" flex justify-center items-center">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Sl.</th>
                                            <th></th>
                                            <th>order Name</th>
                                            <th>Available Quantity</th>
                                            <th>Minimum Order Quantity</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data?.map((order, index) => (
                                            <tr key={order?._id}>
                                                <td>{index + 1}</td>
                                                <td><img className='w-12 h-12' src={order?.image} alt="" /></td>
                                                <td>{order?.productName}</td>
                                                <td>{order?.availableQty} pices</td>
                                                <td>{order?.orderQty}pices</td>
                                                <td>{order?.price} $</td>
                                                <td>
                                                    <button
                                                        onClick={() => deleteProduct(order?._id)}
                                                        className="btn btn-sm btn-error text-white font-bold py-2 px-4 rounded"
                                                    >Delete</button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="container flex justify-center items-center">
                            <h1 className="text-center text-xl font-medium mb-5">No Products Found</h1>

                        </div>
                    )
                ) : (
                    <Loader />
                )
            }
        </>
    )
}
