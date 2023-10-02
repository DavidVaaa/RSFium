import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialmente, el usuario no está logeado.

  // Función para establecer el usuario logeado (puedes llamar a esta función después del inicio de sesión).
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Función para cerrar la sesión (puedes llamar a esta función después de cerrar la sesión).
  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
