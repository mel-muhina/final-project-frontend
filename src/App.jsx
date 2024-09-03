import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search, JourneyPlanner, UserProfile } from './pages'
import { FeaturedCardIconProvider, LocationProvider } from './contexts'
import './App.css'
import { createContext, useState } from 'react'
import { UserAccountProvider } from './contexts/userAccount'
import { Notification } from './components'
// import UserProfile from './pages/UserProfile'
// import JourneyPlanner from './pages/JourneyPlanner'


export const LoginContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <>
      <LocationProvider>
          {/* <LoginContextProvider> */}
            <UserAccountProvider>
              <FeaturedCardIconProvider>
                  <Routes>
                    <Route path="" element={<Nav />} >
                        <Route index element={<Homepage />} /> 
                      <Route path="/user">
                        <Route index element={<h1>User Profile Page</h1>} /> 
                        <Route path="signup" element={<UserSignup/>} /> 
                        <Route path="login" element={<UserLogin/>} /> 
                        <Route path=":id" element={<UserProfile/>} />
                        <Route path="testPage" element={<Notification/>} />
                      </Route>
                      <Route path="/search" element={<Search />} />
                      <Route path="/journey" element={<JourneyPlanner />} />
                    </Route>
                  </Routes>
                </FeaturedCardIconProvider>
            </UserAccountProvider>
          {/* </LoginContextProvider> */}
      </LocationProvider>
    </>
  )
}

export default App
