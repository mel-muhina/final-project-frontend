import React from 'react'
import locationIcon from '../../assets/images/locationicon.png'
import deer from '../../assets/images/deer.png'
import './FeaturedCard.css'
import { Link } from "react-router-dom";

export default function FeaturedCard() {

    async function getLocationData() {
        const api = ``
        const response = await fetch(api);
        const data = await response.json();

    }


  return (
    <>
        <div className="FeaturedCard-Container">
            <div className="FeaturedCard-innerContainer">
                <img src={locationIcon}/><h2>Windsor Great Park</h2>
                <p>A vast historic parkland near Windsor Castle, covering over 4,800 acres with a mix of gardens, woodlands, and open spaces. It features landmarks like the Long Walk and Savill Garden, and is known for its scenic trails and resident deer herds.</p>
                <Link to={`/user/login`}><button>Visit Here</button></Link>
            </div>
            <div>
                <img src={deer} />
            </div>
        </div>
      
    </>
  )
}
