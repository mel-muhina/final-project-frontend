import {APIProvider, Map, useMap, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import ReactDOM from 'react-dom/client';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import MarkerContent from '../MarkerContent';
import PoiMarkers from '../PoiMarkers'


export default function MapCard({ }) {
    const map = useMap();
    const mapRef = useRef('');
    const [newMap, setNewMap] = useState(null);
    const [mapCentre, setMapCentre] = useState({ lat: 51.5079, lng: -0.1283 })
    const [userLocation, setUserLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const mapId = '8bcae17a3db289c3'
    const apiKey = import.meta.env.VITE_API_KEY;
    

    useEffect(() => {
        getUserCenter();
    }, [])

    useEffect(() => {
        getGooleMaps();

    }, [userLocation])
    

    

    const getUserCenter = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
        })}
    }

//     const initalizeMap = async () => {
//         const loader = new Loader({
//             apiKey: apiKey,
//             version: 'weekly',
//             libraries: ['places'],
//     })

//     await loader.load();

//     if (mapRef.current) {
//       const newMap = new window.google.maps.Map(mapRef.current, {
//         center: userLocation || { lat: 51.5079, lng: -0.1283 },
//         zoom: 14,
//         mapId: mapId,
//       });

//       setMap(newMap);
// }};

    const containerStyle = {
        width: '73rem',
        height: '82vh',
        borderRadius: '22px',
        overflow: 'hidden', 
      };


    // Backup Locations
    const locations = [
        { key: 'operaHouse', location: { lat: 51.5079, lng: -0.1283 } },
        { key: 'tarongaZoo',  location: { lat: 51.5040, lng: -0.1340 } }, 
        { key: 'somethingElse',  location: { lat: 51.5040, lng: -0.1650 } },
    ];

    const getLocations = async () => {
        // const api = `http://54.89.47.53:3000/locations/filter`
        // const response = await fetch(api);
        // const data = await response.json();
        // console.log("What data do i get", data)
        
    }



    const getGooleMaps = async () => {
        console.log("a")
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            "libraries": ["marker"],
        })
    console.log("b")
        await loader.load();

        console.log(map)
        if (map) {
            console.log(c)
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: userLocation  || { lat: 51.5079, lng: -0.1283 },
                zoom: 14,
                mapId: mapId,
            });    

            setNewMap(newMap)
        
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

            if (AdvancedMarkerElement) {
                locations.forEach((poi) => {
                 // Create a container for the content
                 const container = document.createElement('div');

                  // Create a root to render the component into
                 const root = ReactDOM.createRoot(container);

                  new AdvancedMarkerElement({
                    map: newMap,
                    position: poi.location,
                    content: container,
                  });
                });
            
        } 
        
        else {
            console.log("Map.ref.current is null")
        }


    }

    

   

  return (
    <>
  
            <Map
                defaultZoom={13}
                defaultCenter={mapCentre || { lat: 51.5079, lng: -0.1283 }}
                mapId={mapId}
                style={containerStyle}
              
            >
               <PoiMarkers pois={locations}/>
            </Map>
    
    </>
  )
}
}