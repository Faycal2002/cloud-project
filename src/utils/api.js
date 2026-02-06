// Fichier pour les appels API

const API_URL = 'http://localhost:8000/api';

export const api = {
    login: async (email, password) => {
        // Exemple d'appel API
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },

    register: async (name, email, password) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        return response.json();
    },
};
