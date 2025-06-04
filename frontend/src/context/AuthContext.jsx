import { createContext, useContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await api.post('/accounts/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);