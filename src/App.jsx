import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './Componnets/Auth/Login';
import Register from './Componnets/Auth/Register';
import ResetPassword from './Componnets/Auth/ResetPassword';
import Home from './Componnets/Home/Home';
import Loader from './Componnets/Shared/Loader';
import Navbar from './Componnets/Shared/Navbar';
import ServicesDetails from './Componnets/Shop/Details/ServicesDetails';
import Order from './Componnets/Shop/Order/Order';
import Shop from './Componnets/Shop/Shop';

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
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/services/:id" element={<ServicesDetails />} />
                    <Route path="/services/order/:id" element={<Order />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                </Routes>

                <Toaster />
            </div>
        </div>
    )
}