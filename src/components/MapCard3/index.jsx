import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import ReactDOM from 'react-dom/client';
import { useState, useRef, useEffect } from 'react';

const MarkerContent = ({ content }) => {
  return <div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc' }}>{content}</div>;
};
export default function MapCard3({ markers, center }) {

  const [mapInstance, setMapInstance] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  // Handle map load event
  const handleMapLoad = (map) => {
    setMapInstance(map);
  };

  // Add markers to the map
  useEffect(() => {
    if (mapInstance && markers.length > 0) {
      markers.forEach((marker) => {
        const { position, content } = marker;

        // Create a container for marker content
        const container = document.createElement('div');
        const root = ReactDOM.createRoot(container);
        root.render(<MarkerContent content={content} />);

        new AdvancedMarker({
          map: mapInstance,
          position,
          content: container,
        });
      });

      // Adjust map bounds to fit all markers
      const bounds = new google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng));
      });
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, markers]);

  const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '22px',
    overflow: 'hidden',
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultZoom={14}
        defaultCenter={center || { lat: 51.5079, lng: -0.1283 }}
        style={containerStyle}
        onMapLoad={handleMapLoad}
      >
      </Map>
    </APIProvider>
  );
}