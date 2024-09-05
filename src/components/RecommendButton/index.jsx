import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import Notification from '../Notification';
import './RecommendButton.css'

function Modal({ isOpen,onClose, children }) {

  if (!isOpen) {
    return null; 
  }
  
  return (
    <div className="recommend-modal-backdrop">
      <div className="recommend-modal-content">
        {children}
      <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


export default function RecommendButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);
    const { LocationId, setLocationId } = useLocationId();

  
    return (
        <>
        <button className='recommend-button' onClick={openModal}>Recommend</button>  
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Notification />
        </Modal>
        </>
      );
    }
    

