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
import { GetNotifications } from '../../components'



function Modal({ onClose, children }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
        </div>
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    );
  }

  
function ProfileModal({ onClose, children }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    );
  }

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [topIsOpen, setTopIsOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false)
  const [profileModal, setProfileModal] = useState(false)
  const token = localStorage.getItem('authToken');

  useEffect(() => {
      if (token) {
          // getRecommended(token);
      }
  }, [token])

    const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  const toggleTopMenu = () => {
    setProfileModal(!profileModal);
};

const toggleNotifications = () => {
    setNotificationModal(!notificationModal);
};



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
                <NavLink to="#"><h2 className='logo-title'>NatureConnect</h2></NavLink>
            </div>

                    <ul className="top">

                        <li><NavLink to="#" onClick={toggleNotifications}><img src={notification}></img></NavLink></li>
                        <li></li>
                        <li><NavLink to="#" onClick={toggleTopMenu}><img src={profile}></img></NavLink></li>
                  
            {/* </div> */}

                    {notificationModal && (
                    <Modal onClose={toggleNotifications}>
                    <div className='notification-dropdown'>
                        {/* Your login form goes here */}
                        <GetNotifications />
                        <button onClick={toggleNotifications} className='notifications-close'>Close</button>
                    </div>
                    </Modal>
                )}

                {profileModal && (
                    <ProfileModal onClose={toggleTopMenu}>
                    <div className='profile-dropdown'>
                        {/* <h4>Notifications</h4> */}
                        {/* Your login form goes here */}
                        <ul>
                        {token ? (
                          <div>
                            <li><NavLink to="/user/:id">Profile</NavLink></li>  
                          </div> 
                          ): (
                          <div>
                            <li><NavLink to="/user/login">Login</NavLink></li>
                            <li><NavLink to="/user/signup">Sign Up</NavLink></li>
                           </div>
                          )}
                        </ul>
                        
                        {/* <button onClick={toggleTopMenu} className='notifications-close'>Close</button> */}
                    </div>
                    </ProfileModal>
                 )}
       
       
           </ul>
        </nav>
       
        <div className="nav-main-content-outlet">
            <Outlet />
        </div>
    </>
  )
}
