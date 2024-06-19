import React, { createContext, useContext, useState, useEffect } from 'react';

import { useToast } from '../contexts/ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const { addToast } = useToast();


  useEffect(() => {
      if (token) {
          localStorage.setItem('token', token);
      } else {
          localStorage.removeItem('token');
      }
  }, [token]);

    const login = async (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        addToast('success', 'Se ha iniciado sesión!')
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        addToast('warning', 'Se ha cerrado su sesión!');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);