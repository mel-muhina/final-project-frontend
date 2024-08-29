import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import home from '../../assets/images/home-inactive.png'
import savedlist from '../../assets/images/saved-inactive.png'
import map from '../../assets/images/map-inactive.png'
import journey from '../../assets/images/journeyplan-inactive.png'
import logo from '../../assets/logo.png'
import profile from '../../assets/images/user-circle.png'
import './Nav.css'

export default function Nav() {
  return (
    <>
      

        
        <nav className="nav-container">
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}><img src={home}></img></NavLink></li>
                <li><NavLink to="/user/:id/saved"><img src={savedlist}></img></NavLink></li>
                <li><NavLink to="/search"><img src={map}></img></NavLink></li>
                <li><NavLink to="/journey"><img src={journey}></img></NavLink></li>
            </ul>
        </nav>

        <nav className="top-nav-container">
            <div className="top-nav-logoName">
                <img src={logo} className="top-nav-container-logo" />
                <h2>NatureConnect</h2>
            </div>
            <ul>
                <li><NavLink to="/user/login">Login</NavLink></li>
                <li><NavLink to="/user/signup">Sign Up</NavLink></li>
                <li><NavLink to="/user/:id"><img src={profile}></img></NavLink></li>
            </ul>
        </nav>
       
        <div className="nav-main-content-outlet">
            <Outlet />
        </div>
    </>
  )
}
