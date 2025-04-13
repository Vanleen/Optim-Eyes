// ✅ Nouvelle version de mockApi convertie en appel backend réel

import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/glasses`;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur fetchProducts:", error);
    return [];
  }
};
