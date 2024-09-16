import { AdvancedMarker } from '@vis.gl/react-google-maps'; // Ensure this import is correct
import ReactDOM from 'react-dom/client';

const MarkerContent = ({ background, glyphColor, borderColor }) => {
    return (
        <div
            style={{
                backgroundColor: background,
                color: glyphColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Customise the pin content here */}
            <span style={{ fontSize: '2rem' }}>📍</span>
         </div>
    );
  };
  
  
  export default MarkerContent;