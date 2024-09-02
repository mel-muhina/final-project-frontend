import { useContext, createContext, useState } from "react";

const LocationIdContext = createContext();

export const LocationProvider = ({ children }) => {
    const [LocationId, setLocationId] = useState()

    return (
        <LocationIdContext.Provider value={{ LocationId, setLocationId }}>
            {children}
        </LocationIdContext.Provider>
    )
}

export const useLocationId = () => useContext(LocationIdContext);