import React from 'react'
import { useState, useEffect } from 'react';
import './GalleryCard.css'
import { Link } from "react-router-dom";
import windsor1 from '../../assets/images/windsor1.jpg'
import windsor2 from '../../assets/images/windsor2.webp'
import windsor3 from '../../assets/images/windsor3.jfif'
import WeatherComponent from '../WeatherComponent';
import { useLocationId, useLocationName } from '../../contexts';

export default function GalleryCard() {
    const [ locationsArr, setLocationsArr ] = useState([]);
    const [ locationsImgArr, setLocationsImgArr ] = useState([]);
    const [ randomId, setRandomId ] = useState();
    const [ backupImg, setBackupImg ] = useState([])
    const { LocationId } = useLocationId();
    const { LocationName, setLocationName } = useLocationName();

    useEffect(() => {
       generateId();
      //  setLocationsImgArr(tempImgApi)
      
    }, [])   

    useEffect(() => {
      if (LocationId) {
        populateLocations();
      }
     }, [LocationId])  

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

    
    const tempImgApi = [
      {  id: 1,
        img_url: "https://images.playground.com/422d04b167304b8caf41fd3025857466.jpeg"
      }, 
      {  id: 2,
        img_url: "https://images.playground.com/3907c95374de4fd3a1a09fde9d37e8b3.jpeg"
      }, 
      {  id: 3,
        img_url: "https://images.playground.com/afbf9637cd2a455a8bdfedf10609aff9.jpeg"
      }, 
      {  id: 4,
        img_url: "https://images.playground.com/f471cc4d678946f79e16ed324e353e39.jpeg"
      },
      {  id: 5,
        img_url: "https://images.playground.com/b75feecdad9e403db035a42dbcbe337c.jpeg"
      }
       
    ]

    const tempImgs = [
      {  id: 1,
        img_url: {windsor1}
      }, 
      {  id: 2,
        img_url: {windsor2}
      }, 
      {  id: 3,
        img_url: {windsor3}
      }, 
       
    ]

    async function generateId() {
        // const newIds = []
        // let i = 1;
        // while (i < 4) {
        //     const randomIdGen = Math.floor(Math.random() * 5) +1;
        //     // setLocationsArr(prevArr => [...prevArr, randomIdGen])
        //     newIds.push(randomIdGen)
        //     i++
        // }
        const randomIdGen = Math.floor(Math.random() * 100) +1;
        setRandomId(randomIdGen)
        setBackupImg(tempImgApi)
        // setLocationsArr(newIds)
    }

    async function populateLocations() {
        const api = `http://54.89.47.53:3000/locations/image/${LocationId}`
        const response = await fetch(api);
        const data = await response.json();
        console.log("data",data)
        // const data = tempApi
        // const imgData = tempImgApi
   

        if (response.ok) {
          const imgData = data
   

          if (imgData.length < 3) {
            setLocationsImgArr(tempImgApi)
          } else {
            setLocationsImgArr(imgData)
          }
  
        } else {
          setLocationsImgArr(tempImgApi)

        }

        setLocationsImgArr(imgData)
  
        
       


    // const filteredData = imgData.map(id => 
    //     imgData.find(img => img.id === id)   

    // 
    
  //   const filteredData = imgData.filter(img => 
  //     randomId.include(img.id)   

  // )

    // console.log(filteredData)

       

    }

    


  return (
    <>  
        <div className="Whole-Gallery-Container">
            <div className='gallery-Gallery'>
              {/* <h2>Gallery</h2> */}
            </div>
            <div className="gallery-container">
                <h2>Gallery</h2> 
                {locationsImgArr.slice(0, 3).map(img => (
                       <Link to={`/search/${LocationId}`} key={img} ><img src={img} className="gallery-img"/></Link>
                ))
                }
            </div>
        </div>
    </>
  )
}
