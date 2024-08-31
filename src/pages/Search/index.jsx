import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import {APIProvider, Map, Pin, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useState, useEffect, useRef, useCallback } from 'react';
import { MapCard, SearchBar } from '../../components'

import './Search.css'

export default function Search() {
    const [ tags, setTags ] = useState([]);
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ searchResults, setSearchResults] = useState([]);
    const [ markers, setMarkers] = useState([]);

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        // populateTags();
        getSearchToMarkers();
    }, [searchResults])

    const libraries = ['places']


    const getSearchToMarkers = () => {
      // setMarkers(searchResults.map(result => ({
      //   id: result.place_id,
      //   position: {
      //     lat: result.geometry.location.lat,
      //     lng: result.geometry.location.lng,
      //   },
      //   name: result.name,
      //   })));

        const formattedMarkers = searchResults.map(result => {
          const lat = result.geometry.location.lat(); // Call the function to get the value
          const lng = result.geometry.location.lng(); // Call the function to get the value

          return {
              id: result.place_id,
              position: { lat, lng },
              name: result.name,
          };
      });
      setMarkers(formattedMarkers)
    }

    // const dummyTags = [
    //     {
    //         id: 1,
    //         tag: "Woodlands",
    //     }, {
    //         id: 2,
    //         tag: "Hiking",
    //     }, {
    //         id: 3, 
    //         tag: "Beach"
    //     }, {
    //         id: 4, 
    //         tag: "Camping"
    //     }, {
    //         id: 5, 
    //         tag: "Park"
    //     },  {
    //         id: 6, 
    //         tag: "Garden"
    //     }, {
    //         id: 7, 
    //         tag: "Wildlife"
    //     },  {
    //         id: 8, 
    //         tag: "Farm"
    //     },  {
    //         id: 9, 
    //         tag: "Historic"
    //     },  {
    //         id: 10, 
    //         tag: "Rivers"
    //     }
                   
    //     ]

    //     async function populateTags() {
    //         // const api = `http://54.89.47.53:3000/locations/images/${randomId}`
    //         // const response = await fetch(api);
    //         // const data = await response.json();
    //         const data = dummyTags
    //         // console.log("data", data)
    //         setTags(data)
    
    //     }

        // const handleSearch = useCallback(async (e) => {
        //   const query = e.target.value;
        //   if (query) {
        //     console.log("Query")
        //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
        //     const data = await response.json();
        //     console.log("Data from api", data)
        //     setSearchResults(data.results);
        //     setMarkers(data.results.map(result => ({
        //       id: result.place_id,
        //       position: {
        //         lat: result.geometry.location.lat,
        //         lng: result.geometry.location.lng,

        //       },
        //       name: result.name,
        //       })));
        //     } else {
        //       setSearchResults([]);
        //       setMarkers([]);
        //     }
        
        // }, [])

        // const handleLocationClick = (location) => {
        //   setSelectedLocation({
        //     lat: location.geometry.location.lat,
        //     lng: location.geometry.location.lng
        //   })
        // }
        
    // const changeLocation = (lat, lng) => {
    //     setCenter({ lat, lng });
    //   };

    // const containerStyle = {
    //     width: '73rem',
    //     height: '34rem',
    //     borderRadius: '22px',
    //     overflow: 'hidden', 
    //   };

    const defaultCenter = {
        lat: 51.5079,
        lng: -0.1283
      };

      const mapStyle = [
        {
          "featureType": "administrative.country",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "stylers": [
            {
              "weight": 6.5
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.terrain",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#0040ff"
            },
            {
              "weight": 4.5
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.government",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.place_of_worship",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.school",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.sports_complex",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]

      const [center, setCenter] = useState(defaultCenter)
      const [places, setPlaces] = useState([])
      const searchBoxRef = useRef(null);

      // const onPlacesChanged = () => {
      //   const places = searchBoxRef.current.getPlaces();
      //   if (places && places.length > 0) {
      //     const place = places[0];
      //     const location = place.geometry.location;
      //     setCenter({
      //       lat: location.lat(),
      //       lng: location.lng(),
      //     });
      //     setPlaces(places);
      //     setSearchResults(places);
  
      //   }
      // };

  return (
    <>
    
             {/* <div style={{ marginTop: '20px' }}>
                <button onClick={() => changeLocation(40.7128, -74.0060)}>New York</button>
                <button onClick={() => changeLocation(34.0522, -118.2437)}>Los Angeles</button>
                <button onClick={() => changeLocation(51.5074, -0.1278)}>London</button>
            </div> */}
   {/* <div className="map-container">

           
                <div className="sidebar-results">
                  <h2>Search Results</h2>

                  <ul>
                    {searchResults.map(result => (
                      <li key={result.place_id} onClick={() => handleLocationClick(result)}>
                        {result.name}
                      </li>
                    ))} 
                  </ul>
                  
                </div>
                <div className="googlemap">
              
                      
                      <div className="searchbar-background">
                              <StandaloneSearchBox
                              onLoad={ref => (searchBoxRef.current = ref)}
                              onPlacesChanged={onPlacesChanged}
                              >
                              <input
                                  type="text"
                                  placeholder="Search places..."
                                  onChange={handleSearch}
                                  className="googlemap-searchbar"
                              />
                              </StandaloneSearchBox>

                              <div className="search-tags-container">
                                  {tags.map(tag => 
                                  <li className={tag.tag}> {tag.tag}</li>
                                  )}
                              </div>
                      </div> */}

                      {/* <LoadScript googleMapsApiKey={apiKey}
                    libraries={['places']}
                    >

                      <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={13}
                          options={{ styles: mapStyle }}
                          
                      >
                            <Marker position={center} />
                      </GoogleMap>

                  </LoadScript> */}
              {/* </div>
        </div> */}
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
          <SearchBar 
             setSearchResults={setSearchResults} 
             setCenter={setCenter}
             setMarkers={setMarkers}
          />
          <MapCard 
             searchResults={searchResults} 
             markers={markers}
          />
        </LoadScript>
    </>
  )
}
