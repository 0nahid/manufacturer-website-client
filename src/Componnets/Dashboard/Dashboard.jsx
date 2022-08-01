import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../../Hooks/useAdmin'

export default function Dashboard() {
  const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)
  const Navmenu = (
    <li>
      {
        admin ?
          <>
            <Link to="/dashboard/allOrders">All Orders</Link>
            <Link to="/dashboard/addProduct">Add Product</Link>
            <Link to="/dashboard/users">All Users</Link>
            <Link to="/dashboard/manageProducts">Manage Products</Link>
          </>
          :
          <>
            <Link to="/dashboard/orders">My Orders</Link>
            <Link to="/dashboard/addReview">Add a new review</Link>
          </>
      }
    </li>
  )
  return (
    <div className="drawer">
      <Helmet>
        <title>Dashboard - Car Parts</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label for="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {Navmenu}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label for="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          {Navmenu}
        </ul>

      </div>
    </div>
  )
}
