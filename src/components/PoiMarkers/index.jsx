import {Pin, AdvancedMarker} from '@vis.gl/react-google-maps';

export default function PoiMarkers({ pois }) {
        return (
            <>
                {pois.map(poi => (
                    <AdvancedMarker
                        key={poi.id}
                        position={poi.position}
                        >
                        <Pin background={'#00a328'} glyphColor={'#fff'} borderColor={'#028121'} />
                    </AdvancedMarker>
                ))}
            </>
        );
    };

    

