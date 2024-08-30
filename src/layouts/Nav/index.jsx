import React, { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import home from '../../assets/images/home2.png'
import savedlist from '../../assets/images/savedlists2.png'
import map from '../../assets/images/map2.png'
import journey from '../../assets/images/journey.png'
import logo from '../../assets/logo.png'
import profile from '../../assets/images/userprofile.png'
import notification from '../../assets/images/notification.png'
import './Nav.css'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [topIsOpen, setTopIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  const toggleTopMenu = () => {
    setTopIsOpen(!isOpen);
};

  useEffect(() => {
    
  },[toggleMenu] )

  return (
    <>
      

        
              <div className="menu-icon" onClick={toggleMenu}>
                  {isOpen ? (
                      <span className="close-icon">x</span> // Close icon
                  ) : (
                      <span className="hamburger-icon">&#9776;</span> // Hamburger icon
                  )}
              </div>
        <nav className="nav-container">
              {isOpen && (
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}><img src={home}></img></NavLink></li>
                    <li><NavLink to="/user/:id/saved"><img src={savedlist}></img></NavLink></li>
                    <li><NavLink to="/search"><img src={map}></img></NavLink></li>
                    <li><NavLink to="/journey"><img src={journey}></img></NavLink></li>
                </ul>
                )}
        </nav>

        <nav className="top-nav-container" >
            <div className="top-nav-logoName">
                <img src={logo} className="top-nav-container-logo" />
                <h2>NatureConnect</h2>
            </div>

                    <ul className="top">
                        <li><NavLink to="/user/login">Login</NavLink></li>
                        <li><NavLink to="/user/signup">Sign Up</NavLink></li>
                        <li><NavLink to="/user/signup"><img src={notification}></img></NavLink></li>
                        <li></li>
                        <li><NavLink to="/user/:id"><img src={profile}></img></NavLink></li>
                    </ul>
            {/* </div> */}
       
        </nav>
       
        <div className="nav-main-content-outlet">
            <Outlet />
        </div>
    </>
  )
}
