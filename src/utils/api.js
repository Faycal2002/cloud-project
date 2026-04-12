// Fichier pour les appels API

const API_URL = 'http://localhost:8000/api';

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
            body: JSON.stringify({ email, password }),
        });
        return parseJson(response);
    },

    register: async (firstName, lastName, email, password) => {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        });
        return parseJson(response);
    },

    getLatestReading: async () => {
        const response = await fetch(`${API_URL}/latest/`);
        return parseJson(response);
    },

    getReadingsHistory: async () => {
        const response = await fetch(`${API_URL}/history/`);
        return parseJson(response);
    },

    getCameraEvents: async () => {
        const response = await fetch(`${API_URL}/images/`);
        return parseJson(response);
    },

    saveCameraEvent: async (url, deviceId = 'camera-1', motionDetected = true) => {
        const response = await fetch(`${API_URL}/images/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url,
                device_id: deviceId,
                motion_detected: motionDetected,
            }),
        });
        return parseJson(response);
    },
};
