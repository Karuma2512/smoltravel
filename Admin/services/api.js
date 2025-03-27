import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Set your base API URL here
});

// Request interceptor to modify requests before they are sent
api.interceptors.request.use(
  (config) => {
    // Check if method is PUT
    if (config.method === 'put' && config.data instanceof FormData) {
      // If it's a FormData object, append _method=PUT to it
      config.data.append('_method', 'PUT');
      
      // Change the method to POST
      config.method = 'post';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
