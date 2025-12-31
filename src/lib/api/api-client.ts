// import axios from "axios";
// import { useAuthStore } from "@/store/auth-store";

// const apiClient = axios.create({
//   // Cleaned up the baseURL logic
//   baseURL: (
//     process.env.NEXT_PUBLIC_API_BASE_URL ||
//     "https://www.sonalilife.com:1010/Api"
//   ).trim(),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       useAuthStore.getState().logout();
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const apiClient = axios.create({
  baseURL: (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://www.sonalilife.com:1010/Api"
  ).trim(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token)
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is 401 (Unauthorized)
    if (error.response?.status === 401) {
      // FIX: Only logout if we are NOT already on the login page
      // This prevents the page reload when typing a wrong password
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
