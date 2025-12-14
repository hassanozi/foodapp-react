import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://upskilling-egypt.com:3006/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
    });

export default axiosClient;