import React from 'react';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import './infoModal.css'

export default function infoModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [savedFact, setSavedFact] = useState([]);
    const { LocationId, setLocationId } = useLocationId();
    
  

    useEffect(() => {
        getFact();
    }, [])

    console.log(savedFact)


    const getFact = async() => {
        try {
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
    
    const formatFact = (savedFact) =>
    {
      
      const facts = savedFact?.facts
      
      const splitFacts = facts.split(/(\d\.\s)/).filter(Boolean)
     
      return splitFacts
    }

    const renderModal = () => 
    {
      return createPortal(
        <div className="modal-backdrop">
            <div className="modal-content">
              <span className="close-modal" onClick={closeModal}>&times;</span>
                    
                {/* {formatFact(savedFact)} */}
                {/* {savedFact?.facts} */}
                {savedFact?.map((part, index) => {
                  const formattedPart = part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

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
            {isModalOpen && renderModal()}
        
    </>
  );
}
