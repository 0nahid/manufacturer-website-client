import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './Componnets/Auth/Login';
import Register from './Componnets/Auth/Register';
import ResetPassword from './Componnets/Auth/ResetPassword';
import RequiredAdmin from './Componnets/Auth/Security/RequiredAdmin';
import RequiredAuth from './Componnets/Auth/Security/RequiredAuth';
import AddProduct from './Componnets/Dashboard/AddProducts';
import AllOrders from './Componnets/Dashboard/AllOrders';
import AllUsers from './Componnets/Dashboard/AllUsers';
import Dashboard from './Componnets/Dashboard/Dashboard';
import ManageProducts from './Componnets/Dashboard/ManageProducts';
import Orders from './Componnets/Dashboard/Orders';
import Payment from './Componnets/Dashboard/Payment';
import Welcome from './Componnets/Dashboard/Welcome';
import Home from './Componnets/Home/Home';
import Loader from './Componnets/Shared/Loader';
import Navbar from './Componnets/Shared/Navbar';
import ServicesDetails from './Componnets/Shop/Details/ServicesDetails';
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
                    <Route path="/services/:id" element={<RequiredAuth><ServicesDetails /></RequiredAuth>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard" element={<RequiredAuth><Dashboard /></RequiredAuth>} >
                        <Route index element={<Welcome />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="payment/:id" element={<Payment />} />
                        <Route path="allOrders" element={<RequiredAdmin><AllOrders /></RequiredAdmin>} />
                        <Route path="addProduct" element={<RequiredAdmin><AddProduct /></RequiredAdmin>} />
                        <Route path="users" element={<RequiredAdmin><AllUsers /></RequiredAdmin>} />
                        <Route path="manageProducts" element={<RequiredAdmin><ManageProducts /></RequiredAdmin>} />
                    </Route>
                </Routes>

                <Toaster />
            </div>
        </div>
    )
}