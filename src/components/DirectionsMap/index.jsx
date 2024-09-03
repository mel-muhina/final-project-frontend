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

export default function DirectionsMap({currentStepIndex}) {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [directions, setDirections] = useState([])

  const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        setDirections(customDirections)
        console.log(directions)
        console.log("current step", currentStepIndex)
    }, [currentStepIndex])
  

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
          },
        // Add more steps as needed
      ];

     

      const handleNextStep = () => {
        if (currentStepIndex < directions.length - 1) {
        //   setCurrentStepIndex(currentStepIndex + 1);
        console.log("meow")
        }
      };
    
      const currentStep = directions[currentStepIndex];



return isLoaded ? (
    <>
       <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >

{currentStep.start_location && currentStep.end_location && (
         <div>
         {/* Start and End markers */}
         <Marker position={currentStep.start_location} />
         <Marker position={currentStep.end_location} />

        
          {/* Line showing the path */}
          <Polyline 
          path={[currentStep?.start_location, currentStep?.end_location]} 
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
