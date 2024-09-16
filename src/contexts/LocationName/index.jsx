import { useContext, createContext, useState } from "react";

const LocationNameContext = createContext();

export const LocationNameProvider = ({ children }) => {
    const [LocationName, setLocationName] = useState()

    return (
        <LocationNameContext.Provider value={{ LocationName, setLocationName }}>
            {children}
        </LocationNameContext.Provider>
    )
}

export const useLocationName = () => useContext(LocationNameContext);