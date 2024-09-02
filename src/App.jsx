import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search } from './pages'
import { FeaturedCardIconProvider, LocationProvider } from './contexts'
import './App.css'

function App() {

  return (
    <>
      <LocationProvider>
        <FeaturedCardIconProvider>
            <Routes>
              <Route path="" element={<Nav />} >
                  <Route index element={<Homepage />} /> 
                <Route path="/user">
                  <Route index element={<h1>User Profile Page</h1>} /> 
                  <Route path="signup" element={<h1>User Sign Up</h1>} /> 
                  <Route path="login" element={<UserLogin/>} /> 
                </Route>
                <Route path="/search" element={<Search />} />
              </Route>
            </Routes>
          </FeaturedCardIconProvider>
        </LocationProvider>
    </>
  )
}

export default App
