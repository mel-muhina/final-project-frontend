import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search } from './pages'
import { FeaturedCardIconProvider } from './contexts'
import './App.css'
import { createContext, useState } from 'react'
import { UserAccountProvider } from './contexts/userAccount'
import UserProfile from './pages/UserProfile'


export const LoginContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <>
    <LoginContext.Provider value={[loggedIn, setLoggedIn] }>
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
                </Route>
                <Route path="/search" element={<Search />} />
              </Route>
            </Routes>
        </FeaturedCardIconProvider>
      </UserAccountProvider>
    </LoginContext.Provider>
    </>
  )
}

export default App
