import axios from "axios";
import authService from "./auth.js";

const urlBackend = 'https://projectmoviesbackend.onrender.com';
const urlDev = ''; // En desarrollo, usar proxy de Vite (ruta relativa)

// En desarrollo, usar ruta relativa para que funcione el proxy de Vite
// En producción, usar la URL completa del backend
const url = import.meta.env.DEV ? urlDev : urlBackend;

// Configurar interceptor para añadir token a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores 401/403
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token inválido o expirado
        authService.logout();
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Acceso denegado por rol
        console.error('Acceso denegado: No tienes permisos para esta acción');
      }
    }
    return Promise.reject(error);
  }
);

const serviceEntity = (baseUrl) => {
  // Construir URL: en desarrollo usar ruta relativa (proxy), en producción usar URL completa
  const buildUrl = (endpoint) => url ? `${url}${endpoint}` : endpoint;

  const getAll = async () => {
    const response = await axios.get(buildUrl(baseUrl));
    return response.data;
  };

  const getActives = async () => {
    const response = await axios.get(buildUrl(`${baseUrl}/actives`));
    return response.data;
  };

  const create = async newEntity => {
    const response = await axios.post(buildUrl(baseUrl), newEntity);
    return response.data;
  };

  const update = async entity => {
    const response = await axios.put(buildUrl(`${baseUrl}/${entity.id}`), entity);
    return response.data;
  };

  const deleteEntity = async entity => {
    await axios.delete(buildUrl(`${baseUrl}/${entity.id}`));
  };

  return {
    getAll,
    getActives,
    create,
    update,
    deleteEntity
  };
};

export default serviceEntity;
