import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de usuario
const UserContext = createContext();

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un proveedor UserProvider');
  }
  return context;
};

// Proveedor de contexto de usuario
export const UserProvider = ({ children }) => {
  // Estado del usuario
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (userData) => {
    // Aquí puedes realizar la lógica de autenticación, por ejemplo, verificar un token
    // y establecer el usuario en el estado si la autenticación es exitosa.
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    // Aquí puedes realizar la lógica para cerrar sesión, como limpiar el token o los datos de usuario.
    setUser(null);
  };

  // Valor del contexto
  const contextValue = {
    user,
    login,
    logout,
  };

  // Devolvemos el proveedor de contexto con el valor del contexto
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
