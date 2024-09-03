import { useState, useEffect } from "react";

export default function JourneyPlanCard() {
const [origin, setOrigin] = useState('')
const [destination, setDestination] = useState('')
const [message, setMessage] = useState('')


    function handleInput(e) {
        setOrigin(e.target.value)
    }

    function handleDestination(e) {
        setDestination(e.target.value)
    }


    async function handleSubmit(e) {
        e.preventDefault();

        let backupData = ({
            "startLocation": "51.504, -0.0235", 
            "endLocation": "51.5067, -0.1425",
            "mode": "transit"
        })

        try {
            const response = await fetch(`http://54.89.47.53:3000/journey/directions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startLocation: "51.504, -0.0235",
                    endLocation: "51.5067, -0.1425",
                    mode: "transit"
                })
            });
    
            const data = await response.json();
            console.log("data", data)
    
            setMessage('Location sent successfully.');
            setTimeout(() => {
                setMessage('');
            }, 5000);

        }   catch (err) {
            console.log(err.message);
            setMessage('There was a problem in retrieving your location.');
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
        setOrigin('')
        setDestination('')
    }

        // const response = await fetch(api);
        // const data = await response.json();
        // const data = tempApi
        // const imgData = tempImgApi
   

    

  return (
    <>
        <form>
            <div>
                <input placeholder="Origin" name="startLocation" value={origin} type="text" className="text" onChange={handleInput} />
            </div>
            <div>
                <input placeholder="Destination" name="endLocation" value={destination} type="text" className="text" onChange={handleDestination} />
            </div>
            <div>
                <button type="submit" className="journey-button" onClick={handleSubmit}>Find Journey</button>
            </div>
        </form>
    </>

  )
}
