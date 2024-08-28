import React, { useState, useEffect} from 'react';


export default function UserLogin() {

    // [JavaScript logic code goes here]
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    // useEffect(() => {
    //   handleSubmit()
    // }, [])

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username)
    };


  return (
    <>
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
              <label htmlFor='username'> Username</label>
              <input value={username} onChange={handleUsernameChange} type='text' id='Username' name='Username'/>

              <label htmlFor='password'> Password</label>
              <input value={password} onChange={handlePasswordChange} type='text' placeholder='password' id='password' name='password'/>

              <button type='submit'>Login</button>
            </form>
            <button>Already have an account</button>
        </div>
    </>
    
  )
}
