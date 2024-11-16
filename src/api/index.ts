

import axios, { AxiosInstance } from 'axios';

// Crear una instancia de axios con configuración personalizada
const api: AxiosInstance = axios.create({
  baseURL: 'https://nowback.programmerscrew.com/public/api',
  //baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    // Agrega cualquier cabecera adicional que necesites
  },
});

// Interceptores de solicitudes
api.interceptors.request.use(
  (config) => {
    // Puedes agregar un token de autenticación a cada solicitud si existe
    const token = localStorage.getItem('userToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores de respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar error de autenticación (opcional)
      // Puedes redirigir al usuario a la página de login si se encuentra con un 401 no autorizado
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;