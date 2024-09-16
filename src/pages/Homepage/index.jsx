import { useState, useEffect, useContext } from "react"
import { FeaturedCard, GalleryCard, TagCard } from "../../components"
import './Homepage.css'
import { useLocationId, useLocationName } from '../../contexts';
import { LoginContext } from '../../App';

export default function Homepage() {
const [randomId, setRandomId] = useState();
const { LocationId, setLocationId } = useLocationId();
const { LocationName, setLocationName } = useLocationName();
const [loggedIn, setLoggedIn] = useContext(LoginContext)
const token = localStorage.getItem('authToken')
const tokenCreationTime = localStorage.getItem('tokenCreationTime');

const TOKEN_EXPIRATION_PERIOD = 60 * 60 * 1000;

const isTokenExpired = () => {
  if (!tokenCreationTime) return true;
  const now = new Date().getTime();
  return now - parseInt(tokenCreationTime, 10) > TOKEN_EXPIRATION_PERIOD;
};

useEffect(() => {
  if (token && !isTokenExpired()) {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenCreationTime');
  }
  
}, [token])


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
