import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Special config for authentication
export const authApi = {
  login: (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    return axios.post('http://localhost:8000/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  
  register: (username, email, password) => {
    return axios.post('http://localhost:8000/users/', {
      username,
      email,
      password
    });
  }
};

// Interceptor to add authorization header
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method, config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error Response:', error.response?.status, error.config?.url, error.message);
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access, clearing token');
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
