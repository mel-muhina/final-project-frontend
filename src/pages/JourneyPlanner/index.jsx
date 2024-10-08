import { useState, useEffect } from "react"
import { JourneyPlanCard, DirectionsMap } from "../../components"
import './JourneyPlanner.css'

export default function JourneyPlanner() {
  const [origin, setOrigin] = useState('')
const [destination, setDestination] = useState('')
const [chosenMode, setChosenMode] = useState('')
const [message, setMessage] = useState('')
const [startLocation, setStartLocation] = useState('')
const [endLocation, setEndLocation] = useState('')
const [mode, setMode] = useState('')
const [directions, setDirections] = useState([{}])
const [currentIndex, setCurrentIndex] = useState(0)
const [userLocation, setUserLocation] = useState("")


useEffect(() => {
  getUserLocation();
  console.log("Are you set", userLocation)
  console.log("directions in the main page", directions)
}, [])


const getUserLocation = () => {
  if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            setUserLocation(`${latitude}, ${longitude}`)
          },
          (error) => {
            console.error("Error obtaining location:", error);
          }
        );
      
    } else {
      // Geolocation is not supported
    }
}

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch(`https://nature-connect-backend.co.uk/journey/directions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startLocation: userLocation,
                endLocation: destination,
                mode: chosenMode
            })
        });

        const data = await response.json();
        console.log("data in jounryeplanner", data)
        setStartLocation(data.startLocation)
        setEndLocation(data.endLocation)

        if (data.mode === "transit") {
            setMode("Public Transport")
        } else {
            setMode(data.mode)
        }
        setDirections(data.steps)
       

        setMessage('Location sent successfully.');
        setTimeout(() => {
            setMessage('');
        }, 5000);

    }   catch (err) {
        console.log(err.message);
        setMessage('There was a problem in retrieving your location.');
        setTimeout(() => {
            setMessage('');
        }, 5000);
    }
    setOrigin('')
    setDestination('')
    setChosenMode('')

}

const handleNext = () => {
  setCurrentIndex(prevIndex => {
      if (prevIndex < directions.length - 1) {
          return prevIndex + 1;
      } else {
          return prevIndex; 
      }
  });
};


  return (
    <>
        <div className="JourneyPlanner-Page-Container"> 
            {/* <h1 className='journey-planner-h1'>Journey Planner</h1> */}
            <div className="journeyplanner-card">
              <JourneyPlanCard handleSubmit={handleSubmit} startLocation={startLocation} endLocation={endLocation} directions={directions} mode={mode} chosenMode={chosenMode} setChosenMode={setChosenMode} setDestination={setDestination} destination={destination} setOrigin={setOrigin} currentIndex={currentIndex} handleNext={handleNext}/>
            </div>
            <div className="journeyplanner-directions-map">
              <DirectionsMap currentStepIndex={currentIndex} journeyDirections={directions}/>
            </div>
        </div>
    </>
  )
}
