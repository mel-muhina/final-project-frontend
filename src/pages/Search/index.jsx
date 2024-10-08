import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef, useCallback } from 'react';
import './Search.css'
import { LocationModal } from '../../components';
import { useLocationId, useLocationName } from '../../contexts';
import RecommendButton from '../../components/RecommendButton';
// import SaveButton from '../../components/SaveButton';
// import LocationModal from '../../components';

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

export default function Search({ location }) {
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
        getMarkers();
        getRealMarkers();

    }, [])

    useEffect(() => {
      if (LocationName) {
        // handleTagClick(LocationName)
        handleLocationName(LocationName)
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
      onPlacesChanged(data.places)
    };

    const handleLocalTag = async (tag) => {
      setUserInput(tag);
      const tags = {
        [tag]: true  // This will only send one tag with a value of true
      };
      const options = {
        "method": "POST",
        "headers": {
          "Content-Type": 'application/json',
        },
        "body": JSON.stringify({
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
      }

      const response = await fetch(`https://nature-connect-backend.co.uk/locations/filter`, options)
      const data = await response.json()
      let matches = data.filter(mark => mark.tag_name.includes(tag));
      onPlacesChanged(null, matches)
      
    };

    const handleLocationName = async (location) => {
      setUserInput(location);
      const options = {
        "method": "POST",
        "headers": {
          "Content-Type": 'application/json',
        },
        "body": JSON.stringify({
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
      }

      const response = await fetch(`https://nature-connect-backend.co.uk/locations/filter`, options)
      const data = await response.json()
      onPlacesChanged(data)
      
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
        { id: 128, position: { lat: 51.0745223, lng: -0.0106671 }, title: 'Plaw Hatch Farm', description: 'Plaw Hatch Farm is a popular destination in Sharpthorne, East Grinstead, known for its beautiful riverside setting. It has a high rating of 4.7, suggesting visitors enjoy the farm\'s peaceful atmosphere and scenic views.' },
        { id: 4, position: { lat: 51.620857, lng: -0.071017 }, title: 'Hainault Forest', description: 'Hainault Forest is a popular park in London, England, a great place to enjoy nature and get some exercise.' },
        { id: 41, position: { lat: 51.4020302, lng: 0.010327 }, title: 'Kelsey Park', description: 'Kelsey Park is a well-rated garden located in Beckenham, enjoyable green space for visitors to explore.' },
        { id: 117, position: { lat: 51.387022, lng: -0.462047 }, title: 'Watts Hill Farm', description: 'Watts Hill Farm is a popular spot located near Farnham, and offers a relaxing escape for nature lovers.' },
        { id: 122, position: { lat: 51.6556027, lng: -0.417563 }, title: 'Cassiobury Farm and Fishery', description: 'Cassiobury Farm and Fishery is a popular spot located in Watford, with fishing opportunities and scenic riverside views.' },
        { id: 31, position: { lat: 51.4833853, lng: -0.094764 }, title: 'Kennington Park', description: 'Kennington Park is a popular green space in London, allowing visitors to enjoy the outdoors, with a rating of 4.4 stars.' },
        { id: 49, position: { lat: 51.5426532, lng: -0.090676 }, title: 'N1 Garden Centre', description: 'N1 Garden Centre is a historic establishment located in Islington, offering a wide selection of plants, flowers, and gardening supplies.' },
        { id: 83, position: { lat: 51.6852108, lng: -0.003454 }, title: 'Theobalds Park Camping and Caravanning Club Site', description: 'Theobalds Park Camping and Caravanning Club Site is a scenic campsite in Waltham Cross, it features wildlife and is rated 4.4 stars.' },
        { id: 125, position: { lat: 51.5950423, lng: 0.029300 }, title: 'Wellgate Community Farm', description: 'Wellgate Community Farm is a popular destination in Rainham, allowing visitors to experience the beauty of nature and learn about its sustainable practices.' },
        { id: 20, position: { lat: 51.9534797, lng: -0.422545 }, title: 'Barton Hills NNR', description: 'Barton Hills NNR is a highly rated park located in Barton-le-Clay, providing a beautiful natural environment for visitors to enjoy.' },
        { id: 45, position: { lat: 51.4533323, lng: -0.284635 }, title: 'Terrace Gardens', description: 'Terrace Gardens is a historic park in Richmond Hill, offering a peaceful place to enjoy the outdoors and learn about the area\'s history.' },
        { id: 3, position: { lat: 51.7839653, lng: -0.324437 }, title: 'Heartwood Forest', description: 'Heartwood Forest is a popular park in Sandridge, St Albans, providing visitors with the opportunity to explore the forest and experience its natural beauty.' },
        { id: 103, position: { lat: 51.4942864, lng: -0.296422 }, title: 'Gunnersbury Triangle, London Wildlife Trust', description: 'Gunnersbury Triangle is a park in London that is managed by the London Wildlife Trust, offering a great opportunity to connect with nature.' },
        { id: 61, position: { lat: 51.5222928, lng: -0.116307 }, title: 'Allen Gardens', description: 'Allen Gardens is a historic park located in London, providing a beautiful space for visitors to enjoy the outdoors and learn about the area\'s history.' },
        { id: 28, position: { lat: 51.5170551, lng: 0.049217 }, title: 'Beckton District Park', description: 'Beckton District Park is a large green space located in East London, featuring outdoor activities and a serene garden area.' },
        { id: 120, position: { lat: 51.579758, lng: -0.328092 }, title: 'Odds Farm Park', description: 'Odds Farm Park is a popular tourist attraction located in Wooburn Green, offering a variety of activities, including a farm, a play area, and a river.' },
        { id: 27, position: { lat: 51.7326533, lng: -0.095843 }, title: 'Central Park', description: 'Central Park is a beautiful garden located in Chelmsford, providing a great place to relax and enjoy the outdoors.' },
        { id: 66, position: { lat: 51.7710776, lng: -0.043999 }, title: 'Rye House Gatehouse', description: 'Rye House Gatehouse is a historic landmark located in Hoddesdon, offering a glimpse into the past with a high rating.' },
        { id: 127, position: { lat: 51.467385, lng: -0.198982 }, title: 'The Woodlands Farm Trust', description: 'The Woodlands Farm Trust is a popular spot located in Welling, providing a peaceful escape for nature lovers.' },
        { id: 15, position: { lat: 51.5261477, lng: 0.089203 }, title: 'Hiking In London', description: 'Hiking In London is a highly rated park located in North London, providing a peaceful and relaxing environment.' },
        { id: 71, position: { lat: 51.5886827, lng: -0.386497 }, title: 'Ruislip Lido Beach', description: 'Ruislip Lido Beach is a popular outdoor destination in Ruislip, offering a beautiful place to enjoy nature and spend time outdoors.' },
        { id: 102, position: { lat: 51.4628369, lng: -0.089842 }, title: 'Centre For Wildlife Gardening, London Wildlife Trust', description: 'The Centre For Wildlife Gardening in London is a great educational space, offering opportunities for people of all ages.' },
        { id: 107, position: { lat: 51.3543303, lng: -0.035678 }, title: 'Bramley Bank, London Wildlife Trust', description: 'Bramley Bank is a farm located in Croydon, London, providing visitors the chance to experience the outdoors and learn about local wildlife.' },
        { id: 56, position: { lat: 51.3907868, lng: -0.209157 }, title: 'Lower Morden Garden Centre', description: 'Lower Morden Garden Centre is a popular spot in Sutton, offering plants and gardening supplies, and has received a 4.3-star rating from visitors.' },
        { id: 9, position: { lat: 51.5519333, lng: 0.207063 }, title: 'Thames Chase Forest Centre', description: 'Thames Chase Forest Centre is a popular park and tourist attraction located in Upminster, providing various activities, making it a great place to enjoy nature.' },
        { id: 38, position: { lat: 51.6067703, lng: 0.198876 }, title: 'Central Park (Harold Hill)', description: 'Central Park in Harold Hill is a popular green space with gardens and plenty of space to relax.' }
      ];
      
      setMarker(markers)
      setVisibleMarkers(markers)
    }
   

    async function getRealMarkers() {
      try {
        const response = await fetch(`https://nature-connect-backend.co.uk/locations/filter`, {
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
          id: result.place_id,
          googleid: result.googleid,
          position: {
              lat: result.latitude,
              lng: result.longitude
          },
          title: result.name,
          img: result.image_url,
          description: result.description,
          tag: result.tag_name
        }));

  
        setMarker(newMarkers)
        setVisibleMarkers(newMarkers)

      }   catch (err) {
        console.log(err.message);
      
    }
 
    
    }

  
  const onPlacesChanged = (data, tag) => {
    let matches = apiMarkers.filter(mark => mark.tag_name.toLowerCase().trim().includes(userInput));
    let places = searchBoxRef.current.getPlaces();  

    console.log("what s data", data)

    if (tag) {

      places = tag;

      const place = places[0];
      const location = place.location;

      setPlaces(places);

        const marksToSet = []

          tag.forEach((mark) => {
            marksToSet.push({
              position: { lat: mark.latitude, lng: mark.longitude },
              title: mark.name,
              description: mark.description,
              id: mark.place_id,
              tag: mark.tag_id,
              img: mark.image_url
          });
        })

        setCenter({
          lat: marksToSet[0].position.lat,
          lng: marksToSet[0].position.lng,
        })

        setVisibleMarkers(marksToSet);
        setSelectedMarker(marksToSet[0]); 
        setLocationId(marksToSet[0].id)
      
    }

     if (data) {
      let matches = data.filter(mark => mark.name.toLowerCase().trim().includes(LocationName.toLowerCase().replace(/\.\.\./g, '').trim()));
      places = data;

      const place = places[0];
      const location = place.location;

      setPlaces(places);


      if (matches.length > 0) {
        const marksToSet = []

          matches.forEach((mark) => {
            marksToSet.push({
              position: { lat: mark.latitude, lng: mark.longitude },
              title: mark.name,
              description: mark.description,
              id: mark.place_id,
              tag: mark.tag_id,
              img: mark.image_url
          });
        })

        setCenter({
          lat: marksToSet[0].position.lat,
          lng: marksToSet[0].position.lng,
        })

        setVisibleMarkers(marksToSet);
        setSelectedMarker(marksToSet[0]); 
        setLocationId(marksToSet[0].id)
      }
    } else {
      if (places && places.length > 0) {
        let matches = apiMarkers.filter(mark => mark.name.toLowerCase().trim().includes(userInput));
        const place = places[0];

        const location = (place.geometry && place.geometry.location) 
        ? place.geometry.location 
        : { lat: place.latitude, lng: place.longitude };

        const setMarkersAndCenter = (marksToSet) => {
          setCenter({
            lat: marksToSet[0].position.lat,
            lng: marksToSet[0].position.lng,
          });
    
          setVisibleMarkers(marksToSet);
          setSelectedMarker(marksToSet[0]);
          setLocationId(marksToSet[0].id);
        };
      
        if (tag) {
          const marksToSet = tag.map((mark) => ({
                position: { lat: mark.latitude, lng: mark.longitude },
                title: mark.name,
                description: mark.description,
                id: mark.place_id,
                tag: mark.tag_id,
                img: mark.image_url
              }));      
              setMarkersAndCenter(marksToSet);
            } else if (matches.length > 0) {
              const marksToSet = matches.map((mark) => ({
                position: { lat: mark.latitude, lng: mark.longitude },
                title: mark.name,
                description: mark.description,
                id: mark.place_id,
                tag: mark.tag_id,
                img: mark.image_url
              }));      
              setMarkersAndCenter(marksToSet);
            } else {
              setPlaces(places);
          
        const newMarkers = places.map((result, index) => ({
          id: index + 1,
          position: {
            lat: result.geometry?.location?.lat(),
            lng: result.geometry?.location?.lng(),
          },
          title: result.name,
        }));
  
        setMarkersAndCenter(newMarkers);

    }
  }
    setUserInput("")
}
  };

  return isLoaded ? (
    <>
    
  
      <div className="map-container">


                  <div className="googlemap">
   
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
                                      <li key={tag.id} onClick={() => handleLocalTag(tag.tag)} className={tag.tag}> {tag.tag}</li>
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
                                onClick={() => {
                                  setSelectedMarker(mark)
                                  setLocationId(mark.id)
                                }}
                              />
                            ))}
                            {selectedMarker && selectedMarker.position && (
                              <InfoWindow
                                position={selectedMarker.position || selectedMarker.Location}
                                onCloseClick={() => setSelectedMarker(null)}
                              >
                                <div className="infobox">
                                {selectedMarker?.img && selectedMarker.img[4] && (
                                  <img src={selectedMarker.img[4]} alt="Selected Marker"  onError={(e) => {
                                    e.target.src = selectedMarker.img[0]; // Fallback image
                                  }}  />
                                )}
                                  <h2>{selectedMarker.title || "Location Info"}</h2>
                                  <p>{selectedMarker.description || "Although we don't have much information on this location, this is still a great place to check out. If you enjoy this spot, please recommend it to others!"}</p>
                                  <LocationModal LocationId={LocationId}/>
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