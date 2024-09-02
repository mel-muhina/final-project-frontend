import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, useGoogleMap, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";

import './Search.css'

export default function Search() {
    const [ tags, setTags ] = useState([]);
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ searchResults, setSearchResults] = useState([]);
    const [ marker, setMarker ] = useState([])
    const [ NewMarker, setNewMarker ] = useState([])
    const [searchBounds, setSearchBounds] = useState(null);
    const inputRef = useRef(null);
    const [userInput, setUserInput] = useState('')
    const [visibleMarkers, setVisibleMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [MatchingMarker, setMatchingMarker] = useState([])

     const libaries = ['places']

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        getMarkers();
        populateTags();
    }, [])


    const dummyTags = [
        {
            id: 1,
            tag: "Woodlands",
        }, {
            id: 2,
            tag: "Hiking",
        }, {
            id: 3, 
            tag: "Beach"
        }, {
            id: 4, 
            tag: "Camping"
        }, {
            id: 5, 
            tag: "Park"
        },  {
            id: 6, 
            tag: "Garden"
        }, {
            id: 7, 
            tag: "Wildlife"
        },  {
            id: 8, 
            tag: "Farm"
        },  {
            id: 9, 
            tag: "Historic"
        },  {
            id: 10, 
            tag: "Rivers"
        }
                   
        ]

        async function populateTags() {
            const data = dummyTags
            setTags(data)
        }

        const handleTagClick = (tag) => {
          setUserInput(tag);          
        };
        

    const containerStyle = {
        width: '73rem',
        height: '34rem',
        borderRadius: '22px',
        overflow: 'hidden', 
      };

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
              "visibility": "on"
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

        // Define markers

        const getMarkers = () => {
          const markers = [
            { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: 'Central London' },
            { id: 2, position: { lat: 51.515, lng: -0.09 }, title: 'Charring Cross' },
            { id: 3, position: { lat: 51.503, lng: -0.119 }, title: 'Pumpkin' },
            { id: 4, position: { lat: 51.516, lng: -0.175 }, title: 'Dragon' },
            { id: 5, position: { lat: 51.535, lng: -0.104 }, title: 'Cupcake', description: 'This is a cool cupcake.' },
            { id: 6, position: { lat: 51.535, lng: -0.124 }, title: 'Cupcake' }
          ];
      
          setMarker(markers)
          setVisibleMarkers(markers)
        }

        const handleInputChange = () => {
          if (inputRef.current) {
              const userInput = inputRef.current.value;
              setUserInput(userInput)
          }
      };


    
  // const matchingMarker = marker.find(mark => mark.title.toLowerCase().trim().includes(userInput))

  const onPlacesChanged = () => {
    // const matchingMarker2 = marker.filter(mark => mark.title.toLowerCase().trim().includes(userInput))
    // setMatchingMarker(matchingMarker2)

    // Check that the thing(s) is in the database 
    console.log(marker)
    const matches = marker.filter(mark => mark.title.toLowerCase().trim().includes(userInput))
    console.log(matches)

    const places = searchBoxRef.current.getPlaces();    
    
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
    
      // If there is a match/matches, we want to render the match pins  
      if (matches.length > 0) {
        console.log("HEYYYYY")
        const marksToSet = []

          matches.forEach((mark) => {
            marksToSet.push({
              position: { lat: mark.position.lat, lng: mark.position.lng },
              title: mark.title,
          });
        })
        setCenter({
          lat: marksToSet[0].position.lat,
          lng: marksToSet[0].position.lng,
        })
        setVisibleMarkers(marksToSet);
        setSelectedMarker(marksToSet[0]); 
        console.log(marksToSet)
        // if (marksToSet.length > 0) {
        //   setNewMarker(marksToSet)
        // }
        // setSelectedMarker(marksToSet[0]);
        
      } else {
        setPlaces(places);

        const newMarkers = places.map((result, index) => ({
          id: index + 1, 
          position: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
          },
          title: result.name  
        }));

        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });

        console.log("newMarkers", newMarkers)
        setVisibleMarkers(newMarkers);
        setSelectedMarker(newMarkers[0]); 
      }
    }
  };

  // const getMarkersNow = () => {
  //   if (!matchingMarker) {
  //     const newMarkers = searchResults.map((result, index) => ({
  //       id: index + 1, 
  //       position: {
  //           lat: result.geometry.location.lat(),
  //           lng: result.geometry.location.lng()
  //       },
  //       title: result.name  
  //     }));
  //     setNewMarker(newMarkers);
  //   } else {
  //     setNewMarker(matchingMarker)
  //   }
  // }


  // useEffect(() => {
  //   console.log("hey I'm triggered")
  //   // getMarkers();
  //   getMarkersNow();
  //   // console.log(NewMarker)
  //   // setSelectedMarker(NewMarker[0]); 

  // }, [searchResults])



  // useEffect(() => {
  //   // getMarkers();
   
  //   if (Array.isArray(NewMarker)) {
  //     setSelectedMarker(NewMarker[0]); 
  //   } else {
  //     setSelectedMarker(NewMarker); 
  //   }

  // }, [NewMarker])

  // useEffect(() => {
  //   console.log("hi", visibleMarkers)
  //   if (visibleMarkers.length > 0) {
  //     setNewMarker(visibleMarkers)
  //   }
  //   setSelectedMarker(visibleMarkers[0]);
    
  // }, [visibleMarkers])


  return (
    <>
    
             {/* <div style={{ marginTop: '20px' }}>
                <button onClick={() => changeLocation(40.7128, -74.0060)}>New York</button>
                <button onClick={() => changeLocation(34.0522, -118.2437)}>Los Angeles</button>
                <button onClick={() => changeLocation(51.5074, -0.1278)}>London</button>
            </div> */}
   <div className="map-container">

           
                {/* <div className="sidebar-results">
                  <h2>Search Results</h2>

                  <ul>
                    {searchResults.map(result => (
                      <li key={result.place_id} onClick={() => handleLocationClick(result)}>
                        {result.name}
                      </li>
                    ))} 
                  </ul>
                  
                </div> */}
                <div className="googlemap">
                  <LoadScript googleMapsApiKey={apiKey}
                    libraries={libaries}
                    loadingElement={<div>Loading...</div>} // Optional: Add a loading element
                    
                    >
                      
                      <div className="searchbar-background">
                              <StandaloneSearchBox
                              onLoad={ref => (searchBoxRef.current = ref)}
                              onPlacesChanged={onPlacesChanged}
                              >
                              <input
                                  type="text"
                                  placeholder="Search places..."
                                  className="googlemap-searchbar"
                                  ref={inputRef}
                                  value={userInput}
                                  onChange={handleInputChange}
                              />
                              </StandaloneSearchBox>

                              <div className="search-tags-container">
                                  {tags.map(tag => 
                                  <li key={tag.id} onClick={() => handleTagClick(tag.tag)} className={tag.tag}> {tag.tag}</li>
                                  )}
                              </div>
                      </div>

                      <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={13}
                          options={{ styles: mapStyle }}
                          
                      >
                         {visibleMarkers.map(mark => (
                            <Marker
                              key={mark.id}
                              position={mark.position}
                              title={mark.title}
                              onClick={() => setSelectedMarker(mark)}
                            />
                          ))}
                          {selectedMarker && (
                            <InfoWindow
                              position={selectedMarker.position}
                              onCloseClick={() => setSelectedMarker(null)}
                            >
                              <div className="infobox">
                                <h2>{selectedMarker.title || "Location Info"}</h2>
                                <p>This is some cool information.</p>
                                <p>{selectedMarker.description}</p>
                              </div>
                            </InfoWindow>
                       )}
                      </GoogleMap>

                  </LoadScript>
              </div>
        </div>
    </>
  )
}