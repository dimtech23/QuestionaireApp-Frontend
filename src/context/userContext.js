import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {  getUserData } from "../util/fetch";


export const AuthContext = createContext(null);

export default function AuthContextProvider({children}) {
    
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);

    const fetchUser = async () => {
        const userData = await getUserData();
        if(!userData) {
            console.log('user not found');
            navigate('/login');
        } else {
            setUser(userData);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}