import axios from 'axios';
import { store } from '../store/store'; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' ;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { userInfo } = state.auth;
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;