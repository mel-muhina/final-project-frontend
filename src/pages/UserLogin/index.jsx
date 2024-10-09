import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useUserAccount } from '../../contexts/userAccount';
import { LoginContext } from '../../App';
import './UserLogin.css'
import { useNavigate } from 'react-router-dom';


export default function UserLogin({}) { 

 
    // [JavaScript logic code goes here]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [savedData, setSavedData] = useState(null)
    const { setUserAccountData } = useUserAccount()
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken')
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const tokenCreationTime = localStorage.getItem('tokenCreationTime');

    const TOKEN_EXPIRATION_PERIOD = 60 * 60 * 1000;

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const isTokenExpired = () => {
      if (!tokenCreationTime) return true;
      const now = new Date().getTime();
      return now - parseInt(tokenCreationTime, 10) > TOKEN_EXPIRATION_PERIOD;
    };

    useEffect(() => {
      if (token && !isTokenExpired()) {
        setLoggedIn(true);
        console.log("You are logged in");
      } else {
        setLoggedIn(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenCreationTime');
        console.log("Token expired or not logged in");
      }
      
      if (savedData) {
        console.log("User data saved:", savedData);
      }
    }, [token, loggedIn, savedData])

  //   useEffect(() => {
  //     if(!token) {
  //         setLoggedIn(false)
  //         console.log("not loggedin")
  //     }
  //     else{
  //         setLoggedIn(true)
  //         console.log("you are logged in")
  //     }
  //     if (savedData) {
  //       console.log("User data saved:", savedData)}
      
  // }, [token, loggedIn, savedData])

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password)
      if(!email || !password){
        alert('Email and Password cannot be empty')
        return;
      }

      try {
        const response = await fetch(`https://nature-connect-backend.co.uk/users/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log('Response:', response); // Log the full response object

        if (response.ok) {
          const { token } = data
          console.log("what is data", data)
          const username = "Dummy User";
          setUserAccountData({ username, email });
         
          const creationTime = new Date().getTime();
          localStorage.setItem('authToken', token)
          localStorage.setItem('tokenCreationTime', creationTime);

          console.log('Login Successful: ', data);
          navigate('/');
        } 
        else {
          console.error(`Login Failed: ${data.error}`);
          alert('Login failed unable to authenticate user');
        }
        setSavedData({email, password})

      } 
      catch(err) {
        console.error('Failed to login');
        console.log(err)
        alert('An error occured, please try again');
      }
      
      setEmail("")
      setPassword("")
 
    }

      useEffect(() => {
      //handleSubmit()
      if (savedData) {
        console.log("User data saved:", savedData);
        // Additional logic (e.g., sending data to an API) could go here
      }
    }, [savedData])
  

  return (
    <>
        <div className="login-form">
            <h1 className='login-h1'>Login</h1>
            <h3>Have an account?</h3>
            <form onSubmit = {handleSubmit}>
              {/* <label htmlFor="email"> Email</label> */}
              <input value={email} onChange={handleEmailChange} type="email" placeholder="Email" id="Email" name="Email"/>

              {/* <label htmlFor="password"> Password</label> */}
              <input value={password} onChange={handlePasswordChange} type= "password" placeholder="Password" id="password" name="password"/>

              <button type="submit">Login</button>
            </form>
            <h3>Don't have an account?</h3>
            <Link to="/user/signup"><button className='secondbutton-login'>Sign Up</button></Link>
        </div>
    </>
    
  )
};
