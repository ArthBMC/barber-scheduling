import apiClient from "@/api/client";

const TOKEN_KEY = "@barber:token";
const USER_KEY = "@barber:user";

export async function login(username, password) {
  try {
    const response = await apiClient.post("/auth/logins", { username, password });
    const token = response.data?.token;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify({ username }));
    }
    return response.data;
  } catch (error) {
    // Fallback caso a rota seja /users/login
    if (error.response?.status === 404) {
      const fallbackResponse = await apiClient.post("/users/login", { username, password });
      return fallbackResponse.data;
    }
    throw error;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!getToken();
}
