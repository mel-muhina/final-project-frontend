import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useUserAccount } from '../../contexts/userAccount';
import { LoginContext } from '../../App';


export default function UserLogin({}) { 

 
    // [JavaScript logic code goes here]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [savedData, setSavedData] = useState(null)
    const { setUserAccountData } = useUserAccount()
    const [loggedIn, setLoggedIn] = useContext(LoginContext )



    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password)
      if(!email || !password){
        alert('Email and Password cannot be empty')
        return;
      }

      try {
        const response = await fetch(`http://54.89.47.53:3000/users/login`, {
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
          const username = "Dummy User";
          setUserAccountData({ username, email });
          setLoggedIn(true)
          console.log(loggedIn)
          localStorage.setItem('authToken', token)

          console.log('Login Successful: ', data);
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
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
              <label htmlFor="email"> Email</label>
              <input value={email} onChange={handleEmailChange} type="email" id="Email" name="Email"/>

              <label htmlFor="password"> Password</label>
              <input value={password} onChange={handlePasswordChange} type= "password" placeholder="password" id="password" name="password"/>

              <button type="submit">Login</button>
            </form>
            <Link to="/user/signup"><button>Dont have an account? Sign Up</button></Link>
        </div>
    </>
    
  )
};
