import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import home from '../../assets/images/home.png'
import savedlist from '../../assets/images/savedlist.png'
import map from '../../assets/images/search.png'
import './Nav.css'

export default function Nav() {
  return (
    <>
        <nav className="nav-container">
            <ul>
                <li><NavLink to="/"><img src={home}></img></NavLink></li>
                <li><NavLink to="/user/:id">Profile</NavLink></li>
                <li><NavLink to="/user/login">Login</NavLink></li>
                <li><NavLink to="/user/signup">Sign Up</NavLink></li>
                <li><NavLink to="/user/:id/saved"><img src={savedlist}></img></NavLink></li>
                <li><NavLink to="/search"><img src={map}></img></NavLink></li>
                <li><NavLink to="/journey">Plan Journey</NavLink></li>
            </ul>
        </nav>
        <div className="nav-main-content-outlet">
            <Outlet />
        </div>
    </>
  )
}
