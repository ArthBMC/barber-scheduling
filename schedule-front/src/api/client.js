import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para injetar o token JWT automaticamente se estiver autenticado
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@barber:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros (ex: 401 não autorizado)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@barber:token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
