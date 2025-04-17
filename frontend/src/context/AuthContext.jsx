import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  logoutUser as apiLogoutUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Lecture unique du user stocké
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("User JSON invalide, on purge");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // 2️⃣ Synchro du localStorage à chaque modification de `user`
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (credentials) => {
    const resp = await apiLoginUser(credentials);
    // gère à la fois axios response ou retour direct
    const loginData = resp.data ?? resp;
    console.log("🕵️‍♀️ loginData :", loginData);

    setUser(loginData);
    return loginData;
  };

  const register = async (credentials) => {
    const resp = await apiRegisterUser(credentials);
    const regData = resp.data ?? resp;
    console.log("🔐 registerData :", regData);

    setUser(regData);
    return regData;
  };

  const logout = () => {
    apiLogoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
