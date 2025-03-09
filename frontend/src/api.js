import axios from "axios";

const API_URL = "http://localhost:5001/api"; // ✅ Change this if your backend runs on a different port

// ✅ Set up Axios with Auth Token
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// ✅ Function to Set Auth Token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
};

// ✅ Authentication APIs
export const loginUser = async (email, password) => {
    const response = await api.post("/users/login", { email, password });
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response.data;
};

export const registerUser = async (userData) => {
    return await api.post("/users/register", userData);
};

// ✅ Menu APIs
export const getMenuItems = async () => {
    return await api.get("/menu");
};

export const addMenuItem = async (menuItem) => {
    return await api.post("/menu", menuItem);
};

// ✅ Orders APIs
export const getOrders = async () => {
    return await api.get("/orders");
};

export const createOrder = async (order) => {
    return await api.post("/orders", order);
};

// ✅ Payments APIs
export const makePayment = async (paymentData) => {
    return await api.post("/payments", paymentData);
};

export default api;
