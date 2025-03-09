import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Load user data when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        console.log("🔄 Token found, fetching user profile...");
        try {
          const response = await apiClient.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("✅ User profile loaded:", response.data);
          setUser(response.data);
        } catch (error) {
          console.log("🚫 Invalid token, logging out");
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      console.log("🟢 Attempting login...");
      const response = await apiClient.post("/login", { email, password });

      if (!response.data.token || !response.data.user) {
        console.error("🚨 No token or user data received!");
        alert("Login failed. Please try again.");
        return;
      }

      console.log("✅ Login successful:", response.data);

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);

      // Redirect user based on role
      if (response.data.user.role === "Admin") {
        console.log("🔀 Navigating to Admin Dashboard...");
        navigate("/home"); // Redirect admins to admin dashboard
      } else {
        console.log("🔀 Navigating to Orders page...");
        navigate("/orders"); // Redirect regular users
      }
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data?.message || "Invalid credentials");
      alert(error.response?.data?.message || "Invalid email or password.");
    }
  };

  // Logout function
  const logout = () => {
    console.log("🚪 Logging out user...");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
