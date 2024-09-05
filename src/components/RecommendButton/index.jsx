import React from 'react';
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import Notification from '../Notification';



export default function RecommendButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
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
    

