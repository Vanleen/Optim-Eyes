import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/glasses`;

export const fetchAllGlasses = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

// ✅ Ajout de cette fonction pour corriger l’erreur
export const getGlassById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};
