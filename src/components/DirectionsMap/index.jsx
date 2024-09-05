import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useState, useEffect } from 'react';


const mapContainerStyle = {
    height: "600px",
    width: "400px",
    borderRadius: '22px',
    overflow: 'hidden', 
  };
  
  const center = {
    lat: 51.504,
    lng: -0.0235
  };
  
  const libaries = ['places']

export default function DirectionsMap({currentStepIndex, journeyDirections}) {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [directions, setDirections] = useState([])
  const [mapCenter, setMapCenter] = useState(center)
  const [Current, setCurrent] = useState([])

  const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
      console.log("jdirections 1", journeyDirections)
      if (journeyDirections && journeyDirections.length > 0) {
        setDirections(journeyDirections)
        console.log("jdirections 22", journeyDirections)
        console.log("current step", currentStepIndex)
        console.log("directions mel", directions[currentStepIndex])
      
        const currentStep = journeyDirections[currentStepIndex];
        if (currentStep) {
          setCurrent(currentStep)
          console.log("currentstep", currentStep)
          // console.log("current step", currentStep.start_location)
            // Dynamically update the center based on the current step
            // setMapCenter(currentStep.start_location);
  
            if (currentStep?.location) {
              console.log("meow")
              console.log("another meow", currentStep.location.start)
              console.log("another meow for end", currentStep.location.end)
              setMapCenter(currentStep.location.start);
            }
          
        }
        }
        

    }, [currentStepIndex, journeyDirections])
  

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: libaries,
        region: 'GB'
      })

      const customDirections = [
        {
          start_location: { lat: 51.506, lng: -0.0305 },
          end_location: { lat: 51.506, lng: -0.0305 },
          instructions: "Head east on Road A for 500 meters."
        },
        {
          start_location: { lat: 51.506, lng: -0.0305 },
          end_location: { lat: 51.508, lng: -0.0355 },
          instructions: "Turn left onto Street B and continue for 300 meters."
        }, {
            start_location: { lat: 51.508, lng: -0.0355 },
            end_location: { lat: 51.578, lng: -0.0375 },
            instructions: "Turn left onto Street B and continue for 300 meters."
          }, {
            "start_location": { "lat": 51.5018, "lng": -0.5402 },
            "end_location": { "lat": 51.5125, "lng": -0.5925 },
            "instructions": "Walk to Slough Railway Station (approximately 1.2 km)."
        },
        {
            "start_location": { "lat": 51.5125, "lng": -0.5925 },
            "end_location": { "lat": 51.5185, "lng": -0.0814 },
            "instructions": "Take the Great Western Railway train from Slough to London Paddington (about 30 minutes)."
        },
        {
            "start_location": { "lat": 51.5185, "lng": -0.0814 },
            "end_location": { "lat": 51.5154, "lng": -0.1481 },
            "instructions": "Change at Paddington and take the Circle or District Line to St. James's Park (about 10 minutes)."
        },
        {
            "start_location": { "lat": 51.4994, "lng": -0.1324 },
            "end_location": { "lat": 51.4988, "lng": -0.1357 },
            "instructions": "Walk from St. James's Park Station to 1st Floor, 11-19 Artillery Row (approximately 350 meters)."
        }
        // Add more steps as needed
      ];

     

      const handleNextStep = () => {
        if (currentStepIndex < directions.length - 1) {
        //   setCurrentStepIndex(currentStepIndex + 1);
        console.log("meow")
        }
      };
    
      const currentStep = directions[currentStepIndex];



return isLoaded && currentStep ? (
    <>
       <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={mapCenter}
      >

      {currentStep?.location?.start && currentStep?.location?.end && (
         <div>
         {/* Start and End markers */}
         <Marker position={currentStep?.location.start} />
         <Marker position={currentStep?.location.end} />

        
          {/* Line showing the path */}
          <Polyline 
          path={[currentStep?.location.start, currentStep?.location.end]} 
          options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
        />

        </div>
)}

      </GoogleMap>
      {/* <div>
        {currentStepIndex < directions.length - 1 && (
          <button onClick={handleNextStep}>Next</button>
        )}
      </div> */}


    </>
  ) : <></>
}
