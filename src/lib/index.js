import Axios from 'axios';

const customAxios = Axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});


customAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization =` Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default customAxios;