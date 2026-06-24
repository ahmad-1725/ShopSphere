import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const fetchUser = async () => {
  try {
    const { data } = await api.get("/user/me");

    console.log("USER:", data);

    setUser(data.data);
  } catch (err) {
    console.log("FETCH USER ERROR:", err.response?.data || err.message);
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  fetchUser();
}, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);