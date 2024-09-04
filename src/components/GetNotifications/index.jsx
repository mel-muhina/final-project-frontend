import { useEffect, useState } from "react"
import './GetNotifications.css'

export default function GetNotifications() {
    const [saveRecommend, setSaveRecommend] = useState([])
    const [recommendingUser, setRecommendingUser] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [message, setMessage] = useState('')
    const authToken = import.meta.env.VITE_AUTHORIZATION;

    useEffect(() => {
        getRecommended();
    }, [])

     async function getRecommended(e) {
        // e.preventDefault();
        try {
            const response = await fetch(`http://54.89.47.53:3000/users/recommendations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
             
            });
    
            const data = await response.json();
            console.log("data", data)
            setSaveRecommend(data.recommendations)
            

    } catch (err) {
        console.log("Error", err)
    }
}
  return (
   <>
   {/* <button onClick={getRecommended}>Meow</button> */}
   <div className="notification-outer-container">
      {saveRecommend.map(recommended => 
        <div className="notification-container" key={recommended.recommendation_id}>
            <ul>
                <li>
                    <p>Message: {recommended?.message}</p>
                    <p>Recommended Location: {recommended?.place_name}</p>
                    <p>Recommended By: {recommended?.recommender_username}</p>
                </li>
            </ul>
          
        </div>
    )}
        {/* <div className="notification-container" key={saveRecommend.recommendation_id}>
            <ul>
                <li>
                    <p>Message: {saveRecommend?.message}</p>
                    <p>Recommended Location: {saveRecommend?.place_name}</p>
                    <p>Recommended By: {saveRecommend?.recommender_username}</p>
                </li>
            </ul>
          
        </div> */}
    </div> 
   </>
  )
}
