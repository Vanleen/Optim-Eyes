import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users"; // 🛠️ Backend sur le port 5000

// Inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data; // ✅ Renvoie l'utilisateur créé
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de l'inscription";
  }
};

// Connexion
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data; // ✅ Renvoie le token et l'utilisateur
  } catch (error) {
    throw error.response?.data?.message || "Identifiants invalides";
  }
};
