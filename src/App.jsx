import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search } from './pages'
import { FeaturedCardIconProvider, LocationProvider } from './contexts'
import './App.css'
import { useState, createContext } from 'react'
import { UserAccountProvider } from './contexts/userAccount'
import UserProfile from './pages/UserProfile'
import DummyPage from './pages/DummyPage'
import SavedListPage from './pages/SavedList'


export const  LoginContext = createContext()

function App() {

  const [loggedIn, setLoggedIn] = useState()

 
  return (
    <>
      <LocationProvider>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}> 
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
                        <Route path="test" element={<DummyPage/>} />
                        <Route path=":id/saved" element={<SavedListPage/>} />
                      </Route>
                      <Route path="/search" element={<Search />} />
                    </Route>
                  </Routes>
                </FeaturedCardIconProvider>
            </UserAccountProvider>
          </LoginContext.Provider> 
      </LocationProvider>
    </>
  )
}

export default App
