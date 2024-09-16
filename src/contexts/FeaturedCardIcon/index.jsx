import { useContext, createContext, useState } from "react";

const FeaturedCardIconContext = createContext();

export const FeaturedCardIconProvider = ({ children }) => {
    const [FeaturedCardIconData, setFeaturedCardIconData] = useState("")

    return (
        <FeaturedCardIconContext.Provider value={{ FeaturedCardIconData, setFeaturedCardIconData }}>
            {children}
        </FeaturedCardIconContext.Provider>
    )
}

export const useFeaturedCardIcon = () => useContext(FeaturedCardIconContext);