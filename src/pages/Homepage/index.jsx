import { useState, useEffect } from "react"
import { FeaturedCard, GalleryCard, TagCard } from "../../components"
import './Homepage.css'
import { useLocationId } from '../../contexts';

export default function Homepage() {
const [randomId, setRandomId] = useState();
const { LocationId, setLocationId } = useLocationId();

useEffect(() => {
  const randomIdGen = Math.floor(Math.random() * 100) +1;
  setLocationId(randomIdGen)
 }, [])  


  return (
    <>
      <div className="homepage-container">
          <FeaturedCard />
          <div className="homepage-gallery-container">

            <GalleryCard randomId={LocationId}/>
          </div>
          <div className="homepage-tags-container">
             <TagCard />
          </div>
      </div>
  
    </>
  )
}
