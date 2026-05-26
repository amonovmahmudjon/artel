import { notifyError } from "@/utils/utils";
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
 api.interceptors.request.use(
    (config) => {
      const userData = localStorage.getItem("login"); 
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          // API response strukturasi uchun turli variantlarni tekshiramiz
          const token = parsed.token || parsed.accessToken || parsed.access_token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error("Token parse qilishda xato:", e);
        }
      }
      
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("login"); 
        
      }

      if (error.code === "ERR_NETWORK") {
        notifyError("Server bilan aloqa uzildi")
        console.error("Server bilan aloqa uzildi!");
      }

      return Promise.reject(error);
    }
  );
  export default api