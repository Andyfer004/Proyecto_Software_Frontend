import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://nowback.programmerscrew.com/public/api',
  baseURL: 'http://127.0.0.1:8000/public/api',
  withCredentials: true,


});


export default api;