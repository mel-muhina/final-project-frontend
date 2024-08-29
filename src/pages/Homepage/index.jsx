import { FeaturedCard, GalleryCard, TagCard } from "../../components"
import './Homepage.css'

export default function Homepage() {



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
