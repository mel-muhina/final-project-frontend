// // import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
// // import {APIProvider, Map, Pin, AdvancedMarker} from '@vis.gl/react-google-maps';
// // import { useState, useEffect, useRef, useCallback } from 'react';
// // import { MapCard, SearchBar } from '../../components'
// // import SearchBar2 from '../../components/SearchBar2';
// // import MapCard3 from '../../components/MapCard3';

// // import './Search.css'

// export default function Search() {
// //     const [newMapOne, setNewMapOne] = useState(null);
// //     const [ tags, setTags ] = useState([]);
// //     const [ selectedLocation, setSelectedLocation ] = useState(null);
// //     const [ searchResults, setSearchResults] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [ markers, setMarkers] = useState([]);
// //     const [query, setQuery] = useState("");

// //     const apiKey = import.meta.env.VITE_API_KEY;

// //     useEffect(() => {
// //         // populateTags();
// //         // getSearchToMarkers();
// //         console.log(searchResults)
// //         setMarkers(locations)

// //     }, [searchResults])

// //     const libraries = ['places']

// //     const dummyTags = [
// //       { id: 1, tag: "Woodlands" },
// //       { id: 2, tag: "Hiking" },
// //       { id: 3, tag: "Beach" },
// //       { id: 4, tag: "Camping" },
// //       { id: 5, tag: "Park" },
// //       { id: 6, tag: "Garden" },
// //       { id: 7, tag: "Wildlife" },
// //       { id: 8, tag: "Farm" },
// //       { id: 9, tag: "Historic" },
// //       { id: 10, tag: "Rivers" }
// //     ];

// //     const locations = [
// //       { key: 'operaHouse', location: { lat: 51.5079, lng: -0.1283 } },
// //       { key: 'tarongaZoo',  location: { lat: 51.5040, lng: -0.1340 } }, 
// //       { key: 'somethingElse',  location: { lat: 51.5040, lng: -0.1650 } },
// //   ];


// //         async function populateTags() {
// //             // const api = `http://54.89.47.53:3000/locations/images/${randomId}`
// //             // const response = await fetch(api);
// //             // const data = await response.json();
// //             const data = dummyTags
// //             // console.log("data", data)
// //             setTags(data)
    
// //         }

// //       const handleSearchString = (e) => {
// //           setQuery(e.target.value)
// //       }

// //       const handleSearchSubmit = (e) => {
// //           e.preventDefault();
// //           handleSearch(query)
// //       };

// //         const handleSearch = useCallback(async (query) => {
// //                     console.log("query is", query)
// //                     setLoading(true);
// //           try {
// //               const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
// //               const data = await response.json();
// //               setSearchResults(data.results);
// //           } catch (err) {
// //               console.log("Fetch err", err.message)
// //           }
          
      
// //       }, [apiKey])

// //         // const getSearchToMarkers = () => {
// //         //   setMarkers(searchResults.map(result => ({
// //         //     id: result.place_id,
// //         //     position: {
// //         //       lat: result.geometry.location.lat,
// //         //       lng: result.geometry.location.lng,
// //         //     },
// //         //     name: result.name,
// //         //     })));
    
// //         //     const formattedMarkers = searchResults.map(result => {
// //         //       const lat = result.geometry.location.lat(); // Call the function to get the value
// //         //       const lng = result.geometry.location.lng(); // Call the function to get the value
    
// //         //       return {
// //         //           id: result.place_id,
// //         //           position: { lat, lng },
// //         //           name: result.name,
// //         //       };
// //         //   });
// //         //   setMarkers(formattedMarkers)
// //         // }


// //         const handleLocationClick = (location) => {
// //           setSelectedLocation({
// //             lat: location.geometry.location.lat,
// //             lng: location.geometry.location.lng
// //           })
// //         }
        
// //     const changeLocation = (lat, lng) => {
// //         setCenter({ lat, lng });
// //       };

// //     const containerStyle = {
// //         width: '73rem',
// //         height: '34rem',
// //         borderRadius: '22px',
// //         overflow: 'hidden', 
// //       };

// //     const defaultCenter = {
// //         lat: 51.5079,
// //         lng: -0.1283
// //       };

// //       const mapStyle = [
// //         {
// //           "featureType": "administrative.country",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "administrative.land_parcel",
// //           "elementType": "labels",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "administrative.locality",
// //           "stylers": [
// //             {
// //               "weight": 6.5
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "administrative.neighborhood",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.man_made",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural",
// //           "stylers": [
// //             {
// //               "visibility": "simplified"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural",
// //           "elementType": "geometry.fill",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural",
// //           "elementType": "labels",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural.landcover",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural.terrain",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "landscape.natural.terrain",
// //           "elementType": "geometry.fill",
// //           "stylers": [
// //             {
// //               "color": "#0040ff"
// //             },
// //             {
// //               "weight": 4.5
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi",
// //           "elementType": "labels.text",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.business",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.government",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.medical",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.park",
// //           "stylers": [
// //             {
// //               "visibility": "on"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.park",
// //           "elementType": "labels.text",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.place_of_worship",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.school",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "poi.sports_complex",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "road.arterial",
// //           "elementType": "labels",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "road.highway",
// //           "elementType": "labels",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "road.local",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         },
// //         {
// //           "featureType": "road.local",
// //           "elementType": "labels",
// //           "stylers": [
// //             {
// //               "visibility": "off"
// //             }
// //           ]
// //         }
// //       ]

// //       const [center, setCenter] = useState(defaultCenter)
// //       const [places, setPlaces] = useState([])
// //       const searchBoxRef = useRef(null);

// //       const onPlacesChanged = () => {
// //         const places = searchBoxRef.current.getPlaces();
// //         if (places && places.length > 0) {
// //           const place = places[0];
// //           const location = place.geometry.location;
// //           setCenter({
// //             lat: location.lat(),
// //             lng: location.lng(),
// //           });
// //           setPlaces(places);
// //           setSearchResults(places);
  
// //         }
// //       };
      

// //   return (
// //     <>
    
// //              {/* <div style={{ marginTop: '20px' }}>
// //                 <button onClick={() => changeLocation(40.7128, -74.0060)}>New York</button>
// //                 <button onClick={() => changeLocation(34.0522, -118.2437)}>Los Angeles</button>
// //                 <button onClick={() => changeLocation(51.5074, -0.1278)}>London</button>
// //             </div> */}
// //    {/* <div className="map-container">

           
// //                 <div className="sidebar-results">
// //                   <h2>Search Results</h2>

// //                   <ul>
// //                     {searchResults.map(result => (
// //                       <li key={result.place_id} onClick={() => handleLocationClick(result)}>
// //                         {result.name}
// //                       </li>
// //                     ))} 
// //                   </ul>
                  
// //                 </div>
// //                 <div className="googlemap">
              
                      
// //                       <div className="searchbar-background">
// //                               <StandaloneSearchBox
// //                               onLoad={ref => (searchBoxRef.current = ref)}
// //                               onPlacesChanged={onPlacesChanged}
// //                               >
// //                               <input
// //                                   type="text"
// //                                   placeholder="Search places..."
// //                                   onChange={handleSearch}
// //                                   className="googlemap-searchbar"
// //                               />
// //                               </StandaloneSearchBox>

// //                               <div className="search-tags-container">
// //                                   {tags.map(tag => 
// //                                   <li className={tag.tag}> {tag.tag}</li>
// //                                   )}
// //                               </div>
// //                       </div> */}

// //                       {/* <LoadScript googleMapsApiKey={apiKey}
// //                     libraries={['places']}
// //                     >

// //                       <GoogleMap
// //                           mapContainerStyle={containerStyle}
// //                           center={center}
// //                           zoom={13}
// //                           options={{ styles: mapStyle }}
                          
// //                       >
// //                             <Marker position={center} />
// //                       </GoogleMap>

// //                   </LoadScript> */}
// //               {/* </div>
// //         </div> */}
// //        {/* <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
// //           <SearchBar 
// //              setSearchResults={setSearchResults} 
// //              setCenter={setCenter}
// //              setMarkers={setMarkers}
// //           /> */}
     
// // {/*         
// //               <SearchBar 
// //                 setSearchResults={setSearchResults} 
// //                 setCenter={setCenter}
// //                 setMarkers={setMarkers}
// //                 libraries={libraries}
// //               /> */}
          
// //            <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>

// //               {/* <SearchBar2 
// //                setSearchResults={setSearchResults} 
// //                setCenter={setCenter}
// //                setMarkers={setMarkers}
// //                handleSearch={handleSearch}
// //                handleSearchSubmit={handleSearchSubmit}
// //                /> */}
// //               <MapCard 
// //                 searchResults={searchResults} 
// //                 markers={markers}
// //                 center={center}
// //               />
// //             </APIProvider>
// //             {/* </LoadScript> */}
// //         {/* // </LoadScript> */}

// //         {/* <MapCard3 /> */}
// //     </>
// //   )
// }


import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, useGoogleMap } from '@react-google-maps/api';
import { useState, useEffect, useRef, useCallback } from 'react';

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

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
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
            // const api = `http://54.89.47.53:3000/locations/images/${randomId}`
            // const response = await fetch(api);
            // const data = await response.json();
            const data = dummyTags
            // console.log("data", data)
            setTags(data)
    
        }

        const handleSearch = useCallback(async (query) => {
          const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
          const data = await response.json();
          setSearchResults(data.results);
        }, [])

        const handleLocationClick = (location) => {
          setSelectedLocation({
            lat: location.geometry.location.lat,
            lng: location.geometry.location.lng
          })
        }
        
    const changeLocation = (lat, lng) => {
        setCenter({ lat, lng });
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
            { id: 3, position: { lat: 51.503, lng: -0.119 }, title: 'whatsthis' },
            { id: 4, position: { lat: 51.516, lng: -0.175 }, title: 'dragon' },
            { id: 5, position: { lat: 51.535, lng: -0.104 }, title: 'cupcake' }
          ];
      
          setMarker(markers)
        }

        const handleInputChange = () => {
          if (inputRef.current) {
              const userInput = inputRef.current.value;
              setUserInput(userInput)
          }
      };

      // Search Bounds
      const updateSearchBounds = (map) => {
        const bounds = map.getBounds();
        if (bounds) {
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            setSearchBounds(`${sw.lat()},${sw.lng()}|${ne.lat()},${ne.lng()}`);
        }
    };

    const matchingMarker = marker.find(mark => mark.title.toLowerCase().trim().includes(userInput))

   
   useEffect(() => {
      getMarkers();
   }, [searchResults])

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();    
    
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
    
     
      console.log("matching marker find,", matchingMarker)
      if (matchingMarker) {
        console.log("MEow")
        setCenter({
          lat: matchingMarker.position.lat,
          lng: matchingMarker.position.lng,
        })
        console.log("what is visible markers", visibleMarkers)
        setVisibleMarkers([matchingMarker]);
      } else {
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        setVisibleMarkers([marker]);
        console.log("Visible Markers in else statement", visibleMarkers)
      }

 
      setPlaces(places);
      setSearchResults(places);
    }
  };

  const getMarkersNow = () => {

    if (!matchingMarker) {
      const newMarkers = searchResults.map((result, index) => ({
        id: index + 1, // Generate a unique id or use place_id
        position: {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
        },
        title: result.name
        
    }));
          setNewMarker(newMarkers);
    }
    
  }

  useEffect(() => {
    getMarkersNow();
  }, [searchResults])

  useEffect(() => {
    if (visibleMarkers.length > 0) {
      setNewMarker(visibleMarkers)
    }
  }, [matchingMarker])


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
                    libraries={['places']}
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
                                  onChange={handleInputChange}
                              />
                              </StandaloneSearchBox>

                              <div className="search-tags-container">
                                  {tags.map(tag => 
                                  <li className={tag.tag}> {tag.tag}</li>
                                  )}
                              </div>
                      </div>

                      <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={13}
                          options={{ styles: mapStyle }}
                          
                      >
                        {NewMarker && NewMarker.length > 0 ? (
                          NewMarker.map(mark => (
                            <Marker
                              key={mark.id}
                              position={mark.position}
                              title={mark.title}
                            />
                          ))
                          
                        ) : (
                          marker.map(mark => (
                            <Marker
                              key={mark.id}
                              position={mark.position}
                              title={mark.title}
                            />
                          ))
                        )
                        }
                      
                      </GoogleMap>

                  </LoadScript>
              </div>
        </div>
    </>
  )
}