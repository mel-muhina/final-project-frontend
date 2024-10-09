import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';


export default function LikeButton() {

    const token = localStorage.getItem('authToken')
    const { LocationId, setLocationId } = useLocationId();

    useEffect(() => {
    console.log("beep",LocationId)
    handleLike()
    }, [LocationId])

    const handleLike = async() => {

        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('https://nature-connect-backend.co.uk/api/places/1/like', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'},
                // 'Authorization': `Bearer ${token}`},
              body:JSON.stringify({"place_id":LocationId}),
              })
              const data = await response.json();
              
              if (response.ok) {
                
                console.log('liked successfully!', data);
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to like location: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error liking item:')
            console.log(err)
            }
    }

    const handleDislike = async() => {

      try {
          //const token = localStorage.getItem('authToken')
          const response = await fetch('https://nature-connect-backend.co.uk/api/places/1/dislike', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'},
              // 'Authorization': `Bearer ${token}`},
            body:JSON.stringify({"place_id":LocationId}),
            })
            const data = await response.json();
            
            if (response.ok) {
              
              console.log('Disliked!', data);
              // Optionally, handle UI updates or further actions
          } else {
              console.error(`Failed to Dislike location: ${data.error}`);
              
          }
          } catch (err) {
          console.error('Error disliking item:');
          console.log(err)
          }
  }

//   const likeDecision = () => {
//     if 
//   }

  return (

    <>
              
        <button className='like-button' onClick={handleLike}>Like</button>

              
    </>
  );
}

  