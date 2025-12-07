import axios from "axios";

const urlBackend = 'https://projectmoviesbackend.onrender.com';
const urlDev = ''; // En desarrollo, usar proxy de Vite (ruta relativa)

// En desarrollo, usar ruta relativa para que funcione el proxy de Vite
// En producción, usar la URL completa del backend
const url = import.meta.env.DEV ? urlDev : urlBackend;

// Función manual para decodificar JWT (sin dependencia externa)
const jwtDecode = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const authService = {
  login: async (email, password) => {
    try {
      const loginUrl = url ? `${url}/api/login` : '/api/login';
      console.log('Intentando login con:', { email, url: loginUrl });
      const response = await axios.post(loginUrl, { email, password });
      console.log('Respuesta del login:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuth: (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      const user = {
        name: decoded.name || decoded.email,
        email: decoded.email,
        id: decoded.id,
        roles: decoded.rol || []
      };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (error) {
      return false;
    }
  },

  hasRole: (role) => {
    const user = authService.getUser();
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  },

  // Gestión de usuarios (solo admin)
  createUser: async (userData) => {
    const token = authService.getToken();
    const usersUrl = url ? `${url}/api/users` : '/api/users';
    const response = await axios.post(usersUrl, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  getAllUsers: async () => {
    const token = authService.getToken();
    const usersUrl = url ? `${url}/api/users` : '/api/users';
    const response = await axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default authService;
