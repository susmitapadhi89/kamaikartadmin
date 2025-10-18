// import axios from "axios";
// import toast from "react-hot-toast";

// export const API = axios.create({
//   baseURL: "https://www.kamaikart.in/api",
//   withCredentials: true, // cookies auto attach
// });

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Access token expired case
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // 🔄 Call refresh token API
//         await API.post("/auth/refresh", {}, { withCredentials: true });

//         // 🔁 Retry original request
//         return API(originalRequest);
//       } catch (err) {
//         // ❌ Refresh token also failed
//         toast.error("Session expired. Please login again.");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 1500);
//         return Promise.reject(err);
//       }
//     }

//     // Other errors
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import toast from "react-hot-toast";

// 🔗 Axios instance
export const API = axios.create({
  baseURL: "https://www.kamaikart.in/api",
  withCredentials: true, // cookies auto attach
});

// 🔄 Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 = Access token expired
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        // 🔁 Retry original request
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("admin");
        localStorage.removeItem("isLoggedIn");
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return Promise.reject(err);
      }
    }

    if (
      error.response?.data?.message === "Refresh token is required" ||
      error.response?.status === 401
    ) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }

    return Promise.reject(error);
  }
);
