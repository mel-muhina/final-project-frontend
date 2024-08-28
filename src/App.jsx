import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup } from './pages'
import { FeaturedCardIconProvider } from './contexts'
import './App.css'

function App() {

  return (
    <>
      <FeaturedCardIconProvider>
          <Routes>
            <Route path="" element={<Nav />} >
                <Route index element={<Homepage />} /> 
              <Route path="/user">
                <Route index element={<h1>User Profile Page</h1>} /> 
                <Route path="signup" element={<h1>User Sign Up</h1>} /> 
                <Route path="login" element={<UserLogin/>} /> 
              </Route>
            </Route>
          </Routes>
      </FeaturedCardIconProvider>
     
    </>
  )
}

export default App
