import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <>
        <h1>Nav Bar</h1>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/user/:id">Profile</NavLink></li>
                <li><NavLink to="/user/login">Login</NavLink></li>
                <li><NavLink to="/user/signup">Sign Up</NavLink></li>
                <li><NavLink to="/user/:id/saved">Saved List</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/journey">Plan Journey</NavLink></li>
            </ul>
        </nav>
        <Outlet />
    </>
  )
}
