import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search, JourneyPlanner, UserProfile } from './pages'
import { FeaturedCardIconProvider, LocationProvider, LocationNameProvider } from './contexts'
import './App.css'
import { useState, createContext } from 'react'
import { UserAccountProvider } from './contexts/userAccount'
import DummyPage from './pages/DummyPage'
import SavedListPage from './pages/SavedList'
import { Notification } from './components'
// import UserProfile from './pages/UserProfile'
// import JourneyPlanner from './pages/JourneyPlanner'


export const  LoginContext = createContext()

function App() {

  const [loggedIn, setLoggedIn] = useState()

 
  return (
    <>
    <LocationNameProvider>
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
                          <Route path="testPage" element={<Notification/>} />
                        </Route>
                        <Route path="/search">
                        <Route index element={<Search />} />
                        <Route path="*" element={<Search />} />
                        </Route>
                        <Route path="/journey" element={<JourneyPlanner />} />
                      </Route>
                    </Routes>
                  </FeaturedCardIconProvider>
              </UserAccountProvider>
            </LoginContext.Provider> 
         </LocationProvider>
      </LocationNameProvider>
      <div id="modal-root"></div>
    </>
  )
}

export default App
