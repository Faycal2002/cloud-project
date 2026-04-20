// Fichier pour les appels API

const API_URL = 'https://5042982-backend2-hhbvdyftf2habucx.uksouth-01.azurewebsites.net/api';
const parseJson = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.error || data?.detail || 'API request failed');
    }
    return data;
};

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        return parseJson(response);
    },

    register: async (firstName, lastName, email, password) => {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                confirmPassword: password,
            }),
        });
        return parseJson(response);
    },

    logout: async () => {
        const response = await fetch(`${API_URL}/logout/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        return parseJson(response);
    },

    getLatestReading: async () => {
        const response = await fetch(`${API_URL}/latest/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    getReadingsHistory: async () => {
        const response = await fetch(`${API_URL}/history/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    listReadingsCrud: async () => {
        const response = await fetch(`${API_URL}/readings/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    createReadingCrud: async (payload) => {
        const response = await fetch(`${API_URL}/readings/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        return parseJson(response);
    },

    getReadingCrud: async (readingId) => {
        const response = await fetch(`${API_URL}/readings/${readingId}/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    updateReadingCrud: async (readingId, payload) => {
        const response = await fetch(`${API_URL}/readings/${readingId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        return parseJson(response);
    },

    deleteReadingCrud: async (readingId) => {
        const response = await fetch(`${API_URL}/readings/${readingId}/`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) {
            return parseJson(response);
        }
        return { success: true };
    },

    getCameraEvents: async () => {
        const response = await fetch(`${API_URL}/images/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    saveCameraEvent: async (url, deviceId = 'camera-1', motionDetected = true) => {
        const response = await fetch(`${API_URL}/images/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                url,
                device_id: deviceId,
                motion_detected: motionDetected,
            }),
        });
        return parseJson(response);
    },

    listImagesCrud: async () => {
        const response = await fetch(`${API_URL}/images/crud/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    createImageCrud: async (payload) => {
        const response = await fetch(`${API_URL}/images/crud/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        return parseJson(response);
    },

    getImageCrud: async (imageId) => {
        const response = await fetch(`${API_URL}/images/crud/${imageId}/`, {
            credentials: 'include',
        });
        return parseJson(response);
    },

    updateImageCrud: async (imageId, payload) => {
        const response = await fetch(`${API_URL}/images/crud/${imageId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        return parseJson(response);
    },

    deleteImageCrud: async (imageId) => {
        const response = await fetch(`${API_URL}/images/crud/${imageId}/`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) {
            return parseJson(response);
        }
        return { success: true };
    },
};
