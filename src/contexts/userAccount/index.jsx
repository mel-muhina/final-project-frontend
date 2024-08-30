import { useContext, createContext, useState } from "react";

const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
    const [userAccountData, setuserAccountData] = useState([])

    return (
        <UserAccountContext.Provider value={{ userAccountData, setuserAccountData }}>
            {children}
        </UserAccountContext.Provider>
    )
}

export const useUserAccount = () => useContext(UserAccountContext);