import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/"; // ✅ Set the base API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Function to dynamically set baseURL based on request URL
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  // ✅ If the request is for login or register, set baseURL to `/api/users/`
  if (config.url.includes("/login") || config.url.includes("/register") ||  config.url.includes("/serverlist")) {
    config.baseURL = `${API_BASE_URL}users/`;
  } else {
    config.baseURL = API_BASE_URL; // Use `/api/` for everything else
  }

  // ✅ Attach token to every request if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default apiClient;
