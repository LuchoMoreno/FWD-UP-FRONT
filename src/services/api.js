import axios from 'axios';

// Instancia de Axios para endpoints privados
const apiPrivate = axios.create({
    baseURL: 'http://localhost:8080',
});

apiPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Instancia de Axios para endpoints públicos
const apiPublic = axios.create({
    baseURL: 'http://localhost:8080',
});

export { apiPrivate, apiPublic };