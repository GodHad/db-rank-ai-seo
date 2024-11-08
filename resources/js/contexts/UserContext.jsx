import { useState, createContext, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    const getUser = async () => {
        const response = await axios.get('/api/user');
        return response.data.user;
    };

    const { data: resUser } = useQuery('getUser', getUser, { staleTime: 300000 });

    useEffect(() => {
        setUser(resUser);
    }, [resUser])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
} 