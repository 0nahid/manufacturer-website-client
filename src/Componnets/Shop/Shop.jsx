import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import ShopData from './ShopData';

export default function Shop() {
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
                console.log(data);
            }).catch(err => console.log(err))
    }, [])
    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {
                            services?.map((service, index) => <ShopData key={index} service={service} />)
                        }
                    </div>
                )
            }
        </>
    )
}
