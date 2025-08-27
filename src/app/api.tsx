import axios from 'axios';

const fomesApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

fomesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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


export interface Home {
  id: number;
  address: string;
  number: string;
  zip_code: string;
  city: string;
  town: string;
  country: string;
}

export interface UserReview {
  id: number;
  rating: number;
  description: string;
  noise_level: number;
  disturbance_level: number;
  created_at: string;
  home: Home;
}
