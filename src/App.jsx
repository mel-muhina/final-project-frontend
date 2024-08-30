import { Routes, Route } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Homepage, UserLogin, UserSignup, Search } from './pages'
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
                <Route path="signup" element={<UserSignup/>} /> 
                <Route path="login" element={<UserLogin/>} /> 
              </Route>
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
      </FeaturedCardIconProvider>
     
    </>
  )
}

export default App
