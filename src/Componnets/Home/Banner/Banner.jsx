import React from 'react'
import { Link } from 'react-router-dom'
import wave from './wave.svg'
export default function Banner() {
    return (
        <div className="rounded-lg"
            style={{
                backgroundImage: `url(${wave})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://images.thedailystar.net/sites/default/files/feature/images/auto_parts.jpg" className="object-fill h-80 w-99 rounded-lg shadow-2xl" alt="/" />
                    <div>
                        <h1 className="text-5xl font-bold py-2 ml-1">Find all auto parts here</h1>
                        <p className="py-2 m-2 text-xl font-bold">Bonnet/hood. Bonnet/hood. Car cover. Support stick. Hinges and springs.</p>
                        <Link to="/shop" className="btn btn-primary">Explore!!!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
