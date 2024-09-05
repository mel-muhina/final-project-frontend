import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import Notification from './Notification';


function Modal({ onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
      </div>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
}


export default function LocationModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const token = localStorage.getItem('authToken')
    const [savedReminder, setReminder] = useState();
    const [savedFact, setFact] = useState();
    const [LikeAmount, setLikeAmount] = useState();
    const { LocationId, setLocationId } = useLocationId();
    
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        getFact();
        getReminder();
        getLikes();
    console.log("beep",LocationId)
    }, [LocationId])

    const handleRecommend = () => {
      setShowNotification(true);
      //Notification()  //
    };
  
    const handleSave = async () => {
        
        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/users/save', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
            body:JSON.stringify({"place_id":LocationId}),
            })
            const data = await response.json();
            
            if (response.ok) {
                
                console.log('Item saved successfully!', data);
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to save item: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error saving item:');
            console.log(err)
            }
        }

    const handleLike = async() => {

        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/api/places/1/like', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
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
            console.error('Error liking item:');
            console.log(err)
            }
    }

    const handleDislike = async() => {

      try {
          //const token = localStorage.getItem('authToken')
          const response = await fetch('http://54.89.47.53:3000/api/places/1/dislike', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${token}`},
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
    

    


  // if (!isOpen) return null;

  return (
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <button className="close-button" onClick={onClose}>
    //       &times;
    //     </button>
    //     {children}
    //   </div>
    // </div>
    <>
        <div className="location-modal-container">
          {/* <button onClick={openModal}>Open Modal</button> */}

          <Modal isOpen={isModalOpen} onClose={closeModal}>

              <div className='Fact-container'>
                  <p>{savedFact}</p>
              </div>
              <div className='Reminder-container'>
                  <p>{savedReminder}</p>
              </div>

              <button className='save-button' onClick={handleSave}>Save</button>
              <button className='recommend-button'onClick={handleRecommend}>Recommend</button>
              <p>Likes: {LikeAmount}</p>
              <button className='like-button' onClick={handleLike}>Like</button>

              {showNotification && <Notification />}
          </Modal>
        </div>
    </>
  );
}
