import { createContext, useState } from "react";

export const DBMSContext = createContext();

export const DBMSContextProvider = ({ children }) => {
    const [vendors, setVendors] = useState([])
    const [encyclopedias, setEncyclopedias] = useState([])
    return (
        <DBMSContext.Provider value={{ vendors, setVendors, encyclopedias, setEncyclopedias }}>
            {children}
        </DBMSContext.Provider>
    )
}
