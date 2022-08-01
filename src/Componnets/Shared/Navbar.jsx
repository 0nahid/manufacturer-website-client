import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import auth from '../../firebase.init';

export default function Navbar() {
    const [user] = useAuthState(auth)

    const navigate = useNavigate();
    const logout = () => {
        signOut(auth);
        toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
            position: "bottom-right",
            autoClose: 5000,
        });
        localStorage.removeItem("accessToken");
        navigate("/");
    };
    const Navmenu = (
        <li className="font-bold">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/blogs">Blogs</Link>
            {/* {
                user && <Link to="/portfolio">Portfolio</Link>
            } */}
            <Link to="/contact">Contact</Link>
            {
                user && <Link to="/dashboard">Dashboard</Link>
            }
            {
                user ? <button
                    onClick={logout}
                    className="btn btn-primary">Logout</button> : <Link to="/login">Login</Link>
            }
        </li>
    )
    return (
        <>
            <div className="navbar sticky top-0 z-40 border-b bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 dark:bg-[#0B1120]/80 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {Navmenu}
                        </ul>
                    </div>
                    <div className="hidden lg:flex">
                        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">Car parts</Link>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {Navmenu}
                    </ul>
                </div>
                <div className="navbar-end flex lg:hidden">
                    <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">Car Parts</Link>
                </div>
            </div>
        </>
    )
}
