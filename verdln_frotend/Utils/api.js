import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get token
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

// GET request
export async function apiGet(endpoint) {
  try {
    const token = getToken();
    const res = await axios.get(`${API_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// POST request
export async function apiPost(endpoint, payload) {
  try {
    const token = getToken();
    const res = await axios.post(`${API_URL}${endpoint}`, payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}
