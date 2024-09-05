import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef, useCallback } from 'react';
import './Search.css'
import { LocationModal } from '../../components';
import { useLocationId, useLocationName } from '../../contexts';

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

const containerStyle = {
  width: '73rem',
  height: '35rem',
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

const libaries = ['places']

export default function Search() {
    const [ tags, setTags ] = useState([]);
    const [ marker, setMarker ] = useState([])
    const inputRef = useRef(null);
    const [userInput, setUserInput] = useState('')
    const [visibleMarkers, setVisibleMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [center, setCenter] = useState(defaultCenter)
    const [places, setPlaces] = useState([])
    const [apiMarkers, setApiMarkers] = useState([])
    const searchBoxRef = useRef(null);
    const { LocationId, setLocationId } = useLocationId();
    const { LocationName, setLocationName } = useLocationName();
    const apiKey = import.meta.env.VITE_API_KEY;

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiKey,
      libraries: libaries,
      region: 'GB'
    })

    useEffect(() => {
        populateTags();
        getRealMarkers();

    }, [])

    useEffect(() => {
      if (LocationName) {
        handleTagClick(LocationName)
        setLocationName('')
      }
  }, [])


    async function populateTags() {
      const data = dummyTags
      setTags(data)
    }

    const handleTagClick = async (tag) => {
      setUserInput(tag);
      const options = {
        "method": "POST",
        "body": JSON.stringify({"textQuery": tag}),
        "headers": {
          "Content-Type": 'application/json',
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "*"
        },
      }

      const response = await fetch(`https://places.googleapis.com/v1/places:searchText`, options)
      const data = await response.json()
      console.log("data", data.places)
      onPlacesChanged(data.places)
    };

    const handleInputChange = () => {
      if (inputRef.current) {
        const userInput = inputRef.current.value;
        setUserInput(userInput)
      }
    };

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
   

    async function getRealMarkers() {
      try {
        const response = await fetch(`http://54.89.47.53:3000/locations/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_location: {
                  "latitude": 51.5079,
                  "longitude": -0.1283,
                },
                tags: {
                  "Hiking": false,
                  "Woodlands": false,
                  "Beach": false,
                  "park": false,
                  "Historic": false,
                  "Playground": false,
                  "River": false,
                  "large": false,
                  "boating": false
                },
                filter_distance: 100
                
            })
            
        });
        const data = await response.json();
        setApiMarkers(data)
        setMarker(data)
        setVisibleMarkers(data)

        const dataArr = []

        const newMarkers = data.map((result, index) => ({
          id: index + 1, 
          position: {
              lat: result.latitude,
              lng: result.longitude
          },
          title: result.name 
        }));
  
        setMarker(newMarkers)
        setVisibleMarkers(newMarkers)

      }   catch (err) {
        console.log(err.message);
      
    }
 
    
    }

  
  const onPlacesChanged = (data) => {
    const matches = apiMarkers.filter(mark => mark.tag_name.toLowerCase().trim().includes(userInput));
    let places = searchBoxRef.current.getPlaces();  

     if (data) {
      places = data;

      const place = places[0];
      const location = place.location;

      setPlaces(places);

      const newMarkers = places.map((result, index) => ({
        id: index + 1, 
        position: {
            lat: result.location.latitude,
            lng: result.location.longitude
        },
        title: result.displayName.text  
      }));

      setCenter({
        lat: location.latitude,
        lng: location.longitude,
      });
      
      setVisibleMarkers(newMarkers);
      setSelectedMarker(newMarkers[0]); 
      setLocationId(newMarkers[0].id)
      
    } else {
      if (places && places.length > 0) {
        const place = places[0];
        const location = place.geometry.location;
      
        if (matches.length > 0) {
          const marksToSet = []
  
            matches.forEach((mark) => {
              marksToSet.push({
                position: { lat: mark.latitude, lng: mark.longitude },
                title: mark.name,
                description: mark.description,
                id: mark.place_id,
                tag: mark.tag_id
            });
          })
  
          setCenter({
            lat: marksToSet[0].position.lat,
            lng: marksToSet[0].position.lng,
          })
  
          setVisibleMarkers(marksToSet);
          setSelectedMarker(marksToSet[0]); 
          setLocationId(marksToSet[0].id)
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
          
          setVisibleMarkers(newMarkers);
          setSelectedMarker(newMarkers[0]); 
          setLocationId(newMarkers[0].id)
        }
      }
    }
    setUserInput("")
  };

  return isLoaded ? (
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
                    {/* <LoadScript googleMapsApiKey={apiKey}
                      libraries={libaries}
                      version="weekly"
                      loadingElement={<div>Loading...</div>} // Optional: Add a loading element
                      
                      > */}
                        
                        <div className="searchbar-background">
                                <StandaloneSearchBox
                                onLoad={ref => searchBoxRef.current = ref}
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
                            zoom={12}
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
                            {selectedMarker && selectedMarker.position && (
                              <InfoWindow
                                position={selectedMarker.position || selectedMarker.Location}
                                onCloseClick={() => setSelectedMarker(null)}
                              >
                                <div className="infobox">
                                  <h2>{selectedMarker.title || "Location Info"}</h2>
                                  <p>This is some cool information.</p>
                                  <p>{selectedMarker.description}</p>
                                  {/* <LocationModal /> */}
                                </div>
                              </InfoWindow>
                        )}
                        </GoogleMap>

                    {/* </LoadScript> */}
                </div>
          </div> 
    </>
  ) : <></>
}