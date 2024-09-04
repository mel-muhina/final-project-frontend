import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search, JourneyPlanner, UserProfile } from './pages'
import { FeaturedCardIconProvider, LocationProvider } from './contexts'
import './App.css'
import { UserAccountProvider } from './contexts/userAccount'
import DummyPage from './pages/DummyPage'
import SavedListPage from './pages/SavedList'
import { Notification } from './components'
// import UserProfile from './pages/UserProfile'
// import JourneyPlanner from './pages/JourneyPlanner'




function App() {

 

  return (
    <>
      <LocationProvider>
          
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
          
      </LocationProvider>
    </>
  )
}

export default App
