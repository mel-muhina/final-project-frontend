import { useState, useEffect } from "react"
import { FeaturedCard, GalleryCard, TagCard } from "../../components"
import './Homepage.css'
import { useLocationId, useLocationName } from '../../contexts';

export default function Homepage() {
const [randomId, setRandomId] = useState();
const { LocationId, setLocationId } = useLocationId();
const { LocationName, setLocationName } = useLocationName();

useEffect(() => {
  const randomIdGen = Math.floor(Math.random() * 100) +1;
  setLocationId(randomIdGen)
  console.log(LocationName)
 }, [])  


  return (
    <>
      <div className="homepage-container">
        <div className="featured-card">
          <FeaturedCard />
          </div>
          <div className="homepage-gallery-container">
            <GalleryCard />
          </div>
          <div className="homepage-tags-container">
             <TagCard />
          </div>
      </div>
  
    </>
  )
}
