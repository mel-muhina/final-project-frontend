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
    const tempImgApi = [windsor1, windsor2, windsor3];
    const [retryCount, setRetryCount] = useState({}); 

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

    
    // const tempImgApi = [
    //   {  img_url: "https://images.playground.com/422d04b167304b8caf41fd3025857466.jpeg"
    //   }, 
    //   {  img_url: "https://images.playground.com/3907c95374de4fd3a1a09fde9d37e8b3.jpeg"
    //   }, 
    //   {  img_url: "https://images.playground.com/afbf9637cd2a455a8bdfedf10609aff9.jpeg"
    //   }, 
    //   {  img_url: "https://images.playground.com/f471cc4d678946f79e16ed324e353e39.jpeg"
    //   },
    //   { 
    //     img_url: "https://images.playground.com/b75feecdad9e403db035a42dbcbe337c.jpeg"
    //   }
       
    // ]

    // const tempImgs = [
    //   { img_url: {windsor1}
    //   }, 
    //   { img_url: {windsor2}
    //   }, 
    //   { img_url: {windsor3}
    //   }, 
       
    // ]

  

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
        const api = `http://34.239.121.162:3000/locations/image/${LocationId}`
        const response = await fetch(api);
        const data = await response.json();
        // const data = tempApi
        // const imgData = tempImgApi
   

        if (response.ok) {
          const imgData = data
          if (imgData) {
            setLocationsImgArr(imgData)
          } else {
            setLocationsImgArr(tempImgApi)
          }
  
        } else {
          setLocationsImgArr(tempImgApi)

        }

        // setLocationsImgArr(imgData)
  
        
       


    // const filteredData = imgData.map(id => 
    //     imgData.find(img => img.id === id)   

    // 
    
  //   const filteredData = imgData.filter(img => 
  //     randomId.include(img.id)   

  // )

    // console.log(filteredData)

       

    }

      // Handle image error (404 in the browser)
  const handleImageError = (index) => {
    const maxRetries = 3;

    // Track retry count for each image
    if (!retryCount[index]) {
      setRetryCount((prev) => ({ ...prev, [index]: 1 }));
    } else if (retryCount[index] < maxRetries) {
      setRetryCount((prev) => ({ ...prev, [index]: prev[index] + 1 }));
    } else {
      console.error(`Image at index ${index} failed after ${maxRetries} attempts.`);
      const fallbackArr = [...locationsImgArr];
      fallbackArr[index] = tempImgApi[index]; // Replace with fallback image after max retries
      setLocationsImgArr(fallbackArr);
      return;
    }

    // Retry the image fetch by modifying the src to force reload (e.g., append a cache-busting query)
    const newImgArr = [...locationsImgArr];
    newImgArr[index] = `${locationsImgArr[index]}?retry=${retryCount[index]}`; // Modify URL to force refetch
    setLocationsImgArr(newImgArr);
  };

    


  return (
    <>  
        <div className="Whole-Gallery-Container">
            <div className='gallery-Gallery'>
              {/* <h2>Gallery</h2> */}
            </div>
            <div className="gallery-container">
                <h2>Discover Our Gallery</h2> 
                {locationsArr && locationsImgArr?.length > 0 ? (
                locationsImgArr.slice(0, 3).map((img, index) => (
                       <Link to={`/search/${LocationId}`} key={img} >
                        <img src={img} 
                        className="gallery-img"
                        // alt={`gallery image ${index + 1}`}
                        onError={() => handleImageError(index)}
                        />
                        </Link>
                ))
                )
                : <div>
                   <Link to={`/search/${LocationId}`} key="windsor-1" ><img src={windsor1} className="gallery-img"/></Link>
                   <Link to={`/search/${LocationId}`} key="windsor-2" ><img src={windsor2} className="gallery-img"/></Link>
                   <Link to={`/search/${LocationId}`} key="windsor-3" ><img src={windsor3} className="gallery-img"/></Link>
                  </div>
              }
            </div>
        </div>
    </>
  )
}
