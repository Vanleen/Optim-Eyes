// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  logoutUser as apiLogoutUser,
  getCurrentUser,
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
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Synchronise localStorage à chaque modification de user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Récupère le profil complet (avec isAdmin) si nécessaire
  const fetchProfile = async (token) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL || ''}/api/users/profile`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  const login = async (credentials) => {
    // 1) Login
    const loginData = await apiLoginUser(credentials);

    // 2) Détermine si on a déjà isAdmin dans la réponse
    let fullUser = { ...loginData };
    if (loginData.isAdmin === undefined) {
      // Si non, on récupère le profil
      const profile = await fetchProfile(loginData.token);
      fullUser = { ...loginData, ...profile };
    }

    // 3) Met à jour le contexte (et localStorage via l'effet)
    setUser(fullUser);
    return fullUser;
  };

  const register = async (credentials) => {
    const regData = await apiRegisterUser(credentials);
    const profile = await fetchProfile(regData.token);
    const fullUser = { ...regData, ...profile };
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
