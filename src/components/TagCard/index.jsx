import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './TagCard.css'
import tagNotification from '../../assets/images/noti.png'

export default function TagCard() {

    const [ tags, setTags ] = useState([]);

    useEffect(() => {
        populateTags();
    }, [])


        const dummyTags = [
        {
            id: 1,
            tag: "Woodlands",
        }, {
            id: 2,
            tag: "Hiking",
        }, {
            id: 3, 
            tag: "Beach"
        }, {
            id: 4, 
            tag: "Camping"
        }, {
            id: 5, 
            tag: "Park"
        },  {
            id: 6, 
            tag: "Garden"
        }             
        ]
    
    async function populateTags() {
        // const api = `http://54.89.47.53:3000/locations/images/${randomId}`
        // const response = await fetch(api);
        // const data = await response.json();
        const data = dummyTags
        // console.log("data", data)
        setTags(data)

    }

  return (
    <>  
        <div className="tags-container">
                    <div className='tags-title'>
                        <h2>Location Tags</h2>
                        <img src={tagNotification} className='tags-notification'></img>   
                    </div>
                <ul> 
                        {tags.map(tag => 
                          <li className={tag.tag} key={tag.tag}> <Link to={`search/${tag.tag}`}>{tag.tag}</Link></li>
                        )}
                     
                </ul>
        </div>
    </>
    
  )
}
