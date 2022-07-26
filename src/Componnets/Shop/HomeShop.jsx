import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../Shared/Loading';
import HomeShopData from './HomeShopData';
export default function HomeShop() {
    const { data, isLoading } = useQuery(['available',], () => axios.get(`http://localhost:5500/api/services`))
    // console.log(data?.data);

    if (isLoading) {
        <Loading />
    }
    return (
        <>
            <h1 className="text-center font-bold m-10 text-3xl text-primary">Parts We Provide</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {
                    data?.data?.slice(0, 3).map((service, index) => <HomeShopData key={index} service={service} />)
                }
            </div>
        </>
    )
}