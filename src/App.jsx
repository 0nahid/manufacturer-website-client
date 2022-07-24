import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Home from './Componnets/Home/Home';
import Loader from './Componnets/Shared/Loader';
import Navbar from './Componnets/Shared/Navbar';

export default function App() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            <div className="max-w-7xl mx-auto">
                {
                    loading ? (
                        <Loader />
                    ) :
                        <Navbar />
                }
                <Routes>
                    <Route path="/" element={<Home />} />

                </Routes>
                <Toaster />
            </div>
        </div>
    )
}