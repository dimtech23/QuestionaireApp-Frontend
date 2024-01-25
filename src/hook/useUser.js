import { useContext } from "react";
import { AuthContext } from "../context/userContext";


export const useUser = () => {
    const { user } = useContext(AuthContext);
    return user
}