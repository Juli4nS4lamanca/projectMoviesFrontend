import { createContext, useContext, useState, useEffect } from "react";
import authService from "@/services/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      if (authService.isAuthenticated()) {
        const savedUser = authService.getUser();
        setUser(savedUser);
      } else {
        authService.logout();
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('AuthContext: Iniciando login...');
      const response = await authService.login(email, password);
      console.log('AuthContext: Respuesta recibida:', response);
      
      if (!response || !response.token) {
        console.error('AuthContext: No se recibió token en la respuesta');
        return { success: false, error: 'No se recibió token del servidor' };
      }
      
      const userData = authService.setAuth(response.token);
      console.log('AuthContext: Usuario decodificado:', userData);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('AuthContext: Error completo:', error);
      const message = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      console.error('AuthContext: Mensaje de error:', message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/login';
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  const hasAnyRole = (roles) => {
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      hasRole,
      hasAnyRole,
      isAuthenticated: !!user && authService.isAuthenticated()
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
