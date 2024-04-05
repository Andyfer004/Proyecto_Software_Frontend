import axios from 'axios';

const api = axios.create({
  baseURL: 'https://127.0.0.1:8000/api',
});

export default api;