import React from 'react';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import './infoModal.css'
import defaultPic from '../../assets/images/bg5.jpg'

export default function infoModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [savedFact, setSavedFact] = useState([]);
    const [locationImage, setLocationImage] = useState('')
    const { LocationId, setLocationId } = useLocationId();

    console.log(LocationId)
    
  

    useEffect(() => {
      
        getFact();
        getImage();
      
    }, [])


    const getFact = async() => {
        try {

            console.log(LocationId)
            //const token = localStorage.getItem('authToken')
            const response = await fetch(`http://34.239.121.162:3000/name/getFacts/${LocationId}`, {
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
            console.log(LocationId)
              //const token = localStorage.getItem('authToken')
              const response = await fetch(`http://34.239.121.162:3000/locations/data/${LocationId}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json'}
                })
                const data = await response.json();
                
                if (response.ok) {
                  // console.log(data)
                  const locationData = data?.image_url[0];
                  // console.log(locationData)
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
      return createPortal(
        <div className="info-modal-backdrop" onClick={closeModal}>
          <div className="info-modal-content" >
            <span className="info-close-modal" onClick={closeModal}>&times;</span>
                    
                {/* {formatFact(savedFact)} */}
                {/* {savedFact?.facts} */}
                <img src = {locationImage} className='location-image' onError={(e) => {
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
            {console.log(isModalOpen)}
        
    </>
  );
}
