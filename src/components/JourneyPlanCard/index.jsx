import { useState, useEffect } from "react";
import './JourneyPlanCard.css'

export default function JourneyPlanCard({ handleSubmit, startLocation, endLocation, directions, mode, chosenMode, setChosenMode, setDestination, destination, setOrigin, currentIndex, handleNext}) {
// const [origin, setOrigin] = useState('')
// const [destination, setDestination] = useState('')
// const [chosenMode, setChosenMode] = useState('')
// const [startLocation, setStartLocation] = useState('')
// const [endLocation, setEndLocation] = useState('')
// const [mode, setMode] = useState('')
// const [directions, setDirections] = useState([{}])
// const [currentIndex, setCurrentIndex] = useState(0)
const [userLocation, setUserLocation] = useState("")

// useEffect(() => {
//     getUserLocation();
//     console.log("Are you set", userLocation)
// }, [])


    function handleInput(e) {
        setOrigin(e.target.value)
    }

    function handleDestination(e) {
        setDestination(e.target.value)
    }

    function handleMode(e) {
        setChosenMode(e.target.value)
    }

    // const handleNext = () => {
    //     setCurrentIndex(prevIndex => {
    //         if (prevIndex < directions.length - 1) {
    //             return prevIndex + 1;
    //         } else {
    //             return prevIndex; 
    //         }
    //     });
    // };

    // const getUserLocation = () => {
    //     if ("geolocation" in navigator) {
    //         // Geolocation is supported
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //               const { latitude, longitude } = position.coords;
    //               console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    //               setUserLocation(`${latitude}, ${longitude}`)
    //             },
    //             (error) => {
    //               console.error("Error obtaining location:", error);
    //             }
    //           );
            
    //       } else {
    //         // Geolocation is not supported
    //         console.log("No meow")
    //       }
    // }

    // async function handleSubmit(e) {
    //     e.preventDefault();

    //     let backupData = ({
    //         "startLocation": "51.504, -0.0235", 
    //         "endLocation": "51.5067, -0.1425",
    //         "mode": "transit"
    //     })

    //     try {
    //         const response = await fetch(`http://54.89.47.53:3000/journey/directions`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 startLocation: userLocation,
    //                 endLocation: destination,
    //                 mode: chosenMode
    //             })
    //         });
    
    //         const data = await response.json();
    //         setStartLocation(data.startLocation)
    //         setEndLocation(data.endLocation)

    //         if (data.mode === "transit") {
    //             setMode("Public Transport")
    //         } else {
    //             setMode(data.mode)
    //         }
    //         setDirections(data.steps)
           
    
    //         setMessage('Location sent successfully.');
    //         setTimeout(() => {
    //             setMessage('');
    //         }, 5000);

    //     }   catch (err) {
    //         console.log(err.message);
    //         setMessage('There was a problem in retrieving your location.');
    //         setTimeout(() => {
    //             setMessage('');
    //         }, 5000);
    //     }
    //     setOrigin('')
    //     setDestination('')
    //     setChosenMode('')

    // }
   

  return (
    <>
    
            <form onSubmit={handleSubmit} className="journey-plan-form">
                <div className="journey-plan-innerform">
                    <input placeholder="Origin" name="startLocation" value="Current Location" type="text" className="text" onChange={handleInput} required />
                    <input placeholder="Destination" name="endLocation" value={destination} type="text" className="text" onChange={handleDestination} required />
                    {/* <input placeholder="Mode of Transport" name="mode" value={chosenMode} type="text" className="text" onChange={handleMode} /> */}
                    <select id="mode" name="mode" value={chosenMode} onChange={handleMode} required>
                    <option value="" disabled>Select Mode of Transport</option>
                        <option value="Walk">Walk</option>
                        <option value="Drive">Drive</option>
                        <option value="Cycle">Cycle</option>
                        <option value="Public Transport">Public Transport</option>
                    </select>
                </div>
                <div>
                </div>
                <div>
                    <button type="submit" className="journey-button">Find Journey</button>
                </div>
            </form>
            <div>
            {endLocation && (
            <div className="journey-plan-container">
                <h3>Start Location: {startLocation}</h3>
                <h3>End Location: {endLocation}</h3>
                <h3>Mode: {mode}</h3>
                <h3>Directions:</h3>
                {/* {directions.map(direction =>  */}
                <div key={directions} className="directions-section">
                    <p>Distance: {directions[currentIndex]?.distance}</p> 
                    <p>Duration: {directions[currentIndex]?.duration}</p>
                    <p>Instructions: {directions[currentIndex]?.instructions}</p>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
            )}
        </div>
    </>

  )
}
