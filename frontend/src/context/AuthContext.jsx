// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // ✅ Pour rediriger

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

  const fetchProfile = async (token) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  };

  const login = async (credentials) => {
    const data = await apiLoginUser(credentials);
    const profile = await fetchProfile(data.token);
    const fullUser = { ...data, ...profile };
    localStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);
    return fullUser;
  };

  const register = async (credentials) => {
    const data = await apiRegisterUser(credentials);
    const profile = await fetchProfile(data.token);
    const fullUser = { ...data, ...profile };
    localStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);
    return fullUser;
  };

  const logout = () => {
    apiLogoutUser();
    setUser(null);
    navigate("/"); // ✅ Redirection page d'accueil après logout
  };

  const value = {
    user,
    isAuthenticated: !!user,
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
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
