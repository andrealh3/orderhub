import { getRefreshToken, getToken, setToken } from "../utils/constants";
import { refreshToken } from "./AuthService";

// Función para manejar el fetch y refrescar el token si ha expirado
export const fetchWithToken = (url, options = {}) => {
  const token = getToken();

  // Añadir el token a las cabeceras si no está ya
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Realizar la solicitud con el token actual
  return fetch(url, { ...options, headers })
    .then(response => {
      if (response.status === 401) {
        // Si es 401, intenta refrescar el token
        const refresh = getRefreshToken()
        return refreshToken(refresh).then(({access}) => {
          if (!access) {
            throw new Error("No se pudo refrescar el token");
          }

          setToken(access, refresh);

          // Actualizar el token en las cabeceras
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${access}`,
          };

          // Reintentar la solicitud original con el nuevo token
          return fetch(url, { ...options, headers: newHeaders });
        });
      }

      return response;
    })
    .catch(error => {
      throw error;
    });
};
