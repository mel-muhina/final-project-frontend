import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export const SearchBar2 = ({ setSearchResults, setCenter, handleSearch }) => {
    const [ tags, setTags ] = useState([]);
    const [query, setQuery] = useState("");
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary('places');

    const apiKey = import.meta.env.VITE_API_KEY;
  
    useEffect(() => {
      populateTags();
      loadSearchBar();
  }, [])

  useEffect(() => {

}, [query])

const dummyTags = [
  { id: 1, tag: "Woodlands" },
  { id: 2, tag: "Hiking" },
  { id: 3, tag: "Beach" },
  { id: 4, tag: "Camping" },
  { id: 5, tag: "Park" },
  { id: 6, tag: "Garden" },
  { id: 7, tag: "Wildlife" },
  { id: 8, tag: "Farm" },
  { id: 9, tag: "Historic" },
  { id: 10, tag: "Rivers" }
];

      async function populateTags() {
          const data = dummyTags
          setTags(data)
      }


    // const handleSearch = useCallback(async (e) => {
    //     const query = e.target.value;
    //     if (query) {
    //       console.log("Query")
    //       const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
    //       const data = await response.json();
    //       console.log("Data from api", data)
    //       setSearchResults(data.results);
    //       // setMarkers(data.results.map(result => ({
    //       //   id: result.place_id,
    //       //   position: {
    //       //     lat: result.geometry.location.lat,
    //       //     lng: result.geometry.location.lng,

    //       //   },
    //       //   name: result.name,
    //       //   })));
    //       } else {
    //         setSearchResults([]);
    //         setMarkers([]);
    //       }
      
    //   }, [])

    const loadSearchBar = () => {
        if (places && inputRef.current) {
            const options = {
              fields: ['geometry', 'name', 'formatted_address']
            };
            const autocomplete = new places.Autocomplete(inputRef.current, options);
            setPlaceAutocomplete(autocomplete);
      
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              setSearchResults(place);
            });
          }
    }

    // const handleSearchString = (e) => {
    //     setQuery(e.target.value)
    // }

    // const handleSearchSubmit = (e) => {
    //     e.preventDefault();
    //     handleSearch(query)
    // };

    // const handleSearch = async (query) => {
    //     console.log("handling search", query)
    //     try {
    //         const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
    //         const data = await response.json();
    //         setSearchResults(data.results);
    //         console.log("which data", data)
            
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
    //     } catch (err) {
    //         console.log("Fetch err", err.message)
    //     }
        
    
    // }

    const handleLocationClick = (location) => {
      setSelectedLocation({
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      })
    }

    const changeLocation = (lat, lng) => {
    setCenter({ lat, lng });
  };

    
    // const [places, setPlaces] = useState([])
    const searchBoxRef = useRef(null);
  
    return (
        <form onSubmit={handleSearch}>
      <div className="googlemap">               
      <div className="searchbar-background">
            <div className="autocomplete-container"  onLoad={ref => (searchBoxRef.current = ref)}>
            <input ref={inputRef} type="text" placeholder="Search places..."  />
          </div>
          <div className="search-tags-container">
            {tags.map(tag => 
                <li key={tag.id} className={tag.tag}> {tag.tag}</li>
              )}
        </div>
      </div>
      </div>
      </form>
      
    );
  };

export default SearchBar2;