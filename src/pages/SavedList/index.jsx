import React from 'react';
import { useState, useEffect } from 'react';

import SavedList from '../../components/SavedList';



export default function SavedListPage({}) {
    
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {

        getSaved();
    }, [])
    
    const getSaved = async () => {
    
        try {
            const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/users/retrieve', {
              method: 'GET',
              headers: {
                
                'Authorization': `Bearer ${token}`}
              })
              const data = await response.json();
              
              if (response.ok) {
                const savedLocations = data.savedLocations || [];
                setSavedItems(savedLocations)
                console.log(savedLocations)
                console.log('Items retrieved successfully!');
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve items: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving items:');
            console.log(err)
            }
        }
    
    return(

        <div className='save-page'>
            <div className='saved-list-container'>
                <SavedList items = {savedItems} />
            </div>
        </div>
    )

}
