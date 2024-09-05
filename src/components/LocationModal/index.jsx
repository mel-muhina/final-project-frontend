import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import RecommendButton from "../RecommendButton";
import LikeButton from "../LikeButton";
import SaveButton from '../SaveButton';


// function Modal({ onClose, children }) {
//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content">
//         {children}
//       </div>
//       {/* <button onClick={onClose}>Close</button> */}
//     </div>
//   );
// }


export default function LocationModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const token = localStorage.getItem('authToken')
    const [savedReminder, setReminder] = useState();
    const [savedFact, setFact] = useState();
    const [LikeAmount, setLikeAmount] = useState();
    const { LocationId, setLocationId } = useLocationId();
    
  

    useEffect(() => {
        // getFact();
        // getReminder();
        // getLikes();
    console.log("beep",LocationId)
    }, [LocationId])


  


    const getFact = async() => {
        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/name/getFacts/2', {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body:JSON.stringify({"place_id":LocationId}),
              })
              const data = await response.json();
              
              if (response.ok) {
                setFact(data.facts);
                
                console.log(savedFact)
                console.log('Fact retrieved successfully!');
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve fact: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving items:');
            console.log(err)
            }
        }  



    const getLikes = async() => {
      try {
          //const token = localStorage.getItem('authToken')
          const response = await fetch('http://54.89.47.53:3000/api/places/1/likes', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${token}`},
              body:JSON.stringify({"place_id":LocationId}),
            })
            const data = await response.json();
            
            if (response.ok) {
              setLikeAmount(data.like_count);
              console.log(LikeAmount)
              console.log('Reminder retrieved successfully!');
              // Optionally, handle UI updates or further actions
          } else {
              console.error(`Failed to retrieve reminder: ${data.error}`);
              
          }
          } catch (err) {
          console.error('Error retrieving items:');
          console.log(err)
          }
      }  


      const getReminder = async() => {
        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/name/getInfoById/2', {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body:JSON.stringify({"place_id":LocationId}),
              })
              const data = await response.json();
              
              if (response.ok) {
                setReminder(data.reminder_text);
                console.log(savedReminder)
                console.log('Reminder retrieved successfully!');
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve reminder: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving items:');
            console.log(err)
            }
        }  

  

  return (
    <>
        <div className="location-modal-container">

              <div className='Fact-container'>
                  <p>{savedFact}</p>
              </div>
              <div className='Reminder-container'>
                  <p>{savedReminder}</p>
              </div>

            <SaveButton/>
            {/* <RecommendButton/> */}
            {/* <p>Likes: {LikeAmount}</p> */}
            {/* <LikeButton/> */}

        </div>
    </>
  );
}
