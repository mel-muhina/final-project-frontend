import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './UserSignUp.css'
import { useNavigate } from 'react-router-dom';


export default function UserSignUp() { 

    // [JavaScript logic code goes here]
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [savedData, setSavedData] = useState(null)
    const navigate = useNavigate();
    const tokenCreationTime = localStorage.getItem('tokenCreationTime');

    const TOKEN_EXPIRATION_PERIOD = 60 * 60 * 1000;

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password)
      if(!email || !password || !username){
        alert('Cannot be left empty')
        return;
      }

      try {
        const response = await fetch('http://34.239.121.162:3000/users/register', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify({ email, username, password }),
        })
        const data = await response.json();

        if (response.ok) {
          const { token } = data
          const creationTime = new Date().getTime();
          localStorage.setItem('authToken', token)
          localStorage.setItem('tokenCreationTime', creationTime);
          console.log('Signup Successful: ', data);
          navigate('/');
        } else {
          console.error(`Signup Failed: ${data.error}`);
          alert('SignUp failed please try again ');
        }
        setSavedData({email, username, password})
        setEmail("")
        setPassword("")
      } catch(err) {
        console.error('Failed to signup');
        alert('An error occured, please try again');
      }
      

 
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
        <div className='login-form'>
            <h1>Sign Up</h1>
            <form onSubmit = {handleSubmit}>
              <label htmlFor="email"> Email</label>
              <input value={email} onChange={handleEmailChange} type="email" placeholder="Email" id="Email" name="Email"/>

              <label htmlFor="username"> Username</label>
              <input value={username} onChange={handleUsernameChange} type="text" placeholder="Username"  id="Username" name="Username"/>

              <label htmlFor="password"> Password</label>
              <input value={password} onChange={handlePasswordChange} type= "password" placeholder="Password" id="password" name="password"/>

              <button type="submit">Sign Up</button>
            </form>
            <Link to="/user/login"><button>Already have an account? Login</button></Link>
        </div>
    </>
    
  )
};
