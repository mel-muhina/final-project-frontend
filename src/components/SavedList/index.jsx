import React from 'react';

export default function SavedList({ images }) {
    return (
        <div className='saved-list'>
            <h1>Saved List</h1>
            <div className='images'>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className='location-image'>
                            <img src = {image.url} alt={`saved ${index}`} />
                        </div>
                    ))
                ) : (
                    <p>No locations saved</p>
                )}
            </div>
        </div>
    )
}