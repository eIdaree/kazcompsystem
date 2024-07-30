import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kazmcompsystem-api.onrender.com'
});

export default api;
