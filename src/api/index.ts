import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tuapi.com/api',
});

export default api;