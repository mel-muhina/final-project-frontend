import React, { useState, useEffect, Children } from 'react'
import locationIcon from '../../assets/images/locationicon.png'
import { useFeaturedCardIcon } from '../../contexts'
import './FeaturedCard.css'
import { Link, useParams } from "react-router-dom";
import FeaturedIcon from '../FeaturedIcon'
import { useLocationId, useLocationName } from '../../contexts';

export default function FeaturedCard() {
    const {id} = useParams();
    const [ locationData, setLocationData ] = useState();
    const [ randomId, setRandomId ] = useState();

    const [ savedDescriptionData, setSavedDescriptionData ] = useState([]);
    const { FeaturedCardIcon, setFeaturedCardIcon } = useFeaturedCardIcon();
    // const { LocationId, setLocationId } = useLocationId();
    const { LocationName, setLocationName } = useLocationName();
    const { LocationId } = useLocationId();
    
    useEffect(() => {
        if (LocationId) {
            getLocationData();
        }

    }, [LocationId])


    // async function getRandomId() {
    //     const randomIdGen = Math.floor(Math.random() * 20) +1;
    //     setRandomId(randomIdGen) 
    // }

    const tempApi = {
        "name": "Windsor Great Park", 
        "description": "A vast historic parkland near Windsor Castle, covering over 4,800 acres with a mix of gardens, woodlands, and open spaces. It features landmarks like the Long Walk and Savill Garden, and is known for its scenic trails and resident deer herds.",
        "tag": ["nature", "Quiet", "Scenic"],
        "location_type": "park",
        "place_id": "1",
        "latitiude": "51.42458",
        "longtitude": "-0.617681",
        "rating": "5",
        "address": "SL4 2HT"
    }

    const [ backUpData, setBackUpData ] = useState(tempApi);

    async function getLocationData() {

  

        // setLocationData(tempApi)
        // setSavedDescriptionData(tempApi.description)
        const randomIdGen = Math.floor(Math.random() * 100) +1;
        const api = `http://34.239.121.162:3000/locations/data/${LocationId}`
        const descriptionApi = `http://34.239.121.162:3000/locations/description/${LocationId}`
        const response = await fetch(api);
        const descriptionResponse = await fetch(descriptionApi)
        const data = await response.json();
        const descriptionData = await descriptionResponse.json();
        if (response.ok && descriptionResponse) {
            setLocationData(data)
            setLocationName(data.name)
            console.log("meow", data)
            // setSavedDescriptionData(descriptionData)

            // if (data && descriptionData) {
            //     setLocationData(data)
            //     setSavedDescriptionData(descriptionData)
            //     setLocationName(data.name)
            // } else {
            //     setLocationData(tempApi)
            //     setSavedDescriptionData(tempApi.description)
            // }

            const truncatedName = data.name.length > 23
            ? data.name.slice(0, 23) + "..." 
            : data.name;
            setLocationName(truncatedName)

            const truncatedDescription = descriptionData.length > 220 
            ? descriptionData.slice(0, 220) + "..." 
            : descriptionData;
            setSavedDescriptionData(truncatedDescription);


        } else {
            setBackUpData(tempApi)
            setLocationData(tempApi)
            setSavedDescriptionData(tempApi.description)
        }
        // const descriptionResponse = await fetch(descriptionApi)
        // const data = await response.json();
        // const descriptionData = await descriptionResponse.json();

       
        // const data = tempApi
        // console.log("FeaturedCard Data Check", data.tag[0])
        // if (data && descriptionData) {
        //     setLocationData(data)
        //     setLocationName(data.name)
        //     const truncatedName = LocationName.length > 25 
        //     ? LocationName.slice(0, 23) + "..." 
        //     : LocationName;
        //     setLocationName(truncatedName)

        //     const truncatedDescription = descriptionData.length > 250 
        //     ? descriptionData.slice(0, 250) + "..." 
        //     : descriptionData;
            // if (descriptionData.length > 250) {
            //     const truncatedDescription = descriptionData.slice(0, 250) + "..." 
            //     setSavedDescriptionData(truncatedDescription)
            // } else {
            //     setSavedDescriptionData(descriptionData)
            // }
            // ? 
            // : descriptionData;
            // setSavedDescriptionData(truncatedDescription)
        // } else {
        //     setLocationData(tempApi)
        //     setSavedDescriptionData(tempApi.description)
        // }

  

    }


  return (
    <>
        <div className="FeaturedCard-Container">
            <div className="FeaturedCard-innerContainer">
                <img src={locationIcon} key={locationData?.place_id}className="FeaturedCard-location-icon"/><h2>{LocationName || backUpData?.name}</h2>
                <p>{savedDescriptionData || backUpData?.description }</p>
                <Link to={`/search/${LocationId}`}><button className="FeaturedCard-btn">Visit Here</button></Link>
            </div>
            <div className="FeaturedCard-Icon-Container">
                <FeaturedIcon tag={locationData?.tag_name}/>
                {/* <FeaturedIcon tag={nature} */}
            </div>
        </div>
      
    </>
  )
}
