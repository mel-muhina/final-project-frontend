import { useContext, createContext, useState } from "react";

const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
    const [userAccountData, setUserAccountData] = useState({

        username: "",
        email: ""
    })

    return (
        <UserAccountContext.Provider value={{ userAccountData, setUserAccountData }}>
            {children}
        </UserAccountContext.Provider>
    )
}

export const useUserAccount = () => useContext(UserAccountContext);