import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './TagCard.css'

export default function TagCard() {

    const [ tags, setTags ] = useState([]);

    useEffect(() => {
        populateTags();
    }, [])


        const dummyTags = [
        {
            id: 1,
            tag: "Nature",
        }, {
            id: 2,
            tag: "Hiking",

        }, {
            id: 3, 
            tag: "Active"

        }, {
            id: 4, 
            tag: "Things To Do"
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
                    <h2>Location Tags</h2>
                <ul> 
                        {tags.map(tag => 
                          <li className={tag.tag}> <Link to="">{tag.tag}</Link></li>
                        )}
                    
                </ul>
        </div>
    </>
    
  )
}
