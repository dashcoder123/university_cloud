// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: '',
    role: ''
  });

  const setAuthData = (id, role) => {
    setAuth({ id, role });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
