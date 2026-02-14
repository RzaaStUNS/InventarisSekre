import axios from 'axios';

const api = axios.create({
  // Dia bakal cek variabel di Vercel dulu, kalau gak ada baru pake localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
