import axios from 'axios';

// Creamos una instancia de Axios con configuración base
const api = axios.create({
  baseURL: '/api', // El proxy en package.json se encargará de redirigir a http://localhost:5000
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Interceptor de Peticiones:
 * Este interceptor se ejecuta antes de cada petición. Su trabajo es
 * tomar el token JWT del localStorage y añadirlo a la cabecera 'Authorization'.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, lo añadimos a las cabeceras
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Si hay un error en la configuración de la petición, lo rechazamos
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Respuestas:
 * Este interceptor se ejecuta después de cada respuesta del servidor.
 * Su principal trabajo es detectar errores de autenticación (código 401).
 * Si un token expira, el servidor devolverá 401, y podemos forzar
 * el cierre de sesión del usuario.
 */
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (2xx), simplemente la retornamos
    return response;
  },
  (error) => {
    // Si el error es 401 (No Autorizado)
    if (error.response && error.response.status === 401) {
      // Limpiamos el token del localStorage
      localStorage.removeItem('token');
      // Podríamos también limpiar el estado del usuario aquí si el contexto fuera accesible
      
      // Recargamos la página para redirigir al usuario a la página de login
      // Esto limpia todo el estado de la aplicación.
      window.location.href = '/login';
    }
    
    // Rechazamos el error para que pueda ser manejado por el .catch() de la llamada original
    return Promise.reject(error);
  }
);

export default api; 