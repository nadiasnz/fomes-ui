import axios from 'axios';

const fomesApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Add access token to every request
fomesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login if token is invalid or expired
fomesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default fomesApi;
