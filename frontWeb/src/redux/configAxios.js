import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Remplacez par votre URL de base
});

// Interception des requêtes pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;