import axios from "axios";

export const getUserData = async () => {
    try {
        const user = await axios.get('http://localhost:5000/api/user', {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        console.log('user in fetch', user);
        return user;
        
    } catch (error) {
        console.log('error in fetch user', error);
        
    }
}