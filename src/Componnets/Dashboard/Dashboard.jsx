import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Dashboard() {
  const Navmenu = (
    <li>
        <Link to="/dashboard/orders">Orders</Link>
        <Link to="/dashboard/allOrders">All Orders</Link>
    </li>
)
  return (
    <div class="drawer">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="dashboard-drawer" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
             {Navmenu}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="dashboard-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        {Navmenu}
        </ul>

      </div>
    </div>
  )
}
