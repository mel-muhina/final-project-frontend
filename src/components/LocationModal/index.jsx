import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import RecommendButton from "../RecommendButton";
import LikeButton from "../LikeButton";
import SaveButton from '../SaveButton';
import InfoModal from '../InfoModal';
import './LocationModal.css'

export default function LocationModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [savedReminder, setReminder] = useState();
    const [savedFact, setSavedFact] = useState([]);
    const [LikeAmount, setLikeAmount] = useState();
    const { LocationId, setLocationId } = useLocationId();
    
  

    useEffect(() => {
        // getFact();
        getReminder();
        // getLikes();
    }, [])

    //  const LocationId = 1
    // console.log(savedFact)


    // const getFact = async() => {
    //     try {
    //         //const token = localStorage.getItem('authToken')
    //         const response = await fetch(`http://34.239.121.162:3000/name/getFacts/${LocationId}`, {
    //           method: 'GET',
    //           headers: {
    //             'content-type': 'application/json'}
    //           })
    //           const data = await response.json();
              
    //           if (response.ok) {
    //             const facts = formatFact(data)
    //             setSavedFact(facts);
                
    //             // Optionally, handle UI updates or further actions
    //         } else {
    //             console.error(`Failed to retrieve fact: ${data.error}`);
                
    //         }
    //         } catch (err) {
    //         console.error('Error retrieving items:');
    //         console.log(err)
    //         }
    //     }
    
    // const formatFact = (savedFact) =>
    // {
      
    //   const facts = savedFact?.facts
      
    //   const splitFacts = facts.split(/(\d\.\s)/).filter(Boolean)
     
    //   return splitFacts
    // }



    // const getLikes = async() => {
    //   try {
    //       //const token = localStorage.getItem('authToken')
    //       const response = await fetch('http://34.239.121.162:3000/api/places/1/likes', {
    //         method: 'GET',
    //         headers: {
    //           'content-type': 'application/json',
    //           'Authorization': `Bearer ${token}`},
    //           body:JSON.stringify({"place_id":LocationId}),
    //         })
    //         const data = await response.json();
            
    //         if (response.ok) {
    //           setLikeAmount(data.like_count);
    //           // Optionally, handle UI updates or further actions
    //       } else {
    //           console.error(`Failed to retrieve reminder: ${data.error}`);
              
    //       }
    //       } catch (err) {
    //       console.error('Error retrieving items:');
    //       console.log(err)
    //       }
    //   }  


      const getReminder = async() => {
        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch(`http://34.239.121.162:3000/name/getInfoById/${LocationId}`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                // 'Authorization': `Bearer ${token}`} 
              }
          
              })
              const data = await response.json();
              
              if (response.ok) {
                setReminder(data.reminder_text);
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


              <div className='Reminder-container'>
                  <p>Reminder: {savedReminder}</p>
              </div>

            <SaveButton/>
            <RecommendButton LocationId={LocationId}/>
            <InfoModal/>
            {/* <p>Likes: {LikeAmount}</p>
            <LikeButton/> */}

        </div>
    </>
  );
}
