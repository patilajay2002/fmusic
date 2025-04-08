import axios from "axios";

const api_url = "http://127.0.0.1:8000/auth/";

export const registerUser = async (userData) => {
    return axios.post(`${api_url}register/`, userData);
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${api_url}login/`, userData);
        if (response.data.access) {
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
        }
        return response;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const token = localStorage.getItem("access");
        if (!token) {
            throw new Error("No token found, user is not authenticated.");
        }

        const response = await axios.get(`${api_url}user/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Fetch User Error:", error.response?.data || error.message);
        throw error;
    }
};

export const logoutUser = async (refreshToken) => {
    try {
        return axios.post(`${api_url}logout/`, { refresh: refreshToken });
    } catch (error) {
        console.error("Logout Error:", error.response?.data || error.message);
        throw error;
    }
};
