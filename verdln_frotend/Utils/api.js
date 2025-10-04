import axios from "axios";

const API_URL = "http://localhost:4000/api";

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

// PUT request
export async function apiPut(endpoint, payload) {
  try {
    const token = getToken();
    const res = await axios.put(`${API_URL}${endpoint}`, payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// GET single resource (for loan detail)
export async function apiGetSingle(endpoint) {
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

/**
 * POST request for multipart/form-data uploads
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - FormData object containing files/data
 **/
export async function apiPostUpload(endpoint, formData) {
  try {
    const token = getToken();

    const res = await axios.post(`${API_URL}${endpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res.data;
  } catch (err) {
    // Axios error handling
    throw err.response?.data || err;
  }
}
