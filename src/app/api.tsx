import axios from 'axios';

// Object use to make API calls
const fomesApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Set authorization http header for API calls when the user is logged in
fomesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login if user is not logged in or the session expired
fomesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      (window.location.pathname !== "/login" && window.location.pathname !== "/" )
    ) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default fomesApi;


// Home data returned by API
export interface Home {
  id: number;
  address: string;
  floor: string;
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

export interface HomeWithReviewStats {
  id: number;
  address: string;
  number: string;
  floor: string;
  zip_code: string;
  city: string;
  town: string;
  country: string;
  reviews_count: number;
  avg_rating: number;
  avg_noise_level: number;
  avg_disturbance_level: number;
}
