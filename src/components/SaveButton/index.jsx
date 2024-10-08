import React from "react";
import { useState, useEffect } from 'react';
import { useLocationId } from '../../contexts';
import './SaveButton.css';



export default function SaveButton() {
    const { LocationId, setLocationId } = useLocationId();
    const [ isToggled, setIsToggled ] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }


    const handleSave = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const response = await fetch('https://nature-connect-backend.co.uk/users/save', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`},
        body:JSON.stringify({"place_id":LocationId}),
        })
        const data = await response.json();
        
        if (response.ok) {
            handleToggle();
            // Optionally, handle UI updates or further actions
        } else {
            console.error(`Failed to save item: ${data.error}`);
            handleToggle();
            
        }
        } catch (err) {
        console.error('Error saving item:');
        console.log(err)
        }
    }

        return (
            <>
                
                <button className={`save-button ${isToggled ? "toggled" : ""}`} onClick={handleSave}>{isToggled ? "Saved" : "Save"}</button>      
                
            </>
          );
        
        
    }
