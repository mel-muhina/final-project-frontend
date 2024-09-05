import React from 'react';

export default function SavedList({ items }) {
    return (
        <div className='saved-list'>
            <h2>Saved List</h2>
            <div className='saved-items'>
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className='location-item'>
                            <img src = {item.image_url} alt={item.name} className='location-image' />
                            <h3>{item.name}</h3>
                            <p>{item.address}</p>
                            <p>{item.location_type}</p>
                            <p>{item.description}</p>
                            
                        </div>
                    ))
                ) : (
                    <p>No locations saved</p>
                )}
            </div>
        </div>
    )
}