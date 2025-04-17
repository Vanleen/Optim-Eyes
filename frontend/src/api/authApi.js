import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/users`;

// ✅ Stockage centralisé et propre (avec purge préalable)
const storeUser = (userData) => {
  if (userData && userData.token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Inclut isAdmin
  }
};

// 🟢 Inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    storeUser(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de l'inscription"
    );
  }
};

// 🔵 Connexion
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    storeUser(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Identifiants invalides"
    );
  }
};

// 🟢 Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? user : null;
  } catch (error) {
    console.error("❌ Erreur de récupération de l'utilisateur :", error);
    logoutUser();
    return null;
  }
};

// 🔴 Déconnexion
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // ❌ Supprime ce reload sauvage !
  // window.location.reload(); ❌
};

