import React, { useEffect, useState } from 'react'
import GetNotifications from '../GetNotifications'
import './Notification.css'


export default function Notification() {
    const [saveRecommend, setSaveRecommend] = useState('')
    const [recommendedUser, setRecommendedUser] = useState('')
    const [recommendedLocation, setRecommendedLocation] = useState('')
    const [chosenMessage, setChosenMessage] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const token = localStorage.getItem('authToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const authToken = import.meta.env.VITE_AUTHORIZATION;

    function handleInput(e) {
        setRecommendedUser(e.target.value)
    }

    function handleLocation(e) {
        setRecommendedLocation(e.target.value)
    }

    function handleMessage(e) {
        setChosenMessage(e.target.value)
    }

    async function recommend(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://54.89.47.53:3000/users/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
                body: JSON.stringify({
                    username: recommendedUser,
                    place_id: recommendedLocation,
                    message: chosenMessage
                })
            });
    
            const data = await response.json();
            setSaveRecommend(data)
            console.log("What is data", data)
            setRecommendedUser('')
            setRecommendedLocation('')
            setChosenMessage('')
            console.log("response", data.message)
            setResponseMessage(data.message)

    } catch (err) {
        console.log("Error", err)
    }
}

  return (
    <>       
        <div className='notification-p'>
          <p>{responseMessage }</p>
        </div>
        <form onSubmit={recommend} className="notification-form-container">
                <div className="notification-form-innerform">
                    <input placeholder="Recommend Username" name="recommendedUser" value={recommendedUser} type="text" className="text" onChange={handleInput} required />
                    <input placeholder="Location Recommended" name="recommendedLocation" value={recommendedLocation} type="text" className="text" onChange={handleLocation} required />
                    <select id="message" name="message" value={chosenMessage} onChange={handleMessage} required>
                    <option value="" disabled>Select Message</option>
                        <option value="You Should Check This Out!">You Should Check This Out!</option>
                        <option value="I Love It Here!">I Love It Here!</option>
                        <option value="This is one of my favourites.">This is one of my favourites.</option>
                        <option value="I'm recommending this to you.">I'm recommending this to you.</option>
                    </select>
                </div>
                <div>
                </div>
                <div>
                    <button type="submit" className="notification-recommend-button">Send Recommendation</button>
                </div>
         </form>
 
    </>
  )
}
