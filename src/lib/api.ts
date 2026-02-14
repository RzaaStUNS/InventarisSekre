import axios from 'axios';

const api = axios.create({
  // Tulis manual langsung, jangan pakai import.meta.env dulu
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;