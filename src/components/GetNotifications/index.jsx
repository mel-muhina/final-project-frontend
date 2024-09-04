import { useEffect, useState } from "react"
import './GetNotifications.css'

export default function GetNotifications() {
    const [saveRecommend, setSaveRecommend] = useState([])
    const [recommendingUser, setRecommendingUser] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [message, setMessage] = useState('')

     async function getRecommended(e) {
        // e.preventDefault();
        try {
            const response = await fetch(`http://54.89.47.53:3000/users/recommendations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOCwiaWF0IjoxNzI1Mzk5Mjc3LCJleHAiOjE3MjU0MDI4Nzd9.3mSTGmJT7AZRlO_wiN5vLDuuoyPdZYU7_KzSt3UcCJM'
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
   <button onClick={getRecommended}>Meow</button>
      {saveRecommend.map(recommended => 
        <div className="notification-container" key={recommended.recommendation_id}>
            <p>Message: {recommended?.message}</p>
            <p>Recommended Location: {recommended?.place_name}</p>
            <p>Recommended By: {recommended?.recommender_username}</p>
        </div>
      )}
   </>
  )
}
