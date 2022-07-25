import React from 'react';
import { GiFlintSpark } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { MdMultipleStop } from "react-icons/md";
import { RiOilFill } from "react-icons/ri";
import { SiAirchina } from "react-icons/si";
import FeatureMustData from './FeatureMustData';
export default function FeatureMust() {
    const services = [
        {
            _id: 1,
            name: 'Brake pads',
            description: 'Brake pads are used to stop the car from sliding',
            icon: <MdMultipleStop class="h-10 w-10 text-primary" />
        },
        {
            _id: 2,
            name: 'Car bulbs',
            description: 'Car bulbs are used to light the car.',
            icon: <HiLightBulb class="h-10 w-10 text-primary" />
        },
        {
            _id: 3,
            name: 'Air Filters',
            description: 'Air filters are used to clean the air inside the car.',
            icon: <SiAirchina class="h-10 w-10 text-primary" />
        },
        {
            _id: 4,
            name: 'Motors Oil',
            description: 'Motors oil is used to maximize the Engine  performance.',
            icon: <RiOilFill class="h-10 w-10 text-primary" />
        },
        {
            _id: 5,
            name: 'Spark Plugs',
            description: 'Spark plugs are used to start the engine.',
            icon: <GiFlintSpark class="h-10 w-10 text-primary" />
        }
    ]
    return (
        <>
            <div class="text-center mt-10">
                <h1 className=" font-bold  text-3xl text-primary">MUST HAVES FOR EVERY CAR</h1>
                <p className="font-bold text-neutral m-5">Enjoy an entirely new level of driving experience with our in-depth selection of superior car bulbs, brake pads, spark plugs, and other automotive parts and accessories designed to keep your car running at its absolute best.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center">
                {
                    services.map(service => <FeatureMustData key={service._id} service={service} />)
                }
            </div>
        </>
    )
}
