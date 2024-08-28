import React, { useState, useEffect } from 'react'
import locationIcon from '../../assets/images/locationicon.png'
import { useFeaturedCardIcon } from '../../contexts'
import './FeaturedCard.css'
import { Link, useParams } from "react-router-dom";
import FeaturedIcon from '../FeaturedIcon'

export default function FeaturedCard() {
    const {id} = useParams();
    const [ locationData, setLocationData ] = useState();
    const [ randomId, setRandomId ] = useState();
    const { FeaturedCardIcon, setFeaturedCardIcon } = useFeaturedCardIcon();

    useEffect(() => {
        getLocationData();
        // console.log("FeaturedCard UseEffect", randomId)
        // console.log("Location data", locationData)
    }, [])    

    async function getLocationData() {
        const randomIdGen = Math.floor(Math.random() * 1000) +1;
        setRandomId(randomIdGen) 

        const tempApi = {
            "place_name": "Windsor Great Park", 
            "description": "A vast historic parkland near Windsor Castle, covering over 4,800 acres with a mix of gardens, woodlands, and open spaces. It features landmarks like the Long Walk and Savill Garden, and is known for its scenic trails and resident deer herds.",
            "tag": ["nature", "Quiet", "Scenic"],
            "location_type": "park",
            "place_id": "1",
            "latitiude": "123",
            "longtitude": "123",
            "rating": "5",
            "address": "SL4 2HT"
        }

        const api = `http://54.89.47.53:3000/locations/data/${randomId}`
        // const response = await fetch(api);
        // const data = await response.json();
        const data = tempApi
        // console.log("FeaturedCard Data Check", data.tag[0])
        setLocationData(data)

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
                <FeaturedIcon tag={locationData?.location_type}/>
            </div>
        </div>
      
    </>
  )
}
