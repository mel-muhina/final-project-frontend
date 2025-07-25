import React from 'react';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import './InfoModal.css'
import defaultPic from '../../assets/images/default.jpg'

export default function infoModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [savedFact, setSavedFact] = useState([]);
    const [locationImage, setLocationImage] = useState('')
    const { LocationId, setLocationId } = useLocationId();    
  

    useEffect(() => {
      if (LocationId) {
        getFact();
        getImage();
      }
    }, [LocationId]);


    const getFact = async() => {
        try {

            //const token = localStorage.getItem('authToken')
            const response = await fetch(`https://nature-connect-backend.co.uk/name/getFacts/${LocationId}`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json'}
              })
              const data = await response.json();
              
              if (response.ok) {
                const facts = formatFact(data)
                setSavedFact(facts);
                
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve fact: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving items:');
            console.log(err)
            }
        }
    
        const getImage = async() => {
          try {
              //const token = localStorage.getItem('authToken')
              const response = await fetch(`https://nature-connect-backend.co.uk/locations/data/${LocationId}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json'}
                })
                const data = await response.json();
                
                if (response.ok) {
                  const locationData = data?.image_url[0];
                  setLocationImage(locationData);
                  
                  
              } else {
                  console.error(`Failed to retrieve image: ${data.error}`);
                  
              }
              } catch (err) {
              console.error('Error retrieving items:');
              console.log(err)
              }
          }
      
    const formatFact = (savedFact) =>
    {
      
      const facts = savedFact?.facts
      
      const splitFacts = facts.split(/(\d\.\s)/).filter(Boolean)
     
      return splitFacts
    }

    const RenderModal = () => 
    {
      console.log(LocationId)
      return createPortal(
        <div className="info-modal-backdrop" onClick={closeModal}>
          <div className="info-modal-content" >
            <span className="info-close-modal" onClick={closeModal}>&times;</span>
                    
                {/* {formatFact(savedFact)} */}
                {/* {savedFact?.facts} */}
                <img src = {locationImage} className='locationImage' onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = defaultPic; 
                  }}/>
                {savedFact?.map((part, index) => {

                  const formattedPart = part
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^##(.*)$/gm, '<em>$1</em>');
                  
                  return (
                    <p key={index} dangerouslySetInnerHTML={{ __html: formattedPart }} />
                  )
                  })}
                    
              </div>
              </div>,
              document.getElementById('modal-root')
      )
    }

  return (
    <>
        <div className="Info-modal-container">
            <button onClick={openModal}>More Info</button>
        </div>
            {isModalOpen && <RenderModal/>}
        
    </>
  );
}
