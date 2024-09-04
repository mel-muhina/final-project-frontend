import { useState, useEffect } from "react"
import { FeaturedCard, GalleryCard, TagCard } from "../../components"
import './Homepage.css'
import { useLocationId } from '../../contexts';

export default function Homepage() {
const { setLocationId } = useLocationId();

useEffect(() => {
  const randomIdGen = Math.floor(Math.random() * 100) +1;
  setLocationId(randomIdGen)
 }, [])  


  return (
    <>
      <div className="homepage-container">
          <FeaturedCard />
          <GalleryCard />
          <div className="homepage-tags-container">
             <TagCard />
          </div>
      </div>
  
    </>
  )
}
