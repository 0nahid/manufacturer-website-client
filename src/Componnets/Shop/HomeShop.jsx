import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import HomeShopData from './HomeShopData';

export default function HomeShop() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    useEffect(() => {
        fetch('http://localhost:5500/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                // console.log(data);
            }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1 className="text-center font-bold m-10 text-3xl text-primary">Parts We Provide</h1>
            {
                loading ? <Loading /> : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {
                            services?.slice(0, 3)?.map((service, index) => <HomeShopData key={index} service={service} />)
                        }
                    </div>
                )
            }
        </div>
    )
}
