import { useState, useEffect, useCallback, useRef } from "react";
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

export default function SearchBar({setSearchResults, setCenter, setMarkers, libraries}) {
    const [ tags, setTags ] = useState([]);
    const [query, setQuery] = useState("");
    // const [ searchResults, setSearchResults] = useState([]);
    // const [ markers, setMarkers] = useState([]);

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

        const handleSearchString = (e) => {
            setQuery(e.target.value)
        }

        const handleSearchSubmit = (e) => {
            e.preventDefault();
            handleSearch(query)
        };

        const handleSearch = useCallback(async () => {
                    
            try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
                const data = await response.json();
                setSearchResults(data.results);
                
                // setMarkers(data.results.map(result => ({
                //   id: result.place_id,
                //   position: {
                //     lat: result.geometry.location.lat,
                //     lng: result.geometry.location.lng,
                //   },
                //   name: result.name,
                //   })));

                // const formattedMarkers = data.results.map(result => {
                //     const lat = result.geometry.location.lat(); // Call the function to get the value
                //     const lng = result.geometry.location.lng(); // Call the function to get the value
        
                //     return {
                //         id: result.place_id,
                //         position: { lat, lng },
                //         name: result.name,
                //     };
                // });
                // setMarkers(formattedMarkers)
            } catch (err) {
                console.log("Fetch err", err.message)
            }
            
        
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

        
        const [places, setPlaces] = useState([])
        const searchBoxRef = useRef(null);

        const onPlacesChanged = () => {
            const places = searchBoxRef.current.getPlaces();
            if (places && places.length > 0) {
              const place = places[0];
              const location = place.geometry.location;
              setCenter({
                lat: location.lat(),
                lng: location.lng(),
              });
              setPlaces(places);
              setSearchResults(places);
      
            }
          };

  return (
   <>
    <div className="googlemap">               
      <div className="searchbar-background">
     
        <StandaloneSearchBox
            onLoad={ref => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
            >
        <input
            type="text"
            placeholder="Search places..."
            onChange={handleSearchString}
            className="googlemap-searchbar"
            />
        </StandaloneSearchBox>
    

        <div className="search-tags-container">
            {tags.map(tag => 
                <li className={tag.tag}> {tag.tag}</li>
            )}
        </div>
       </div>
     </div>
    
   </>
  )
}
