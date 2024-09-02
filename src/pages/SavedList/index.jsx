import React, { useState, useEffect } from 'react';
import SavedList from '../../components/SavedList';


const savedItems = [{ 

    place_id: 1,
    name: 'Hyde Park',
    location_type: 'park',
    description: 'A major park in central London.',
    position: {lat: 51.507268, long: -0.165730},
    address: 'London W2 2UH, UK',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hyde_Park_from_air.jpg/640px-Hyde_Park_from_air.jpg',
    tag_id: 1},

    { 
    place_id: 2,
    name: 'finsbury Park',
    location_type: 'park',
    description: 'A major park in north London.',
    position: {lat: 51.5646, long: -0.1047},
    address: 'London N4 1EE',
    image_url: 'https://en.wikipedia.org/wiki/Finsbury_Park#/media/File:Finsbury_Park_-_geograph.org.uk_-_681145.jpg',
    tag_id: 1},

]


export default function SavedListPage({}) {

    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        setSavedItems(savedData)
    })

    return(
        
        <div className='saved-list-container'>
            <SavedList items = {savedItems} />
        </div>

    )
}