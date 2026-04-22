// ==============================
// CONFIG
// ==============================

const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://fayback-e9h3f0c0fbfhgkar.uksouth-01.azurewebsites.net/api";

// ==============================
// CSRF TOKEN HELPER
// ==============================

function getCSRFToken() {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
}

// ==============================
// FETCH WRAPPER
// ==============================

async function request(url, options = {}) {
    const defaultOptions = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(), // 🔥 CRITICAL
        },
    };

    const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data?.error || data?.detail || "API request failed");
    }

    return data;
}

// ==============================
// API METHODS
// ==============================

export const api = {

    // 🔐 AUTH
    login: (email, password) =>
        request(`${API_URL}/login/`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    register: (firstName, lastName, email, password) =>
        request(`${API_URL}/register/`, {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                confirmPassword: password,
            }),
        }),

    logout: () =>
        request(`${API_URL}/logout/`, {
            method: "POST",
        }),

    // 📊 DATA
    getLatestReading: () =>
        request(`${API_URL}/latest/`, {
            method: "GET",
        }),

    getReadingsHistory: () =>
        request(`${API_URL}/history/`, {
            method: "GET",
        }),

    // CRUD READINGS
    listReadings: () =>
        request(`${API_URL}/readings/`),

    createReading: (payload) =>
        request(`${API_URL}/readings/`, {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    getReading: (id) =>
        request(`${API_URL}/readings/${id}/`),

    updateReading: (id, payload) =>
        request(`${API_URL}/readings/${id}/`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    deleteReading: (id) =>
        request(`${API_URL}/readings/${id}/`, {
            method: "DELETE",
        }),

    // 📷 IMAGES
    getImages: () =>
        request(`${API_URL}/images/`),

    createImage: (payload) =>
        request(`${API_URL}/images/`, {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    getImage: (id) =>
        request(`${API_URL}/images/${id}/`),

    updateImage: (id, payload) =>
        request(`${API_URL}/images/${id}/`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    deleteImage: (id) =>
        request(`${API_URL}/images/${id}/`, {
            method: "DELETE",
        }),
};