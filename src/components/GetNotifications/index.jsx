import { useEffect, useState } from "react"
import './GetNotifications.css'

export default function GetNotifications() {
    const [saveRecommend, setSaveRecommend] = useState([])
    const [recommendingUser, setRecommendingUser] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [message, setMessage] = useState('')
    const authToken = import.meta.env.VITE_AUTHORIZATION;
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (token) {
            getRecommended(token);
        }
    }, [token])

     async function getRecommended(token) {
        // e.preventDefault();
        try {
            const response = await fetch(`http://34.239.121.162:3000/users/recommendations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
             
            });
    
            const data = await response.json();
            setSaveRecommend(data.recommendations)
            

    } catch (err) {
        console.log("Error", err)
    }
}
  return (
   <>

   <div className="notification-outer-container">
    {token ? ( 
      saveRecommend.map(recommended => (
        <div className="notification-container" key={recommended.recommendation_id}>
            <ul>
                <li>
                    <p>Message: {recommended?.message}</p>
                    <p>Recommended Location: {recommended?.name}</p>
                    <p>Recommended By: {recommended?.recommender_username}</p>
                </li>
            </ul>
          
        </div>
      ))
    ) : (
         <div className="notification-container-login">
        <p>Please login to access notifcations</p>
        </div>
    )}

    
    </div> 
   </>
  )
}
