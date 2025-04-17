// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  logoutUser as apiLogoutUser,
} from "../api/authApi";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lecture unique au montage : charge user depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("🕵️‍♀️ Chargé depuis localStorage :", parsed);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Failed parsing user from localStorage:", err);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Synchronise localStorage à chaque modification de user
  useEffect(() => {
    if (user) {
      console.log("🕵️‍♀️ Enregistrement dans localStorage :", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Base URL configurée via Vite env var (préfixe VITE_)
  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchProfile = async (token) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("🕵️‍♀️ fetchProfile retour :", data);
      return data;
    } catch (err) {
      console.error("Erreur fetchProfile :", err);
      return {};
    }
  };

  const login = async (credentials) => {
    console.log("🕵️‍♀️ login credentials :", credentials);
    const response = await apiLoginUser(credentials);
    const loginData = response.data ?? response;
    console.log("🕵️‍♀️ loginData :", loginData);

    let fullUser = loginData;
    if (loginData.isAdmin === undefined) {
      const profile = await fetchProfile(loginData.token);
      fullUser = { ...loginData, ...profile };
    }
    console.log("🕵️‍♀️ fullUser :", fullUser);

    setUser(fullUser);
    return fullUser;
  };

  const register = async (credentials) => {
    console.log("🕵️‍♀️ register credentials :", credentials);
    const response = await apiRegisterUser(credentials);
    const regData = response.data ?? response;
    console.log("🕵️‍♀️ regData :", regData);
    const profile = await fetchProfile(regData.token);
    const fullUser = { ...regData, ...profile };
    console.log("🕵️‍♀️ fullUser register :", fullUser);

    setUser(fullUser);
    return fullUser;
  };

  const logout = () => {
    apiLogoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
