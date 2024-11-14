import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//  Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can customize error handling here
    return Promise.reject(error);
  }
);

export default api;
