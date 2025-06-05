import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/accounts/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        console.log("Login response data:", data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user"); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);