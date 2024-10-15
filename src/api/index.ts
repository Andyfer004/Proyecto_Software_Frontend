import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nowback.programmerscrew.com/public/api',

});

export default api;