import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../Shared/Loading';
import ShopData from './ShopData';
export default function Shop() {
    const { data, refetch, isLoading } = useQuery(['available',], () => axios.get(`http://localhost:5500/api/services`))
    console.log(data?.data);

    if (isLoading) {
        <Loading />
    }
    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {
                    data?.data?.map((service, index) => <ShopData key={index} service={service} />)
                }
            </div>
        </>
    )
}
