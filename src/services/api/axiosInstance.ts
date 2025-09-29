import axios from 'axios';

const DUMMYJSON_BASE_URL = 'https://dummyjson.com';

export const axiosInstance = axios.create({
    baseURL: DUMMYJSON_BASE_URL,
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`🚀 DummyJSON API Response: ${response.status} ${response.statusText}`);
        return response.data;
    },
);

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`🚀 DummyJSON API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
);

export default axiosInstance;
