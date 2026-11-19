import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('carevanta_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor for session expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/patient') || 
          window.location.pathname.startsWith('/doctor') || 
          window.location.pathname.startsWith('/admin') ||
          window.location.pathname.startsWith('/pharmacy') ||
          window.location.pathname.startsWith('/lab') ||
          window.location.pathname.startsWith('/hospital')) {
        localStorage.removeItem('carevanta_token');
        localStorage.removeItem('carevanta_user');
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
