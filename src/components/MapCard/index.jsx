import {APIProvider, Map, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import ReactDOM from 'react-dom/client';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import MarkerContent from '../MarkerContent';
import PoiMarkers from '../PoiMarkers'


export default function MapCard({ searchResults, markers }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [mapCentre, setMapCentre] = useState({ lat: 51.5079, lng: -0.1283 })
    const [userLocation, setUserLocation] = useState(null);
    // const [markers, setMarkers] = useState([]);
    const mapId = '8bcae17a3db289c3'
    const apiKey = import.meta.env.VITE_API_KEY;
    

    useEffect(() => {
        getUserCenter();

    }, [])

    useEffect(() => {
            setMapCentre(userLocation ? userLocation : { lat: 51.5079, lng: -0.1283 })
            initaliseMap();
            getLocations();
    
        
    }, [userLocation, mapCentre]);
    

    useEffect(() => {
        if (map && markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(marker => {
                const { lat, lng } = marker.position;
                bounds.extend(new window.google.maps.LatLng(lat, lng));
            });
            map.fitBounds(bounds);
        }
    }, [markers, map])

    

    const getUserCenter = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
        })}
    }

    const initaliseMap = async () => {
        if (mapRef.current) {
            await getGooleMaps();
        }
    }

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
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            "libraries": ["marker"],
        })
    
        await loader.load();

        
        if (mapRef.current) {
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: mapCentre,
                zoom: 14,
                mapId: mapId,
            });    

            setMap(newMap)
        
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
        } 
        
        else {
            console.log("Map.ref.current is null")
        }


    }

   

  return (
    <>
        <APIProvider apiKey={apiKey}>
            <Map
                defaultZoom={14}
                defaultCenter={mapCentre}
                mapId={mapId}
                style={containerStyle}
                onMapLoad={map => setMap(map)}
                
            >
                <PoiMarkers pois={markers} />
            </Map>
        </APIProvider>
    </>
  )
}
