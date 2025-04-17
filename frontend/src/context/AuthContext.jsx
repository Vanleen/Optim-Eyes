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

  // ✅ Lecture unique au chargement
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  // ✅ Mise à jour du localStorage à chaque changement de user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchProfile = async (token) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  const login = async (credentials) => {
    const data = await apiLoginUser(credentials); // token + email + name
    const profile = await fetchProfile(data.token); // profile.isAdmin

    const fullUser = {
      ...data,
      ...profile, // écrase proprement, priorise isAdmin correct
    };

    setUser(fullUser);
    return fullUser;
  };

  const register = async (credentials) => {
    const data = await apiRegisterUser(credentials);
    const profile = await fetchProfile(data.token);

    const fullUser = {
      ...data,
      ...profile,
    };

    setUser(fullUser);
    return fullUser;
  };

  const logout = () => {
    apiLogoutUser();
    setUser(null);
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
